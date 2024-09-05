import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";

const errorMessage = "Please ignore this error.";

const throwFakeErrorToFoolNextRouter = () => {
    // Throwing an actual error class trips the Next.JS 500 Page, this string literal does not.
    // eslint-disable-next-line no-throw-literal
    throw errorMessage;
};

const rejectionHandler = (event) => {
    if (event.reason === errorMessage) {
        event.preventDefault();
    }
};

const useNavigateConfirm = ({ shouldStopNavigation, onNavigate }) => {
    const router = useRouter();
    const currentPath = router.asPath;
    const nextPath = useRef("");
    const navigationConfirmed = useRef(false);

    const killRouterEvent = useCallback(() => {
        router.events.emit("routeChangeError", "", "", { shallow: false });
        throwFakeErrorToFoolNextRouter();
    }, [ router ]);

    useEffect(() => {
        navigationConfirmed.current = false;

        const onRouteChange = (url) => {
            if (currentPath !== url) {
                // if the user clicked on the browser back button then the url displayed in the browser gets incorrectly updated
                // This is needed to restore the correct url.
                // note: history.replaceState does not trigger a page reload
                window.history.replaceState(null, "", router.basePath + currentPath);
            }

            if (shouldStopNavigation && url !== currentPath && !navigationConfirmed.current) {
                // removing the basePath from the url as it will be added by the router
                nextPath.current = url.replace(router.basePath, "");
                onNavigate();
                killRouterEvent();
            }
        };

        const onBeforeUnload = (event) => {
            if (shouldStopNavigation) {
                event.preventDefault();
            }
        };

        router.events.on("routeChangeStart", onRouteChange);
        window.addEventListener("unhandledrejection", rejectionHandler);
        window.addEventListener("beforeunload", onBeforeUnload);

        return () => {
            router.events.off("routeChangeStart", onRouteChange);
            window.removeEventListener("unhandledrejection", rejectionHandler);
            window.removeEventListener("beforeunload", onBeforeUnload);
        };
    }, [
        currentPath,
        killRouterEvent,
        onNavigate,
        router.basePath,
        router.events,
        shouldStopNavigation,
    ]);

    const confirmNavigation = () => {
        navigationConfirmed.current = true;
        router.push(nextPath.current);
    };

    return confirmNavigation;
};

export default useNavigateConfirm;
