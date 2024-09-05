import React from "react";
import classNames from "classnames";

import ErrorIcon from "@/public/icons/error-circle.svg";

import styles from "./Alert.module.scss";

function Alert({ type, variant, children, className }) {
    const renderIcon = () => (
        <div
            className={classNames({
                [styles.icon]: true,
                [styles.error]: type === "error",
            })}
        >
            <ErrorIcon />
        </div>
    );
    return (
        <div className={classNames({
            [styles.wrapper]: true,
            [styles.error]: type === "error",
            [className]: true,
        })}>
            {renderIcon()}
            {children}
        </div>
    );
}

export default Alert;
