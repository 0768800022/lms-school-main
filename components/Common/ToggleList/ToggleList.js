import React from "react";
import classNames from "classnames";

import { toggleArrayValue } from "@/utils/common";

import styles from "./ToggleList.module.scss";

function ToggleList({
    options = [],
    active = [],
    onChange = (newValue) => {
        // console.log({ newValue });
    },
}) {
    return (
        <div className={styles.wrapper}>
            {options.map((option, index) => (
                <div
                    key={index}
                    onClick={() => {
                        onChange(toggleArrayValue(active, option?.value));
                    }}
                    className={classNames({
                        [styles.item]: true,
                        [styles.active]: active.includes(option?.value),
                    })}
                >
                    {option.label}
                </div>
            ))}
        </div>
    );
}

export default ToggleList;
