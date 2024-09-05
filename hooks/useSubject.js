import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { commonStatus } from "@/constants/constant";
import { useAppContext } from "@/contexts";
import apiConfig from "@/services/api/config";
import { getSubjectAutoComplete, getSubjectResourceAutoComplete } from "@/services/api/subject";
import { cleanObject } from "@/utils";

function useSubject() {
    const queryClient = useQueryClient();
    const { defaultClassId } = useAppContext();

    const fetchData = useCallback(
        ({ signal }, branchId, gradeId, schoolYearId, status = commonStatus.ACTIVE) => {
            try {
                if (!branchId) {
                    return [];
                }
                return getSubjectAutoComplete({
                    data: {
                        branchId,
                        gradeId,
                        schoolYearId,
                        status,
                    },
                    signal,
                })
                    .then((res) => res.data)
                    .then((data) =>
                        data?.map((item) => {
                            item.value = item.id;
                            item.label = item.fullName;

                            return item;
                        }),
                    );
            } catch (err) {
                console.log({ err });
                return [];
            }
        },
        [],
    );

    const getSubject = async (branchId, gradeId, schoolYearId, status) => {
        return queryClient.fetchQuery({
            queryKey: [ apiConfig.subject.autocomplete.url, { branchId, gradeId, schoolYearId } ],
            queryFn: () =>
                fetchData(
                    { signal: new AbortController().signal },
                    branchId,
                    gradeId,
                    schoolYearId,
                    status,
                ),
            staleTime: Infinity,
            onError: (error) => {
                console.error("Error fetching roles data:", error);
            },
        });
    };

    const fetchDataResource = useCallback(({ signal },grade, status = commonStatus.ACTIVE) => {
        try {
            return getSubjectResourceAutoComplete({
                data: cleanObject({
                    grade,
                    status,
                    classroomId: defaultClassId,
                }, { clear: [ undefined, "", null, 0 ] }),
                signal,
            })
                .then((res) => res.data)
                .then((data) =>
                    data?.map((item) => {
                        item.value = item.id;
                        item.label = item.fullName;

                        return item;
                    }),
                );
        } catch (err) {
            console.log({ err });
            return [];
        }
    }, [ defaultClassId ]);

    const getSubjectResource = async (grade) => {
        return queryClient.fetchQuery({
            queryKey: [ apiConfig.subjectSystem.autocomplete.url,{ grade } ],
            queryFn: () => fetchDataResource({ signal: new AbortController().signal },grade),
            staleTime: Infinity,
            onError: (error) => {
                console.error("Error fetching roles data:", error);
            },
        });
    };

    return {
        getSubject,
        getSubjectResource,
    };
}

export default useSubject;
