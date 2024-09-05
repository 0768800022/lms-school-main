import React from "react";

import { CategoryPage } from "@/components/Common/Pages";
import { useRoleValidator } from "@/components/Common/Permission";

import { manageList } from "./data";

import styles from "./ManageSystem.module.scss";


function ManageSystem() {
    const { validateRole } = useRoleValidator();

    return (
        <CategoryPage
            title="Danh sách cấu hình"
            classNames={{ cards: styles.cards }}
            items={manageList.filter((item) => validateRole(item.roles))}
        />
    );
}

export default ManageSystem;
