import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { castArray } from "lodash";

import { generateAsPath } from "@/utils/path";

function useQueryParams(paramsType) {
    const { push, replace, isReady, query, pathname, asPath } = useRouter();

    const queryParams = useMemo(() => parseParams(query, paramsType), [ query ]);

    const setQueryParams = useCallback(
        (
            params,
            { pushState = false, mergePreviousParams = true, shallow = true, ...options } = {},
        ) => {
            if (!isReady) return;

            const newQueryParams = mergeParams(params, queryParams, mergePreviousParams);

            const routerAction = pushState ? push : replace;

            routerAction(
                {
                    query: newQueryParams,
                },
                generateAsPath({ query: newQueryParams, asPath, pathname }),
                { shallow, ...options },
            );
        },
        [ queryParams, push, replace, pathname, asPath ],
    );

    return [ queryParams, setQueryParams ];
}

function mergeParams(params, previousParams, mergePreviousParams) {
    if (typeof params === "function") {
        return params(previousParams);
    }

    return mergePreviousParams ? { ...previousParams, ...params } : params;
}

const parseStrategies = {
    number: {
        test: (value) => !isNaN(value),
        parse: Number,
    },
    boolean: {
        test: (value) => value === "true" || value === "false",
        parse: (value) => value === "true",
    },
    string: {
        test: () => true,
        parse: String,
    },
    "array.string": {
        test: () => true,
        parse: castArray,
    },
};

const parseValue = (value) => {
    const typeParsers = {
        string: [ parseStrategies.number, parseStrategies.boolean, parseStrategies.string ],
    };

    const parser = typeParsers[typeof value]?.find(({ test }) => test(value));
    return parser ? parser.parse(value) : value;
};

const parseValueByType = (value, type) =>
    parseStrategies[type]?.test(value) ? parseStrategies[type].parse(value) : value;

const parseParams = (params = {}, types = {}) => {
    return Object.entries(params).reduce((acc, [ key, value ]) => {
        if (value == null || value === "") return acc;

        acc[key] = types[key] ? parseValueByType(value, types[key]) : parseValue(value);
        return acc;
    }, {});
};

export default useQueryParams;
