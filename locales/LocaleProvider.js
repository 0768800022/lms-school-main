import React from "react";
import { IntlProvider } from "react-intl";

import useLocale from "@/hooks/useLocale";

import enLocaleData from "./en.json";
import viLocaleData from "./vi.json";

const localeData = {
    en: enLocaleData,
    vi: viLocaleData,
};

function flattenMessages(nestedMessages, prefix = "") {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key];
        let prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (typeof value === "string") {
            messages[prefixedKey] = value;
        } else {
            Object.assign(messages, flattenMessages(value, prefixedKey));
        }

        return messages;
    }, {});
}

export default function LocaleProvider({ children }) {
    const { locale, defaultLocale } = useLocale();
    const messages = flattenMessages(localeData[locale] || localeData[defaultLocale]);

    return (
        <IntlProvider
            defaultLocale={defaultLocale}
            locale={locale}
            messages={messages}
            onError={(e) => {
                if (e?.code !== "MISSING_TRANSLATION") {
                    console.error(e);
                }
            }}
        >
            {children}
        </IntlProvider>
    );
}
