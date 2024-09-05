import { NextResponse } from "next/server";

import paths from "@/constants/paths";
import { deleteAllAuthCookies } from "@/utils/auth";
import { getSsoUrl } from "@/utils/url";

export const mergeHeaders = (res, newRes) => {
    res.headers.forEach((value, key) => {
        newRes.headers.append(key, value);
    });

    return newRes;
};

export const redirect = ({ req, res, url, path }) => {
    const destination = url ? url : new URL(path, req.url);
    const newRes = NextResponse.redirect(destination.toString(), {});

    return mergeHeaders(res, newRes);
};

export const rewrite = ({ req, res, path, url }) => {
    const destination = url ? url : new URL(path, req.url);
    const newRes = NextResponse.rewrite(destination, { request: req });

    return mergeHeaders(res, newRes);
};

export const redirectLogin = ({ res, req }) => {
    deleteAllAuthCookies({ res, req });

    return redirect({ req, res, url: getSsoUrl(req) });
};

export const rewriteForbidden = ({ req }) =>
    NextResponse.rewrite(new URL(paths.forbidden, req.url), { request: req });
