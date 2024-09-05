import React, { useState } from "react";
import classNames from "classnames";

import DropdownMenu from "@/components/Common/DropdownMenu";
import ModalChangeRole from "@/components/Common/Modal/ModalChangeRole";
import NextLink from "@/components/Common/NextLink";
import Popover from "@/components/Common/Popover";
import TextClamp from "@/components/Common/TextClamp";
import paths from "@/constants/paths";
import { useAppContext } from "@/contexts";
import useAuth from "@/hooks/useAuth";
import ArrowDownIcon from "@/public/icons/arrow-down.svg";

import styles from "../Header.module.scss";

function UserInfo() {
    const [ openChangeRoleModal, setOpenChangeRoleModal ] = useState();
    const [ open, setOpen ] = useState(false);
    const { user, logout, activeRole } = useAuth();
    const { isSuperAdmin } = useAppContext();

    return (
        <>
            <DropdownMenu
                align="end"
                side="bottom"
                className={styles.popoverContent}
                open={open}
                onOpenChange={setOpen}
                trigger={
                    <div className={styles.userInfo}>
                        <div className={styles.avatar}>
                            {user?.avatar ? (
                                <img alt="avatar" src={user?.avatar} />
                            ) : (
                                <img
                                    alt="avatar"
                                    src="/images/layout/logo.png"
                                    style={{ objectFit: "contain" }}
                                />
                            )}
                        </div>
                        <div className={styles.info}>
                            <div className={styles.roleName}>{activeRole?.name}</div>
                            {user?.firstName && (
                                <TextClamp
                                    lineClamp={1}
                                    title={user?.firstName}
                                    className={styles.fullname}
                                >
                                    {user?.firstName}
                                </TextClamp>
                            )}
                        </div>
                        <ArrowDownIcon />
                    </div>
                }
            >
                <div className={styles.content}>
                    <DropdownMenu.Item onClick={() => setOpen(false)}>
                        <NextLink href={paths.profile}>
                            <div className={styles.item}>Thông tin tài khoản</div>
                        </NextLink>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        onClick={() => {
                            setOpenChangeRoleModal(true);
                            setOpen(false);
                        }}
                        className={classNames(styles.item, { [styles.disabled]: isSuperAdmin })}
                    >
                        Chuyển màn hình vai trò
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                        onClick={logout}
                        className={styles.item}
                        style={{ color: "#E85848" }}
                    >
                        Đăng xuất
                    </DropdownMenu.Item>
                </div>
            </DropdownMenu>
            <ModalChangeRole open={openChangeRoleModal} onOpenChange={setOpenChangeRoleModal} />
        </>
    );
}

export default UserInfo;
