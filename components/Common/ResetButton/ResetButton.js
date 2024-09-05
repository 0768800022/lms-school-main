import React from "react";

import RefreshIcon from "@/public/icons/refresh.svg";

import styles from './ResetButton.module.scss';

function ResetButton({ onClick = () => {} }) {
    return <div onClick={onClick} className={styles.wrapper}>
        <RefreshIcon />
        <span>Đặt lại</span>
    </div>;
}

export default ResetButton;
