import { NextResponse } from "next/server";

import createMiddlewareChain from "./middlewares";

const PUBLIC_FILE = /\.(.*)$/;

export default async function middleware(request) {
    const response = NextResponse.next();
    const pathname = request.nextUrl.pathname;

    if (PUBLIC_FILE.test(pathname)) {
        return response;
    }

    return await createMiddlewareChain(request, response);
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image).*)",
        "/",
    ],
};
