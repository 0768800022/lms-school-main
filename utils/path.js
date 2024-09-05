import queryString from "query-string";

export const removeTrailingSlash = (val) =>
    val?.endsWith("/") ? val?.substring(0, val.length - 1) : val;

export const matchPath = (pattern = "", pathname = "") => {
    if (pattern === pathname) {
        return true;
    }
    const baseAsPath = removeTrailingSlash(pathname?.split("?")[0]);
    const basePathname = removeTrailingSlash(pattern?.split("?")[0]);
    if (baseAsPath === basePathname) {
        return true;
    }
    const basePathRegex = new RegExp(
        `^${basePathname.replace(/(\[[a-zA-Z0-9-]+\])+/g, "[a-zA-Z0-9-]+")}$`
            .replace(/\[\[\.\.\.[a-zA-Z0-9-]+\]\]/g, "?.*")
            .replace(/\[\.\.\.[a-zA-Z0-9-]+\]/g, ".*"),
    );
    if (basePathRegex.test(baseAsPath)) {
        return true;
    }
    return false;
};

export function extractPathParams(originalPath = "", pathname = "") {
    const baseOriginalPath = removeTrailingSlash(originalPath?.split("?")[0]);
    const basePathname = removeTrailingSlash(pathname?.split("?")[0]);
    const regexPattern = new RegExp(
        `^${basePathname.replace(/(\[[a-zA-Z0-9-]+\])+/g, "(.+)")}$`
            .replace(/\[\[\.\.\.[a-zA-Z0-9-]+\]\]/g, "?(.*)")
            .replace(/\[\.\.\.[a-zA-Z0-9-]+\]/g, "(.*)"),
    );

    const paramsKeys = regexPattern.exec(basePathname);

    if (!originalPath) {
        return paramsKeys?.reduce((acc, cur, index) => {
            if (index === 0) return acc;
            acc.push(cur.replaceAll("[", "").replaceAll("]", "").replaceAll(".", ""));
            return acc;
        }, []);
    }

    return regexPattern.exec(baseOriginalPath)?.reduce((acc, cur, index) => {
        if (index === 0) return acc;
        acc[paramsKeys[index]] = cur;
        return acc;
    }, {});
}

export function generateAsPath({ query, asPath, pathname }) {
    const pathParams = extractPathParams("", pathname);
    const newQuery = Object.entries(query).reduce((acc, [ key ]) => {
        if (!pathParams.includes(key)) {
            acc[key] = query[key];
        }
        return acc;
    }, {});
    const stringifyQuery = queryString.stringify(newQuery, {
        skipEmptyString: true,
        skipNull: true,
    });

    const asPathWithoutQuery = asPath.split("?")[0];

    if (!stringifyQuery) return asPathWithoutQuery;

    return asPathWithoutQuery + "?" + stringifyQuery;
}

// export from react-router

export function generatePath(originalPath, params = {}) {
    let path = originalPath;
    if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
        warning(
            false,
            `Route path "${path}" will be treated as if it were ` +
                `"${path.replace(/\*$/, "/*")}" because the \`*\` character must ` +
                `always follow a \`/\` in the pattern. To get rid of this warning, ` +
                `please change the route path to "${path.replace(/\*$/, "/*")}".`,
        );
        path = path.replace(/\*$/, "/*");
    }

    // ensure `/` is added at the beginning if the path is absolute
    const prefix = path.startsWith("/") ? "/" : "";

    const segments = path
        .split(/\/+/)
        .map((segment, index, array) => {
            const isLastSegment = index === array.length - 1;

            // only apply the splat if it's the last segment
            if (isLastSegment && segment === "*") {
                const star = "*";
                const starParam = params[star];

                // Apply the splat
                return starParam;
            }

            const keyMatch = segment.match(/^:(\w+)(\??)$/);
            if (keyMatch) {
                const [ , key, optional ] = keyMatch;
                let param = params[key];

                if (optional === "?") {
                    return param == null ? "" : param;
                }

                if (param == null) {
                    invariant(false, `Missing ":${key}" param`);
                }

                return param;
            }

            // Remove any optional markers from optional static segments
            return segment.replace(/\?$/g, "");
        })
        // Remove empty segments
        .filter((segment) => !!segment);

    return prefix + segments.join("/");
}

// export function matchPath(pattern, pathname) {
//     if (typeof pattern === "string") {
//         pattern = { path: pattern, caseSensitive: false, end: true };
//     }

//     let [ matcher, paramNames ] = compilePath(
//         pattern.path,
//         pattern.caseSensitive,
//         pattern.end,
//     );

//     let match = pathname.match(matcher);
//     if (!match) return null;

//     let matchedPathname = match[0];
//     let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
//     let captureGroups = match.slice(1);
//     let params = paramNames.reduce((memo, paramName, index) => {
//         // We need to compute the pathnameBase here using the raw splat value
//         // instead of using params["*"] later because it will be decoded then
//         if (paramName === "*") {
//             let splatValue = captureGroups[index] || "";
//             pathnameBase = matchedPathname
//                 .slice(0, matchedPathname.length - splatValue.length)
//                 .replace(/(.)\/+$/, "$1");
//         }

//         memo[paramName] = safelyDecodeURIComponent(
//             captureGroups[index] || "",
//             paramName,
//         );
//         return memo;
//     }, {});

//     return {
//         params,
//         pathname: matchedPathname,
//         pathnameBase,
//         pattern,
//     };
// }

function safelyDecodeURIComponent(value, paramName) {
    try {
        return decodeURIComponent(value);
    } catch (error) {
        warning(
            false,
            `The value for the URL param "${paramName}" will not be decoded because` +
                ` the string "${value}" is a malformed URL segment. This is probably` +
                ` due to a bad percent encoding (${error}).`,
        );

        return value;
    }
}

function compilePath(path, caseSensitive = false, end = true) {
    warning(
        path === "*" || !path.endsWith("*") || path.endsWith("/*"),
        `Route path "${path}" will be treated as if it were ` +
            `"${path.replace(/\*$/, "/*")}" because the \`*\` character must ` +
            `always follow a \`/\` in the pattern. To get rid of this warning, ` +
            `please change the route path to "${path.replace(/\*$/, "/*")}".`,
    );
    let paramNames = [];
    let regexpSource =
        "^" +
        path
            .replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
            .replace(/^\/*/, "/") // Make sure it has a leading /
            .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
            .replace(/\/:(\w+)/g, (_, paramName) => {
                paramNames.push(paramName);
                return "/([^\\/]+)";
            });
    if (path.endsWith("*")) {
        paramNames.push("*");
        regexpSource +=
            path === "*" || path === "/*"
                ? "(.*)$" // Already matched the initial /, just match the rest
                : "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
    } else if (end) {
        // When matching to the end, ignore trailing slashes
        regexpSource += "\\/*$";
    } else if (path !== "" && path !== "/") {
        // If our path is non-empty and contains anything beyond an initial slash,
        // then we have _some_ form of path in our regex so we should expect to
        // match only if we find the end of this path segment.  Look for an optional
        // non-captured trailing slash (to match a portion of the URL) or the end
        // of the path (if we've matched to the end).  We used to do this with a
        // word boundary but that gives false positives on routes like
        // /user-preferences since `-` counts as a word boundary.
        regexpSource += "(?:(?=\\/|$))";
    } else {
        // Nothing to match for "" or "/"
    }
    let matcher = new RegExp(regexpSource, caseSensitive ? undefined : "i");
    return [ matcher, paramNames ];
}

function warning(cond, message) {
    if (!cond) {
        // eslint-disable-next-line no-console
        if (typeof console !== "undefined") console.warn(message);

        try {
            // Welcome to debugging history!
            //
            // This error is thrown as a convenience so you can more easily
            // find the source for a warning that appears in the console by
            // enabling "pause on exceptions" in your JavaScript debugger.
            throw new Error(message);
            // eslint-disable-next-line no-empty
        } catch (e) {}
    }
}

function invariant(value, message) {
    if (value === false || value === null || typeof value === "undefined") {
        throw new Error(message);
    }
}

export const doesPathInPaths = (currentPath, paths) =>
    paths.some((path) => matchPath(path, currentPath));
