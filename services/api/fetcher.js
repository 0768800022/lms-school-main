import axios from "axios";
import { getCookie, getCookies } from "cookies-next";
import mem from "mem";
import queryString from "query-string";

import { API_BASE_URL, storageKeys } from "@/constants/constant";
import paths, { publicPaths } from "@/constants/paths";
import apiConfig from "@/services/api/config";
import { logDevelopmentError } from "@/utils";
import { logout, setAuthCookie } from "@/utils/auth";
import canUseDom from "@/utils/can-use-dom";
import { doesPathInPaths, generatePath } from "@/utils/path";
import { getOrigin, getSsoCookieDomain } from "@/utils/url";

const instanceConfig = {
    baseURL: API_BASE_URL,
    paramsSerializer: (params) =>
        queryString.stringify(params, {
            arrayFormat: "comma",
            skipEmptyString: true,
            skipNull: true,
        }),
};

const instance = axios.create(instanceConfig);
const refreshInstance = axios.create(instanceConfig);

const refreshToken = mem(
    async (context) => {
        const storedRefreshToken = getCookie(storageKeys.refreshToken, {
            req: context?.req,
            res: context?.res,
        });
        if (!storedRefreshToken) return null;

        try {
            const { data } = await refreshInstance.request({
                ...apiConfig.account.refreshToken,
                data: { refreshToken: storedRefreshToken },
                headers: {
                    ...(!canUseDom() ? { Origin: getOrigin(context?.req) } : {}),
                },
            });

            const { accessToken, refreshToken } = data.data;
            setAuthCookie(storageKeys.accessToken, accessToken, {
                req: context?.req,
                res: context?.res,
                domain: getSsoCookieDomain(context?.req),
            });
            setAuthCookie(storageKeys.refreshToken, refreshToken, {
                req: context?.req,
                res: context?.res,
                domain: getSsoCookieDomain(context?.req),
            });

            return accessToken;
        } catch (e) {
            console.warn("Refresh token error", e);
            return null;
        }
    },
    { maxAge: 10000 },
);

instance.interceptors.request.use(
    async (config) => {
        const { context } = config;

        const { [storageKeys.accessToken]: accessToken, [storageKeys.branchId]: branchId } =
            getCookies({
                req: context?.req,
                res: context?.res,
            });

        if (accessToken) {
            config.headers["Authorization"] = "C-Token " + accessToken;
        }

        if (branchId && !config.headers["branchId"]) {
            config.headers["branchId"] = branchId;
        }

        if (!canUseDom()) {
            config.headers["Origin"] = getOrigin(context?.req);
        }

        return config;
    },
    (error) => Promise.reject(error),
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const config = error?.config;

        if (error?.response?.status === 401 && !config.sent) {
            config.sent = true;
            const accessToken = await refreshToken(canUseDom() ? null : config.context);

            if (accessToken) {
                return instance.request(config);
            }
        }

        return Promise.reject(error);
    },
);

const fetcher = async (
    { method, url, headers } = {},
    { data, params, pathParams, context = {}, signal, ...rest } = {},
) => {
    try {
        return await instance.request({
            method,
            url: generatePath(url, pathParams),
            headers,
            data,
            params,
            signal,
            context,
            ...rest,
        });
    } catch (error) {
        const { req, res } = context;

        if (error?.response?.status === 401) {
            logDevelopmentError("fetcher 401 logout", error.config.url);
            logout({ req, res });
        } else if (error?.response?.status === 403) {
            logDevelopmentError("fetcher 403 redirect forbidden", error.config.url);
            redirect({ context, path: paths.forbidden });
        }

        throw error;
    }
};

function redirect({ context, path }) {
    const { res } = context;
    const currentPath = context?.resolvedUrl || location.pathname;
    const isPublicPath = doesPathInPaths(currentPath, publicPaths);

    if (currentPath === path || isPublicPath) {
        return;
    }

    if (canUseDom()) {
        location.assign(path);
    } else {
        res.writeHead(307, { Location: path }).end();
    }
}

export { instance as api };
export default fetcher;
