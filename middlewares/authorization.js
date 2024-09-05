import { getCookie } from "cookies-next";

import { ROLES_CODE, storageKeys } from "@/constants/constant";
import { routesRoles } from "@/constants/paths";
import { logDevelopmentError } from "@/utils";
import { extractMetaParam } from "@/utils/auth";
import { matchPath } from "@/utils/path";

import { rewriteForbidden } from "./utils";

// import type { NextRequest } from 'next/server'

export default async function authorization(req, res, next) {
    const { role: userRoleParam, branchId: branchIdParam } = extractMetaParam(
        req.nextUrl.searchParams.get("meta"),
    );
    const storageUserRole = getCookie(storageKeys.role, { req, res });
    const storageBranchId = getCookie(storageKeys.branchId, { req, res });
    const userRole = userRoleParam || storageUserRole;
    const branchId = branchIdParam || storageBranchId;

    if (
        ![ ROLES_CODE.SUPER_ADMIN, ROLES_CODE.ADMIN, ROLES_CODE.TEACHER ].includes(userRole) ||
        (userRole !== ROLES_CODE.SUPER_ADMIN && !branchId)
    ) {
        logDevelopmentError("middleware authorization rewriteForbidden", req.nextUrl);
        return rewriteForbidden({ req });
    }

    const currentPath = req.nextUrl.pathname;
    const pattern = Object.keys(routesRoles).find((path) => matchPath(path, currentPath));
    const routeRole = routesRoles[pattern];

    if (routeRole?.length > 0 && !routeRole.includes(userRole)) {
        logDevelopmentError("middleware authorization rewriteForbidden", req.nextUrl);
        return rewriteForbidden({ req });
    }

    return next(req, res);
}
