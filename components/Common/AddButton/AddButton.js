import React from "react";
import classNames from "classnames";

import styles from "./AddButton.module.scss";

function AddButton({ label, children, onClick, className }) {
    return (
        <div className={classNames(styles.wrapper, className)} onClick={onClick}>
            <div className={styles.icon}>+</div>
            <div className={styles.label}>{label || children}</div>
        </div>
    );
}

export default AddButton;
