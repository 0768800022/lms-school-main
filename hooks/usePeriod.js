import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { getClassAutoComplete } from "@/services/api/grade";
import { getPeriodAutoComplete } from "@/services/api/period";

function usePeriod() {
    const queryClient = useQueryClient();

    const fetchData = useCallback(({ signal }, branchId, gradeId, schoolYearId,classroomId) => {
        try {
            // if (!branchId) {
            //     return [];
            // }
            return getPeriodAutoComplete({
                data: {
                    branchId,
                    gradeId,
                    schoolYearId,
                    classroomId,
                },
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

    const getPeriod = async (branchId, gradeId, schoolYearId,classroomId) => {
        return queryClient.fetchQuery({
            queryKey: [ "class-auto-complete", branchId, gradeId, schoolYearId,classroomId ],
            queryFn: () =>
                fetchData(
                    { signal: new AbortController().signal },
                    branchId,
                    gradeId,
                    schoolYearId,
                    classroomId,
                ),
            staleTime: 0,
            onError: (error) => {
                console.error("Error fetching period data:", error);
            },
        });
    };

    return {
        getPeriod,
    };
}

export default usePeriod;
