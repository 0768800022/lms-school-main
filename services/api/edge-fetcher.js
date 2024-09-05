import { getCookie } from "cookies-next";
import queryString from "query-string";

import { API_BASE_URL, storageKeys } from "@/constants/constant";
import { deleteAllAuthCookies, setAuthCookie } from "@/utils/auth";
import canUseDom from "@/utils/can-use-dom";
import { generatePath } from "@/utils/path";
import { getOrigin, getSsoCookieDomain } from "@/utils/url";

import apiConfig, { HEADERS } from "./config";

async function request({
    method,
    url,
    headers,
    data,
    params,
    pathParams,
    req,
    res,
    signal,
    sent,
    ...rest
}) {
    const _url = queryString.stringifyUrl({
        url: new URL(url, API_BASE_URL).toString(),
        query: params,
    });

    let body = data;
    if (headers["Content-Type"] === HEADERS.JSON["Content-Type"]) {
        body = JSON.stringify(data);
    }

    const accessToken = getCookie(storageKeys.accessToken, {
        req,
        res,
    });

    const branchId = getCookie(storageKeys.branchId, {
        req,
        res,
    });

    if (accessToken) {
        headers["Authorization"] = "C-Token " + accessToken;
    }

    if (branchId) {
        headers["BranchId"] = branchId;
    }

    if (!canUseDom()) {
        headers["Origin"] = getOrigin(req);
    }

    const response = await fetch(_url, {
        method,
        mode: "cors",
        headers,
        body,
    });

    if (response.ok) {
        return response;
    }
    if (response.status === 401 && !sent) {
        const newAccessToken = await refreshToken({ req, res });
        if (newAccessToken) {
            return await request({
                method,
                url,
                headers,
                data,
                params,
                pathParams,
                req,
                res,
                signal,
                sent: true,
                ...rest,
            });
        }
    }

    throw {
        status: response.status,
    };
}

async function refreshToken({ res, req }) {
    const storedRefreshToken = getCookie(storageKeys.refreshToken, {
        req,
        res,
    });
    if (!storedRefreshToken) return null;

    try {
        const response = await request({
            ...apiConfig.account.refreshToken,
            data: { refreshToken: storedRefreshToken },
        });

        const data = await response.json();

        const { accessToken, refreshToken } = data.data;

        setAuthCookie(storageKeys.accessToken, accessToken, {
            req,
            res,
            domain: getSsoCookieDomain(req),
        });
        setAuthCookie(storageKeys.refreshToken, refreshToken, {
            req,
            res,
            domain: getSsoCookieDomain(req),
        });

        return accessToken;
    } catch (e) {
        console.warn("Edge refresh token error", e);
        return null;
    }
}

export async function edgeFetcher(
    { method, url, headers } = {},
    { data, params, pathParams, req, res, signal, ...rest } = {},
) {
    try {
        return await request({
            url: generatePath(url, pathParams),
            method,
            params,
            headers,
            data,
            signal,
            req,
            res,
            ...rest,
        });
    } catch (error) {
        if (error.status === 401) {
            deleteAllAuthCookies({ req, res });
        }

        throw error;
    }
}
