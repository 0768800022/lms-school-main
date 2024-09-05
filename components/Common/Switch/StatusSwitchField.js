import { Form, useForm } from "@/components/Common/Form";

import Switch from ".";

import styles from "./StatusSwitchField.module.scss";
function StatusSwitchField({
    name = "",
    rules = [],
    label = "",
    required = false,
    requireMessage = "",
    placeholder = "",
    fieldProps,
    disabled = false,
    onChange,
    checked,
    ...props
}) {
    return (
        <div>
            <span className={styles.description}>Trạng thái</span>
            <div className={styles.status}>
                <label>{label ? label : "Đang hoạt động"}</label>
                <Form.Item
                    {...props}
                    name={name}
                    placeholder={placeholder}
                    label={label}
                    required={required}
                    requireMessage={requireMessage}
                    rules={rules}
                >
                    <Switch
                        onCheckedChange={onChange}
                        disabled={disabled}
                        {...fieldProps}
                        checked={checked}
                    />
                </Form.Item>
            </div>
        </div>
    );
}

export default StatusSwitchField;
