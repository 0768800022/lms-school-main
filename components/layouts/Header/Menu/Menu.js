import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";

import NextLink from "@/components/Common/NextLink";
import { ROLES_CODE } from "@/constants/constant";
import { useAppContext } from "@/contexts";
import { matchPath } from "@/utils/path";

import { menuConfig, teacherMenuConfig } from "./data";

import styles from "./Menu.module.scss";

function getNavMenuItems({ userRole, defaultClassId }) {
    if (userRole !== ROLES_CODE.TEACHER) {
        return menuConfig;
    }

    if (defaultClassId) {
        return teacherMenuConfig;
    }

    return [];
}

function Menu() {
    const router = useRouter();
    const isNavigating = useRef(false);
    const queryClient = useQueryClient();
    const { activeRole, defaultClassId } = useAppContext();
    const navMenuItems = getNavMenuItems({ userRole: activeRole, defaultClassId });

    // Invalidate queries when click on menu item
    useEffect(() => {
        const handleRouteChangeComplete = () => {
            if (isNavigating.current) {
                queryClient.invalidateQueries();
                isNavigating.current = false;
            }
        };

        const handleRouteChangeError = () => {
            isNavigating.current = false;
        };

        router.events.on("routeChangeComplete", handleRouteChangeComplete);
        router.events.on("routeChangeError", handleRouteChangeError);

        return () => {
            router.events.off("routeChangeComplete", handleRouteChangeComplete);
            router.events.off("routeChangeError", handleRouteChangeError);
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            {navMenuItems.map((item, index) => (
                <MenuItem key={index} {...item} onClick={() => (isNavigating.current = true)} />
            ))}
        </div>
    );
}

export default Menu;

const MenuItem = ({ label, icon, link, exact, onClick }) => {
    const { asPath } = useRouter();

    return (
        <NextLink
            onClick={onClick}
            className={classNames({
                [styles.menuItem]: true,
                [styles.active]:
                    !!link && (exact ? asPath === link : matchPath(link + "/[[...slug]]", asPath)),
            })}
            href={link}
        >
            <div>{icon}</div>
            <div className={styles.label}>{label}</div>
        </NextLink>
    );
};
