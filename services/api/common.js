import { delayResult } from "@/utils/delay-result";

import apiConfig from "./config";
import fetcher from "./fetcher";

export async function getRoles({ context } = {}) {
    const res = await fetcher(apiConfig.role.getList, {
        context,
    });

    return res?.data;
}

export async function getBranches({ context } = {}) {
    const res = await fetcher(apiConfig.branch.getList, {
        context,
    });

    return res?.data;
}

export async function GetUnitTest({ context } = {}) {
    const res = await fetcher(apiConfig.branch.getList, {
        context,
    });

    return res?.data;
}

export async function getSchoolYearAutoComplete({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.schoolYear.autocomplete, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export function renderGetListFetcher(apiConfig, config) {
    return async ({ queryKey, signal }) => {
        const [ , params ] = queryKey;
        const { data } = await fetcher(apiConfig, { signal, params, ...config });

        return data;
    };
}

export function renderGetDetailFetcher(apiConfig, delayTime = 300) {
    return async ({ queryKey, signal }) => {
        const [ , pathParams ] = queryKey;
        const { data } = await delayResult(fetcher(apiConfig, { pathParams, signal }), delayTime);

        return data;
    };
}

export function renderDeleteFetcher(apiConfig) {
    return async (id) => {
        const res = await fetcher(apiConfig, { pathParams: { id } });
        return res?.data;
    };
}

export function renderCreateFetcher(apiConfig) {
    return async (data) => {
        const res = await fetcher(apiConfig, { data });
        return res?.data;
    };
}

export function renderUpdateFetcher(apiConfig) {
    return async (data) => {
        const res = await fetcher(apiConfig, { data });
        return res?.data;
    };
}

export async function getTeachingPlanDetail({ context, id,...rest } = {}) {
    const res = await fetcher(apiConfig.teachingPlan.getDetail, {
        context,
        pathParams: {
            id,
        },
        ...rest,
    });

    return res?.data;
}

export async function createTeachingPlanItem({ context, data }) {
    const res = await fetcher(apiConfig.teachingPlanItem.create, {
        context,
        data,
    });

    return res?.data;
}

export async function updateTeachingPlanItem({ context, data }) {
    const res = await fetcher(apiConfig.teachingPlanItem.update, {
        context,
        data,
    });

    return res?.data;
}

export function renderGetDetailTimeTableValueFetcher(apiConfig, delayTime = 300) {
    return async ({ queryKey, signal }) => {
        const [ , { timetableValueId, weekId } ] = queryKey;

        const { data } = await delayResult(
            fetcher(apiConfig, {
                pathParams: { timetableValueId: timetableValueId, weekId: weekId },
                signal,
            }),
            delayTime,
        );

        return data;
    };
}
