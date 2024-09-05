import { useState } from "react";
import {
    HydrationBoundary,
    matchQuery,
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { castArray } from "lodash";

function QueryProvider({ children, ...props }) {
    const [ queryClient ] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: false,
                        retryOnMount: false,
                        refetchOnWindowFocus: false,
                    },
                },
                queryCache: new QueryCache({
                    onError: (err, query) => {
                        query.meta?.onError?.(err);
                    },
                }),
                mutationCache: new MutationCache({
                    onSuccess: (_data, _variables, _context, mutation) => {
                        queryClient.invalidateQueries({
                            predicate: (query) =>
                                mutation.meta?.invalidates?.some((queryKey) =>
                                    matchQuery({ queryKey: castArray(queryKey) }, query),
                                ),
                        });
                    },
                }),
            }),
    );

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={props.dehydratedState}>{children}</HydrationBoundary>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default QueryProvider;
