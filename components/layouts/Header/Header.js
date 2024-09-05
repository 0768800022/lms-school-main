import Image from "next/image";

import Container from "@/components/Common/Container";
import NextLink from "@/components/Common/NextLink";
import { RoleBasedRenderer } from "@/components/Common/Permission";
import { ROLES_CODE } from "@/constants/constant";
import paths from "@/constants/paths";
import useSchoolInfo from "@/hooks/useSchoolInfo";
import NotificationIcon from "@/public/icons/notification.svg";

import SelectClass from "./Menu/SelectClass";
import UserInfo from "./Menu/UserInfo";
import Menu from "./Menu";

import styles from "./Header.module.scss";

function Header() {
    const { logo } = useSchoolInfo();
    return (
        <div className={styles.wrapper}>
            <Container className={styles.container}>
                <NextLink href={paths.home}>
                    <img
                        alt="logo"
                        src={logo ? logo : "/images/layout/logo.png"}
                        width={82}
                        height={46}
                        className={styles.logo}
                    />
                </NextLink>
                <Menu />
                <div className={styles.headerUser}>
                    <RoleBasedRenderer
                        components={[ { roles: [ ROLES_CODE.TEACHER ], component: <SelectClass /> } ]}
                    />
                    <NotificationIcon />
                    <UserInfo />
                </div>
            </Container>
        </div>
    );
}

export default Header;
