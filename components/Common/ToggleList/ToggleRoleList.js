import React from "react";
import classNames from "classnames";

import { toggleArrayValue } from "@/utils/common";

import styles from "./ToggleList.module.scss";

function ToggleRoleList({
    options = [],
    active = [],
    onChange = (newValue) => {
        // console.log({ newValue });
    },
    setActive,
}) {
    const optionArray = options?.map((item) => {
        return item.value;
    });
    const checkAll = optionArray.every((i) => active.includes(i));
    return (
        <div className={styles.wrapper}>
            {options?.length > 0 && (
                <div
                    // key={index}
                    onClick={() => {
                        if (checkAll) {
                            setActive([]);
                        } else {
                            setActive(optionArray);
                        }
                    }}
                    className={classNames({
                        [styles.item]: true,
                        [styles.active]: checkAll,
                    })}
                >
                    Tất cả
                </div>
            )}
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

export default ToggleRoleList;
