import canUseDom from "./can-use-dom";

const getHeadersValue = (headers, key) => {
    if (!headers) return null;

    return headers[key] || headers.get(key);
};

export const getHostname = (req) => {
    if (canUseDom()) return window.location.hostname;

    const headers = req?.headers;
    if (!headers) return null;

    const hostnameWithPort =
        getHeadersValue(headers, "host") || getHeadersValue(headers, "x-forwarded-host");
    if (!hostnameWithPort) return null;

    return hostnameWithPort.split(":")[0];
};

export const getOrigin = (req) => {
    if (canUseDom()) return window.location.origin;

    const hostname = getHostname(req);
    if (!hostname) return null;

    return `https://${hostname}`;
};

export const getSsoDomain = (req) => {
    const hostname = getHostname(req);
    if (!hostname) return null;

    const [ , ...ssoUrlArr ] = hostname.split(".");
    return ssoUrlArr.join(".");
};

export const getSsoCookieDomain = (req) => {
    const ssoDomain = getSsoDomain(req);
    if (!ssoDomain) return null;

    return `.${ssoDomain}`;
};

export const getSsoUrl = (req) => {
    const ssoDomain = getSsoDomain(req);
    if (!ssoDomain) return null;

    return `https://${ssoDomain}`;
};

export const openNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
};
