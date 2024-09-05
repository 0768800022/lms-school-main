import { FormItem } from "../Form";

import Checkbox from ".";

function CheckboxField({
    name = "",
    rules = [],
    label = "",
    required = false,
    requireMessage = "",
    placeholder = "",
    fieldProps,
    disabled = false,
    onChange,
    children,
    ...props
}) {
    return (
        <FormItem
            {...props}
            valuePropName="checked"
            name={name}
            label={label}
            rules={rules}
            requireMessage={requireMessage}
            required={required}
            placeholder={placeholder}
        >
            <Checkbox onChange={onChange} disabled={disabled} {...fieldProps}>
                {children}
            </Checkbox>
        </FormItem>
    );
}

export default CheckboxField;
