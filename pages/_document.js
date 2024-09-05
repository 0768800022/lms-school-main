import Document, { Head, Html, Main, NextScript } from "next/document";

import { DEFAULT_LOCALE } from "@/constants/constant";
import { FONT_FAMILY } from "@/fonts/config";

class MyDocument extends Document {
    render() {
        return (
            <Html lang={this.props.__NEXT_DATA__.props.pageProps.locale || DEFAULT_LOCALE}>
                <Head />
                <body className={FONT_FAMILY.className}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
