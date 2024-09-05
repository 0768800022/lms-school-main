import apiConfig from "@/services/api/config";

import fetcher from "./fetcher";

export async function login({ context, data }) {
    const res = await fetcher(apiConfig.account.login, {
        data,
        context,
    });

    return res?.data;
}

export async function getProfile({ context } = {}) {
    const res = await fetcher(apiConfig.account.profile, {
        context,
    });

    return res?.data;
}

export async function getSchoolInfo({ context } = {}) {
    const res = await fetcher(apiConfig.account.getSchoolInfo, {
        context,
    });
    return res?.data;
}

export async function updateProfile({ context, data } = {}) {
    const res = await fetcher(apiConfig.account.updateProfile, {
        context,
        data,
    });

    return res?.data;
}

export async function changePassword({ context, data } = {}) {
    const res = await fetcher(apiConfig.account.changePassword, {
        context,
        data,
    });

    return res?.data;
}

export async function updateAvatar({ context, data } = {}) {
    const res = await fetcher(apiConfig.account.updateAvatar, {
        context,
        data,
    });

    return res?.data;
}

export async function updateLogo({ context, data } = {}) {
    const res = await fetcher(apiConfig.account.updateLogo, {
        context,
        data,
    });

    return res?.data;
}

export async function getBranchRoles({ context, data } = {}) {
    const res = await fetcher(apiConfig.account.getBranchRoles, {
        context,
        data,
    });

    return res?.data;
}
