import { filterProps } from "@/utils/filter-props";

import apiConfig from "./config";
import fetcher from "./fetcher";

export async function getResources({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.resource.getList, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getMyResources({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.myResource.getList, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function upLoadFile({ context, data } = {}) {
    const res = await fetcher(apiConfig.myResource.uploadFile, {
        context,
        data,
    });

    return res?.data;
}

export async function getResourcesTeachingPlan({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.teachingPlanResource.getList, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getResourcesAutoComplete({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.resource.getResourcesAutoComplete, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getResourcesSeries({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.resource.resourceSeries, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getResourcesSeriesDetail({ context, id } = {}) {
    const res = await fetcher(apiConfig.resource.getSeriesDetail, {
        context,
        pathParams: {
            id,
        },
    });

    return res?.data;
}

export async function getResourcesCategory({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.resource.getResourceCategory, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function branchAllocation({ context, data }) {
    const res = await fetcher(apiConfig.resource.branchAllocation, {
        context,
        data,
    });

    return res?.data;
}

export function getBranchAllocation(apiConfig) {
    return async ({ queryKey, signal }) => {
        const [ , params ] = queryKey;
        const { data } = await fetcher(apiConfig, { params, signal });

        return data;
    };
}

export async function getClassroomAllocation({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.resource.getClassroomAllocation, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getClassroomAllocationDetail({ context, id } = {}) {
    const res = await fetcher(apiConfig.resource.getClassroomAllocationDetail, {
        context,
        pathParams: {
            id,
        },
    });

    return res?.data;
}

export async function getClassroomAvailListResource({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.resource.getClassroomAvailListResource, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function getResourceDetail({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.resource.getResourceDetail, {
        context,
        pathParams: data,
        ...rest,
    });

    return res?.data;
}

export async function getMyResourcesList({ context, data, queryKey, ...rest } = {}) {
    const parentId = queryKey[2];
    const [ filesResponse, folderResponse ] = await Promise.all([
        fetcher(apiConfig.myResource.getList, {
            context,
            params: filterProps({
                folderId: parentId,
            }),
            ...rest,
        }).then((res) => res.data.data.data || []),
        fetcher(apiConfig.resourceFolder.getList, {
            context,
            params: filterProps({
                parentId,
            }),
            ...rest,
        }).then((res) => res.data.data || []),
    ]);

    return [ ...folderResponse, ...filesResponse ];
}

export async function getResourcesExplorer(config) {
    const [ filesResponse, folderResponse ] = await Promise.all([
        fetcher(apiConfig.myResource.getList, config).then((res) => res.data.data.data || []),
        fetcher(apiConfig.resourceFolder.getList, config).then((res) => res.data.data || []),
    ]);

    return [ ...folderResponse, ...filesResponse ];
}

export async function getResourcesExplorerBreadcrumbs(config) {
    const res = await fetcher(apiConfig.resourceFolder.getListBreadcrumb, config);

    return res?.data;
}
