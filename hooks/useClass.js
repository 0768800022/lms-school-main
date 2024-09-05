import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { commonStatus } from "@/constants/constant";
import apiConfig from "@/services/api/config";
import { getClassAutoComplete } from "@/services/api/grade";
import { filterProps } from "@/utils/filter-props";

function useClass() {
    const queryClient = useQueryClient();

    const fetchData = useCallback(
        (
            { signal },
            branchId,
            gradeId,
            schoolYearId,
            subjectId,
            isNotInTeachingPlanScope,
            status = commonStatus.ACTIVE,
        ) => {
            try {
                // if (!branchId) {
                //     return [];
                // }
                return getClassAutoComplete({
                    data: filterProps({
                        branchId,
                        gradeId,
                        schoolYearId,
                        subjectId,
                        isNotInTeachingPlanScope,
                        status,
                    }),
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
        },
        [],
    );

    const getClass = async (
        branchId,
        gradeId,
        schoolYearId,
        subjectId,
        isNotInTeachingPlanScope,
        status = commonStatus.ACTIVE,
    ) => {
        return queryClient.fetchQuery({
            queryKey: [
                apiConfig.classrooms.autocomplete.url,
                branchId,
                gradeId,
                schoolYearId,
                subjectId,
                isNotInTeachingPlanScope,
                status,
            ],
            queryFn: () =>
                fetchData(
                    { signal: new AbortController().signal },
                    branchId,
                    gradeId,
                    schoolYearId,
                    subjectId,
                    isNotInTeachingPlanScope,
                    status = commonStatus.ACTIVE,
                ),
            staleTime: Infinity,
            onError: (error) => {
                console.error("Error fetching roles data:", error);
            },
        });
    };

    return {
        getClass,
    };
}

export default useClass;
