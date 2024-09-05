import { useState } from "react";

import createCtx from "@/utils/create-ctx";

export const [ AppLoadingProvider, useAppLoading ] = createCtx("AppLoading");

const LoadingOverlayProvider = ({ children }) => {
    const [ loading, setLoading ] = useState(false);

    const setAppLoading = (load) => {
        setLoading(load);
    };

    return (
        <AppLoadingProvider setAppLoading={setAppLoading} loading={loading}>
            {children}
        </AppLoadingProvider>
    );
};

export default LoadingOverlayProvider;
