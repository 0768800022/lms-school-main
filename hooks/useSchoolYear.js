import { useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { commonStatusSchoolyear } from "@/constants/constant";
import { getSchoolYearAutoComplete, renderGetListFetcher } from "@/services/api/common";
import apiConfig from "@/services/api/config";

function useSchoolYear({ placeholder, isAvailable = false, branchId } = {}) {
    const queryClient = useQueryClient();

    const { data, error, isFetching } = useQuery({
        queryKey: [ apiConfig.schoolYear.autocomplete.url, { isAvailable, branchId } ],
        enabled: !!branchId,
        queryFn: renderGetListFetcher(apiConfig.schoolYear.autocomplete),
        staleTime: Infinity,
        onError: (error) => {
            console.error("Error fetching schoolYear data:", error);
        },
        placeholderData: { data: placeholder || [] },
        select: (data) =>
            data?.data?.map((item) => {
                item.value = item.id;
                item.label = item.name;

                return item;
            }),
    });

    const fetchData = useCallback(({ signal }, branchId) => {
        try {
            return getSchoolYearAutoComplete({
                data: {
                    branchId,
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

    const getSchoolYear = async (value) => {
        return queryClient.fetchQuery({
            queryKey: [ "school-year-auto-complete", value ],
            queryFn: () => fetchData({ signal: new AbortController().signal }, value),
            staleTime: Infinity,
            onError: (error) => {
                console.error("Error fetching roles data:", error);
            },
        });
    };

    const defaultSchoolYear = useMemo(
        () => data?.find((item) => item.state === commonStatusSchoolyear.GOING_ON),
        [ data ],
    );

    return { schoolYear: data, defaultSchoolYear, error, isFetching, getSchoolYear };
}

export default useSchoolYear;
