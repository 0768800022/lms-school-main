import { hasCookie } from "cookies-next";

import { storageKeys } from "@/constants/constant";
import paths, { publicPaths, unauthenticatedPaths } from "@/constants/paths";
import { logDevelopmentError } from "@/utils";
import { doesPathInPaths } from "@/utils/path";

import { redirect, redirectLogin } from "./utils";

export default async function authentication(req, res, next) {
    const currentPath = req.nextUrl.pathname;
    const isAuthenticated = hasCookie(storageKeys.accessToken, { req, res });

    const isUnauthenticatedPath = doesPathInPaths(currentPath, unauthenticatedPaths);
    const isPublicPath = doesPathInPaths(currentPath, publicPaths);
    const isPrivatePath = !isPublicPath && !isUnauthenticatedPath;

    let redirectPath;
    if (isAuthenticated && isUnauthenticatedPath) {
        redirectPath = paths.home;
    } else if (!isAuthenticated && isPrivatePath) {
        logDevelopmentError("middleware authentication redirectLogin", currentPath);
        return redirectLogin({ res, req });
    }

    if (redirectPath && redirectPath !== currentPath) {
        logDevelopmentError("middleware authentication redirect", redirectPath);
        return redirect({ res, req, path: redirectPath });
    }

    return next(req, res);
}
