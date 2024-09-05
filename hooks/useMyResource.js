import { useEffect } from "react";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";

import apiConfig from "@/services/api/config";
import { getResourcesExplorer, getResourcesExplorerBreadcrumbs } from "@/services/api/resource";

import useFetch from "./useFetch";

function useMyResource(filter, fetchConfig) {
    const resourcesQueryKey = [
        [ apiConfig.myResource.getList.url, apiConfig.resourceFolder.getList.url ],
        filter,
    ];

    const {
        data: resources,
        isFetching: isResourcesLoading,
        error: resourcesError,
        refetch: refetchResources,
        execute: executeResources,
    } = useFetch({
        queryKey: resourcesQueryKey,
        queryFn: async (config) => await getResourcesExplorer({ params: filter, ...config }),
        placeholderData: keepPreviousData,
        ...fetchConfig,
    });

    return {
        resources,
        resourcesQueryKey,
        isResourcesLoading,
        resourcesError,
        refetchResources,
        executeResources,
    };
}

export function useMyResourceBreadcrumb(filter, fetchConfig) {
    const queryClient = useQueryClient();
    const breadcrumbsQueryKey = [ apiConfig.resourceFolder.getListBreadcrumb.url, filter ];

    const {
        data: breadcrumbs,
        isFetching: isBreadcrumbsLoading,
        error: breadcrumbsError,
        refetch: refetchBreadcrumbs,
        execute: executeBreadcrumbs,
    } = useFetch({
        queryKey: breadcrumbsQueryKey,
        staleTime: Infinity,
        queryFn: async (config) =>
            await getResourcesExplorerBreadcrumbs({ pathParams: filter, ...config }),
        placeholderData: keepPreviousData,
        enabled: !!filter?.folderId,
        select: (res) => {
            const getBreadcrumbItems = (data) => {
                if (!data) return [];

                const item = [ { label: data.name, id: data.id } ];

                if (data.folder) {
                    return item.concat(getBreadcrumbItems(data.folder));
                }

                return item;
            };

            return getBreadcrumbItems(res.data);
        },
        ...fetchConfig,
    });

    useEffect(() => {
        if (!filter?.folderId) {
            queryClient.setQueryData([ apiConfig.resourceFolder.getListBreadcrumb.url, filter ], []);
        }
    }, [ filter?.folderId ]);

    return {
        breadcrumbs,
        breadcrumbsQueryKey,
        isBreadcrumbsLoading,
        breadcrumbsError,
        refetchBreadcrumbs,
        executeBreadcrumbs,
    };
}

export default useMyResource;
