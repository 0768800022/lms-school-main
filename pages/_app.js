import Head from "next/head";
import { Toaster } from "sonner";

import NavigateProgress from "@/components/Common/NavigateProgress";
import AppWrapper from "@/components/layouts/AppWrapper";
import { QueryProvider } from "@/contexts";
import { FONT_FAMILY } from "@/fonts/config";

import "@/styles/globals.scss";
import "@/styles/select.scss";

export default function App({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                />
                <title>LMS</title>
            </Head>
            <QueryProvider {...pageProps}>
                <AppWrapper {...pageProps}>
                    <div className={FONT_FAMILY.className}>
                        {getLayout(<Component {...pageProps} />, pageProps)}
                    </div>
                </AppWrapper>
            </QueryProvider>

            <Toaster richColors closeButton position="top-center" />
            <NavigateProgress options={{ showSpinner: false }} />
        </>
    );
}
