import React, { Children, useId } from "react";

import styles from "./Radio.module.scss";

function Radio({ checked, onChange, value, name, id, label, disabled, readOnly, ...props }) {
    const _id = useId();

    const radioId = `radio${_id}` || id;

    return (
        <div className={styles.wrapper}>
            <input
                {...props}
                id={radioId}
                readOnly={readOnly}
                checked={checked}
                onChange={onChange}
                value={value}
                name={name}
                disabled={disabled}
                className={styles.checkbox}
                type="radio"
            />
            <label htmlFor={radioId}>{label}</label>
        </div>
    );
}

function Group({ children, value, name, onChange, className, error, ...props }) {
    return (
        <div className={className} {...props}>
            {Children.map(children, (child) =>
                React.cloneElement(child, {
                    onChange: (e) => {
                        child.props.onChange?.(e);
                        onChange(e);
                    },
                    checked: child.props.value === value,
                    name: name,
                }),
            )}
        </div>
    );
}

Radio.Group = Group;

export default Radio;
