import { useEffect, useRef, useState } from "react";

/**
 * Older versions of Safari (shipped withCatalina and before) do not support addEventListener on matchMedia
 * https://stackoverflow.com/questions/56466261/matchmedia-addlistener-marked-as-deprecated-addeventlistener-equivalent
 * */
function attachMediaListener(query, callback) {
    try {
        query.addEventListener("change", callback);
        return () => query.removeEventListener("change", callback);
    } catch (e) {
        query.addListener(callback);
        return () => query.removeListener(callback);
    }
}

function getInitialValue(query, initialValue) {
    if (typeof initialValue === "boolean") {
        return initialValue;
    }

    if (typeof window !== "undefined" && "matchMedia" in window) {
        return window.matchMedia(query).matches;
    }

    return false;
}

export function useMediaQuery(
    query,
    initialValue,
    { getInitialValueInEffect } = {
        getInitialValueInEffect: true,
    },
) {
    const [ matches, setMatches ] = useState(
        getInitialValueInEffect
            ? initialValue
            : getInitialValue(query, initialValue),
    );
    const queryRef = useRef();

    useEffect(() => {
        if ("matchMedia" in window) {
            queryRef.current = window.matchMedia(query);
            setMatches(queryRef.current.matches);
            return attachMediaListener(queryRef.current, (event) =>
                setMatches(event.matches),
            );
        }

        return undefined;
    }, [ query ]);

    return matches;
}
