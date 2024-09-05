import { useState } from "react";

import { UnstyledButton } from "../Button";
import Input from "../Input";
import styles from "./PasswordInput.module.scss";
import { PasswordToggleIcon } from "./PasswordToggleIcon";

function PasswordInput({
    error,
    placeholder,
    disabled,
    id,
    value,
    onChange,
    autoComplete = "off",
    label,
    ...props
}) {
    const [ visible, setVisible ] = useState(false);

    const toggleVisibility = () => setVisible((prev) => !prev);

    const visibilityToggleButton = (
        <UnstyledButton
            className={styles.toggleButton}
            tabIndex={-1}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleVisibility();
            }}
            onKeyDown={(event) => {
                if (event.key === " ") {
                    event.preventDefault();
                    toggleVisibility();
                }
            }}
        >
            <PasswordToggleIcon reveal={visible} />
        </UnstyledButton>
    );

    return (
        <Input
            {...props}
            label={label}
            error={error}
            disabled={disabled}
            placeholder={placeholder}
            id={id}
            value={value}
            onChange={onChange}
            type={visible ? "text" : "password"}
            rightSection={visibilityToggleButton}
            rightSectionPointerEvents="all"
            autoComplete={autoComplete}
        />
    );
}

export default PasswordInput;
