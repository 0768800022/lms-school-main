import { useCallback, useEffect } from "react";
import { hashKey, useQuery, useQueryClient } from "@tanstack/react-query";
import { isEqual } from "lodash";

import useCallbackRef from "@/hooks/useCallbackRef";
import useMountedState from "@/hooks/useMountedState";

function useFetch({ queryKey, queryFn, ...options } = {}) {
    const queryClient = useQueryClient();
    const queryFnCallback = useCallbackRef(queryFn);
    const [ queryResult, setQueryResult ] = useMountedState({});

    const query = useQuery({
        queryKey,
        queryFn: queryFnCallback,
        ...options,
    });

    useEffect(() => {
        setQueryResult(query);
    }, [ query.fetchStatus, query.dataUpdatedAt ]);

    const execute = useCallback(
        async (payload, { onSuccess, onError, onSettled } = {}) => {
            try {
                const composedKey = [ ...queryKey, payload ].filter(Boolean);

                if (isEqual(composedKey, queryKey)) {
                    query.refetch();
                    return;
                }

                setQueryResult((prev) => ({ ...prev, isFetching: true }));

                const data = await queryClient.fetchQuery({
                    queryKey: composedKey,
                    queryFn: (context) => queryFnCallback({ ...context, payload }),
                    ...options,
                });

                const selectData = options?.select?.(data) ?? data;

                setQueryResult((prev) => ({ ...prev, data: selectData, error: null }));
                onSuccess?.(data);

                return data;
            } catch (e) {
                setQueryResult((prev) => ({ ...prev, error: e }));
                onError?.(e);
            } finally {
                setQueryResult((prev) => ({ ...prev, isFetching: false }));
                onSettled?.();
            }
        },
        [ queryClient, hashKey(queryKey) ],
    );

    return {
        ...queryResult,
        execute,
    };
}

export default useFetch;
