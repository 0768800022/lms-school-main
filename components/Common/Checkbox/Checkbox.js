import { forwardRef, useId } from "react";
import cls from "classnames";

import { extractStyleProps } from "@/utils/extract-style-props";

import Box from "../Box";

import styles from "./Checkbox.module.scss";

const Checkbox = forwardRef(
    (
        {
            checked,
            disabled = false,
            defaultChecked,
            onChange,
            className,
            classNames = {},
            children,
            error,
            color = "#4CAF50",
            iconColor = "#FFF",
            style,
            id,
            value,
            isRoot,
            isSomeSelected,
            ...props
        },
        ref,
    ) => {
        const _id = useId();
        const { styleProps, rest } = extractStyleProps(props);
        const checkboxId = id || `checkbox${_id}`;
        return (
            <Box
                {...styleProps}
                style={{ "--checkbox-color": color, "--checkbox-icon-color": iconColor, ...style }}
                className={cls(className, classNames?.root, styles.root)}
            >
                <div className={cls(classNames?.inner, styles.inner)}>
                    <input
                        {...rest}
                        defaultChecked={defaultChecked}
                        disabled={disabled}
                        data-error={!!error}
                        className={cls(classNames?.input, styles.input)}
                        onChange={onChange}
                        value={value}
                        checked={checked}
                        type="checkbox"
                        id={checkboxId}
                        ref={ref}
                    />
                    {isRoot && isSomeSelected ? (
                        <svg
                            className={cls(classNames?.icon, styles.icon)}
                            width="11"
                            height="8"
                            viewBox="0 0 11 4"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9 0.5C9.82843 0.5 10.5 1.17157 10.5 2C10.5 2.82843 9.82843 3.5 9 3.5L2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5L9 0.5Z"
                                fill="white"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            aria-hidden="true"
                            className={cls(classNames?.icon, styles.icon)}
                            viewBox="0 0 10 7"
                        >
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                d="M4 4.586L1.707 2.293A1 1 0 10.293 3.707l3 3a.997.997 0 001.414 0l5-5A1 1 0 108.293.293L4 4.586z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    )}
                </div>
                {children && (
                    <label
                        htmlFor={checkboxId}
                        data-disabled={disabled}
                        className={cls(classNames?.label, styles.label)}
                    >
                        {children}
                    </label>
                )}
            </Box>
        );
    },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
