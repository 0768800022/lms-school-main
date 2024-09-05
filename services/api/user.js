import apiConfig from "./config";
import fetcher from "./fetcher";

export async function getUsers({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.user.getList, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}

export async function updateUserStatus({ context, data }) {
    const res = await fetcher(apiConfig.user.updateStatus, {
        context,
        data,
    });

    return res?.data;
}

export async function getUserDetail({ context, id } = {}) {
    const res = await fetcher(apiConfig.user.getDetail, {
        context,
        pathParams: {
            id,
        },
    });

    return res?.data;
}

export async function createUser({ context, data }) {
    const res = await fetcher(apiConfig.user.createUser, {
        context,
        data,
    });

    return res?.data;
}

export async function updateUser({ context, data }) {
    const res = await fetcher(apiConfig.user.updateUser, {
        context,
        data,
    });

    return res?.data;
}

export async function assignBranchRole({ context, data }) {
    const res = await fetcher(apiConfig.user.assignBranchRole, {
        context,
        data,
    });

    return res?.data;
}

export async function unAssignBranchRole({ context, data }) {
    const res = await fetcher(apiConfig.user.unAssignBranchRole, {
        context,
        data,
    });

    return res?.data;
}

export async function getUsersAutocomplete({ context, data, ...rest } = {}) {
    const res = await fetcher(apiConfig.user.autocomplete, {
        context,
        params: data,
        ...rest,
    });

    return res?.data;
}
