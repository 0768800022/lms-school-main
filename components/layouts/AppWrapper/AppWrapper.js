import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import LoadingOverlay from "@/components/Common/LoadingOverlay/LoadingOverLay";
import LoadingOverlayProvider from "@/components/Common/LoadingOverlay/LoadingOverlayProvider";
import Tooltip from "@/components/Common/Tooltip";
import { DEFAULT_LOCALE, ROLES_CODE, storageKeys } from "@/constants/constant";
import { AppProvider } from "@/contexts";
import useQueryParams from "@/hooks/useQueryParams";
import LocaleProvider from "@/locales/LocaleProvider";
import { setAuthCookie } from "@/utils/auth";

import ConfirmModalWrapper from "./ConfirmModalWrapper";

function AppWrapper({ children, locale, role, branchId, classId }) {
    const queryClient = useQueryClient();
    const [ queryParams, setQueryParams ] = useQueryParams();
    const [ _locale, setLocale ] = useState(locale || DEFAULT_LOCALE);
    const [ activeRole, setActiveRole ] = useState(role);
    const [ defaultBranch, setDefaultBranch ] = useState(branchId);
    const [ defaultClass, setDefaultClass ] = useState(classId);

    const isSuperAdmin = activeRole === ROLES_CODE.SUPER_ADMIN;

    const changeActiveRole = (role, branchId) => {
        setAuthCookie(storageKeys.role, role);
        setAuthCookie(storageKeys.branchId, branchId);
        // setActiveRole(role);
        // setDefaultBranch(branchId);
        // queryClient.invalidateQueries();
    };

    const changeTeacherClass = (classId) => {
        setAuthCookie(storageKeys.teacherDefaultClass, classId);
        location.reload();
        // setDefaultClass(classId);
        // queryClient.invalidateQueries();
    };

    // remove meta from query params
    useEffect(() => {
        const { meta, ...rest } = queryParams;
        if (meta) {
            setQueryParams(rest, { mergePreviousParams: false });
        }
    }, []);

    return (
        <AppProvider
            locale={_locale}
            setLocale={setLocale}
            isSuperAdmin={isSuperAdmin}
            activeRole={activeRole}
            defaultBranch={defaultBranch}
            changeActiveRole={changeActiveRole}
            defaultClassId={defaultClass}
            changeTeacherClass={changeTeacherClass}
        >
            <LocaleProvider>
                <LoadingOverlayProvider>
                    <LoadingOverlay />
                    <Tooltip.Provider>
                        <ConfirmModalWrapper>{children} </ConfirmModalWrapper>
                    </Tooltip.Provider>
                </LoadingOverlayProvider>
            </LocaleProvider>
        </AppProvider>
    );
}

export default AppWrapper;
