import { FormItem } from "../Form";
import PasswordInput from ".";

function PasswordField({
    name = "",
    rules = [],
    label = "",
    required = false,
    placeholder = "",
    requireMessage = "",
    fieldProps,
    disabled = false,
    onChange,
    ...props
}) {
    return (
        <FormItem
            {...props}
            name={name}
            label={label}
            placeholder={placeholder}
            requireMessage={requireMessage}
            required={required}
            rules={rules}
        >
            <PasswordInput disabled={disabled} onChange={onChange} {...fieldProps} />
        </FormItem>
    );
}

export default PasswordField;
