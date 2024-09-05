import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { commonStatus } from "@/constants/constant";
import { useAppContext } from "@/contexts";
import { getGradeAutoComplete, getGradeResourceAutoComplete } from "@/services/api/grade";
import { cleanObject } from "@/utils";

function useGrade() {
    const queryClient = useQueryClient();
    const { defaultClassId } = useAppContext();

    const fetchData = useCallback(({ signal }, data) => {
        try {
            // if (!id) {
            //     return [];
            // }
            return getGradeAutoComplete({
                data,
                signal,
            })
                .then((res) => res.data)
                .then((data) =>
                    data?.map((item) => {
                        item.value = item.id;
                        item.label = item.name;
                        return item;
                    }),
                );
        } catch (err) {
            console.log({ err });
            return [];
        }
    }, []);

    const fetchDataResource = useCallback(({ signal }) => {
        try {
            // if (!id) {
            //     return [];
            // }
            return getGradeResourceAutoComplete({
                data: cleanObject({
                    status: commonStatus.ACTIVE,
                    classroomId: defaultClassId,
                }, { clear: [ undefined, "", null, 0 ] }),
                signal,
            })
                .then((res) => res.data)
                .then((data) =>
                    data?.map((item) => {
                        item.value = item.id;
                        item.label = item.name;
                        return item;
                    }),
                );
        } catch (err) {
            console.log({ err });
            return [];
        }
    }, []);

    const getGrade = useCallback(
        async (value) => {
            return queryClient.fetchQuery({
                queryKey: [ "grade-auto-complete", value ],
                queryFn: () => fetchData({ signal: new AbortController().signal }, value),
                staleTime: Infinity,
                meta: {
                    onError: (error) => {
                        console.error("Error fetching roles data:", error);
                    },
                },
            });
        },
        [ fetchData, queryClient ],
    );

    const getGradeResource = useCallback(async () => {
        return queryClient.fetchQuery({
            queryKey: [ "grade-resource-auto-complete" ],
            queryFn: () => fetchDataResource({ signal: new AbortController().signal }),
            staleTime: Infinity,
            meta: {
                onError: (error) => {
                    console.error("Error fetching roles data:", error);
                },
            },
        });
    }, [ fetchData, queryClient ]);

    return {
        getGrade,
        getGradeResource,
    };
}

export default useGrade;
