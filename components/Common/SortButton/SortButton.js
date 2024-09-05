import React from "react";

import IconArrow from "@/public/icons/arrow-down.svg";
import IconSort from "@/public/icons/sort.svg";

import styles from './SortButton.module.scss';
function SortButton({ onClick = () => {} }) {
    return <div onClick={onClick} className={styles.wrapper}>
        <IconSort/>
        <span>Sắp xếp</span>
        <IconArrow/>
    </div>;
}

export default SortButton;
