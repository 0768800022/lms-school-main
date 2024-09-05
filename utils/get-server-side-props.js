import { dehydrate, QueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { isFunction } from "lodash";

import { commonStatus, ROLES_CODE, storageKeys } from "@/constants/constant";
import apiConfig from "@/services/api/config";
import fetcher from "@/services/api/fetcher";
import { getTeacherClasses } from "@/services/api/teachers";

import { extractMetaParam, setAuthCookie } from "./auth";
import { cleanObject, logDevelopmentError } from ".";

export default function createGetServerSideProps(callback) {
    const queryClient = new QueryClient();

    return async (context) => {
        try {
            const {
                role: userRoleParam,
                branchId: branchIdParam,
                classId: classIdParam,
            } = extractMetaParam(context.query.meta);

            if (context.query.meta) {
                setAuthCookie(storageKeys.role, userRoleParam, context);
                setAuthCookie(storageKeys.branchId, branchIdParam, context);
                setAuthCookie(storageKeys.teacherDefaultClass, classIdParam, context);
            }

            const storageRole = userRoleParam || getCookie(storageKeys.role, context);
            const storageBranchId = branchIdParam || getCookie(storageKeys.branchId, context);
            const storageClassId =
                classIdParam || getCookie(storageKeys.teacherDefaultClass, context);

            const branches = await prefetchBranches({ queryClient, context });
            const defaultClassId =
                storageRole === ROLES_CODE.TEACHER
                    ? await prefetchTeacherClasses({ queryClient, context })
                    : null;

            const defaultProps = {
                role: storageRole,
                branchId: storageBranchId || branches[0]?.value,
                classId: storageClassId || defaultClassId,
            };

            if (isFunction(callback)) {
                const { props, ...rest } = await callback({
                    context,
                    queryClient,
                    ...defaultProps,
                });

                return {
                    ...rest,
                    props: cleanObject({
                        ...props,
                        ...defaultProps,
                        dehydratedState: dehydrate(queryClient),
                    }),
                };
            }

            return {
                props: cleanObject(defaultProps),
            };
        } catch (error) {
            // TODO: handle error
            if (process.env.NODE_ENV === "development") {
                logDevelopmentError("getServerSideProps error", error);
                throw error;
            }

            return {
                notFound: true,
            };
        }
    };
}

async function fetchBranches({ context }) {
    const { data } = await fetcher(apiConfig.branch.autocomplete, { context, params: { status: commonStatus.ACTIVE } });

    return data?.data?.map((item) => ({ ...item, value: item.id, label: item.name }));
}

async function prefetchBranches({ queryClient, context }) {
    await queryClient.prefetchQuery({
        queryKey: [ apiConfig.branch.autocomplete.url ],
        queryFn: () => fetchBranches({ context }),
    });

    return queryClient.getQueryData([ apiConfig.branch.autocomplete.url ]) || [];
}

async function prefetchTeacherClasses({ queryClient, context }) {
    await queryClient.prefetchQuery({
        queryKey: [ apiConfig.teachers.getMyClasses.url ],
        queryFn: () => getTeacherClasses({ context }),
    });

    const teacherClasses = queryClient.getQueryData([ apiConfig.teachers.getMyClasses.url ]) || [];

    return teacherClasses?.headClassrooms?.[0]?.id || teacherClasses?.subjectClassrooms?.[0]?.id;
}
