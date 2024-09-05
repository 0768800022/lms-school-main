import { useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import apiConfig from "@/services/api/config";
import { getClassAutoComplete } from "@/services/api/grade";
import { getClassroomAvailListResource } from "@/services/api/resource";
import { filterProps } from "@/utils/filter-props";

function useClassAvailable() {
    const queryClient = useQueryClient();

    const fetchData = useCallback(({ signal }, branchId, schoolYearId, seriesId) => {
        try {
            // if (!branchId) {
            //     return [];
            // }
            return getClassroomAvailListResource({
                data: filterProps({
                    branchId,
                    schoolYearId,
                    seriesId,
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
    }, []);

    const getClassAvailable = async (branchId, schoolYearId, seriesId) => {
        return queryClient.fetchQuery({
            queryKey: [
                apiConfig.resource.getClassroomAvailListResource.url,
                branchId,
                schoolYearId,
                seriesId,
            ],
            queryFn: () =>
                fetchData(
                    { signal: new AbortController().signal },
                    branchId,
                    schoolYearId,
                    seriesId,
                ),
            staleTime: Infinity,
            onError: (error) => {
                console.error("Error fetching roles data:", error);
            },
        });
    };

    return {
        getClassAvailable,
    };
}

export default useClassAvailable;
