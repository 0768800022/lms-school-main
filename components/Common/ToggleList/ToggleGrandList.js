import React from "react";
import classNames from "classnames";

import { toggleArrayValue } from "@/utils/common";

import styles from "./ToggleList.module.scss";

function ToggleGrandList({
    options = [],
    active = [],
    onChange = (newValue) => {
        // console.log({ newValue });
    },
    setActive,
    disabled,
}) {
    const optionArray = options?.map((item) => {
        return item.id;
    });
    const checkAll = optionArray.every((i) => active.includes(i));
    return (
        <div className={styles.wrapper}>
            {options?.length > 0 && (
                !disabled && <div
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
                    {"Toàn trường"}
                </div>
            )}
            {options.map((option, index) => (
                <div
                    key={index}
                    onClick={() => {
                        if (disabled) {
                            !option?.system &&
                                onChange(toggleArrayValue(active, option?.value));
                        } else {
                            onChange(toggleArrayValue(active, option?.value));
                        }
                    }}
                    className={classNames({
                        [styles.item]: true,
                        [styles.active]: active.includes(option?.value),
                        [styles.disabled] : option?.system && disabled,
                    })}
                >
                    {option.label}

                </div>
            ))}
        </div>
    );
}

export default ToggleGrandList;
