import cls from "classnames";

import { FONT_FAMILY } from "@/fonts/config";
import useUncontrolled from "@/hooks/useUncontrolled";
import { extractStyleProps } from "@/utils/extract-style-props";

import Box from "../Box";
import styles from "./Textarea.module.scss";

function Textarea({
    disabled = false,
    error,
    id,
    leftSection,
    leftSectionWidth,
    leftSectionPointerEvents = "none",
    rightSection,
    rightSectionWidth,
    rightSectionPointerEvents = "none",
    placeholder = "",
    label = "",
    className,
    classNames = {},
    variant = "default",
    value,
    innerRef,
    onChange,
    type = "text",
    rows,
    ...props
}) {
    const { styleProps, rest } = extractStyleProps(props);
    const [ _value, _onChange ] = useUncontrolled({ value, onChange, defaultValue: "" });

    return (
        <Box
            {...styleProps}
            data-with-left-section={!!leftSection}
            data-with-right-section={!!rightSection}
            data-variant={variant}
            style={{
                height: "100%",
                "--input-left-section-width": leftSectionWidth,
                "--input-right-section-width": rightSectionWidth,
                "--input-left-section-pointer-events": leftSectionPointerEvents,
                "--input-right-section-pointer-events": rightSectionPointerEvents,
            }}
            className={cls(className, classNames?.wrapper, styles.wrapper)}
        >
            {leftSection && (
                <div data-position="left" className={cls(classNames?.section, styles.section)}>
                    {leftSection}
                </div>
            )}
            <textarea
                {...rest}
                tabIndex={0}
                ref={innerRef}
                data-error={!!error}
                data-label={!!label}
                data-has-value={!!_value}
                className={cls(classNames?.input, styles.input, FONT_FAMILY.className)}
                placeholder={label ? "" : placeholder}
                id={id}
                disabled={disabled}
                type={type}
                value={_value}
                onChange={_onChange}
                rows={rows}
            />
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}
            {rightSection && (
                <div data-position="right" className={cls(classNames?.section, styles.section)}>
                    {rightSection}
                </div>
            )}
        </Box>
    );
}

export default Textarea;
