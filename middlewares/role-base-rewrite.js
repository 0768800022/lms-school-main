import { getCookie } from "cookies-next";

import { ROLES_CODE, storageKeys } from "@/constants/constant";
import { teacherRewritePaths } from "@/constants/paths";
import { logDevelopmentError } from "@/utils";
import { extractMetaParam } from "@/utils/auth";
import { extractPathParams, matchPath } from "@/utils/path";

import { rewrite, rewriteForbidden } from "./utils";

export default async function roleBaseRewrite(req, res, next) {
    const { classId: classIdParams, role: userRoleParam } = extractMetaParam(
        req.nextUrl.searchParams.get("meta"),
    );
    const userRole = userRoleParam || getCookie(storageKeys.role, { req, res });
    const defaultClassId = classIdParams || getCookie(storageKeys.teacherDefaultClass, { req, res });

    if (userRole === ROLES_CODE.TEACHER) {
        // if (!defaultClassId) {
        //     logDevelopmentError("middleware roleBaseRewrite rewriteForbidden", req.nextUrl);
        //     return rewriteForbidden({ req });
        // }

        const rewritePath = generateRewritePath(req, {
            defaultParam: defaultClassId,
        });

        if (!rewritePath) return next(req, res);

        return rewrite({ req, res, path: rewritePath });
    }

    return next(req, res);
}

function generatePath(pathname, params) {
    return Object.entries(params).reduce((acc, [ key, value ]) => {
        return acc.replace(key, value);
    }, pathname);
}

function generateRewritePath(request, pathParams) {
    const { pathname } = request.nextUrl;
    const { defaultParam, ...params } = pathParams;
    const [ teacherPath, rewriteUrl ] =
        Object.entries(teacherRewritePaths).find(([ pattern ]) => matchPath(pattern, pathname)) || [];

    if (!rewriteUrl) return null;

    return (
        generatePath(rewriteUrl.rewriteUrl, {
            ...params,
            ...extractPathParams(pathname, teacherPath),
            [rewriteUrl.defaultParamKey]: defaultParam,
        }) + request.nextUrl.search
    );
}
