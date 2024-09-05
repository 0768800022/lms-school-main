import { isArray, isObject } from "lodash";

export function cleanObject(obj = {}, { clear = [ undefined ], recursive = true } = {}) {
    return Object.entries(obj).reduce((acc, [ key, value ]) => {
        if (recursive && isObject(value) && !isArray(value)) {
            acc[key] = cleanObject(value, { clear });
        } else if (!clear.includes(value) || (isArray(value) && value.length > 0)) {
            acc[key] = value;
        }

        return acc;
    }, {});
}

export function filterProps(...args) {
    return args.map((arg) => arg[0] || arg[1]);
}

export function overridableFunc(originalFunc, overrideFunc) {
    return (...args) => {
        if (overrideFunc) {
            return overrideFunc(...args, originalFunc);
        }
        return originalFunc(...args);
    };
}

export function logDevelopmentError(errorMessage, ...args) {
    if (process.env.NODE_ENV === "development") {
        console.error(`[APP]: ${errorMessage}`, ...args);
    }
}

export const findLabelByValue = (options, value, defaultValue = "") => {
    return options.find((el) => el.value === value)?.label || defaultValue;
};


export function convertBytes(bytes) {
    const units = [ "B", "KB", "MB", "GB", "TB" ];

    let size = bytes;

    for (let i = 0; i < units.length; i++) {
        if (size < 1024) {
            return `${Math.round(size)} ${units[i]}`;
        }
        size /= 1024;
    }
}
