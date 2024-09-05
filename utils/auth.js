import { deleteCookie, setCookie } from "cookies-next";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import { storageKeys } from "@/constants/constant";

import canUseDom from "./can-use-dom";
import { getSsoCookieDomain, getSsoUrl } from "./url";

dayjs.extend(duration);

export const setAuthCookie = (key, value, { remember, req, res, domain, ...options } = {}) => {
    const maxAge = remember
        ? dayjs.duration({ days: 365 }).asSeconds()
        : dayjs.duration({ days: 30 }).asSeconds();

    setCookie(key, value, {
        domain,
        maxAge,
        req,
        res,
        ...options,
    });
};

export const deleteAuthCookie = (key, { req, res, domain } = {}) => {
    deleteCookie(key, { domain, req, res });
};

export const deleteAllAuthCookies = ({ req, res } = {}) => {
    const ssoDomain = getSsoCookieDomain(req);

    deleteAuthCookie(storageKeys.accessToken, { req, res, domain: ssoDomain });
    deleteAuthCookie(storageKeys.refreshToken, { req, res, domain: ssoDomain });
    deleteAuthCookie(storageKeys.role, { req, res });
    deleteAuthCookie(storageKeys.branchId, { req, res });
    deleteAuthCookie(storageKeys.teacherDefaultClass, { req, res });
};

export const logout = ({ req, res } = {}) => {
    deleteAllAuthCookies({ req, res });

    if (canUseDom()) {
        location.assign(getSsoUrl(req));
    } else {
        res.writeHead(307, { Location: getSsoUrl(req) }).end();
    }
};

export const roleValidator = (userRole, requiredRoles) => {
    if (!requiredRoles?.length) return true;

    return requiredRoles.some((role) => userRole === role);
};

export const extractMetaParam = (metaParam) => {
    const [ role, branchId, classId ] = metaParam?.split(",") || [];

    return { role, branchId, classId };
};
