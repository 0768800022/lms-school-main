import { setCookie } from "cookies-next";
import dayjs from "dayjs";

import { DEFAULT_LOCALE, storageKeys } from "@/constants/constant";
import { useAppContext } from "@/contexts";

function useLocale() {
    const { locale, setLocale } = useAppContext();

    const changeLocale = (newLocale) => {
        setCookie(storageKeys.appLocale, newLocale, {
            expires: dayjs().add(1, "year").toDate(),
        });
        setLocale(newLocale);
    };

    return { defaultLocale: DEFAULT_LOCALE, locale, changeLocale };
}

export default useLocale;
