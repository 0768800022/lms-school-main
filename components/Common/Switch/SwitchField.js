import { FormItem } from "../Form";

import Switch from ".";

function SwitchField({
    name = "",
    rules = [],
    label = "",
    required = false,
    requireMessage = "",
    placeholder = "",
    fieldProps,
    disabled = false,
    onChange,
    ...props
}) {
    return (
        <FormItem
            {...props}
            name={name}
            placeholder={placeholder}
            label={label}
            required={required}
            requireMessage={requireMessage}
            rules={rules}
        >
            <Switch onChange={onChange} disabled={disabled} {...fieldProps} />
        </FormItem>
    );
}

export default SwitchField;
