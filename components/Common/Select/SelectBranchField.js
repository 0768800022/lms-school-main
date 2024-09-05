import { useAppContext } from "@/contexts";

import { FormItem } from "../Form";
import Grid from "../Grid";

import Select from "./Select";

const Field = ({
    options,
    label,
    getPopupContainer,
    multiple,
    onChange,
    type,
    disabled,
    fieldProps,
    value,
    placeholder,
}) => {
    const { isSuperAdmin } = useAppContext();

    return isSuperAdmin ? (
        <Select
            label={label}
            placeholder={placeholder}
            value={value}
            getPopupContainer={getPopupContainer}
            multiple={multiple}
            onChange={onChange}
            options={options}
            type={type}
            disabled={disabled}
            allowClear={false}
            {...fieldProps}
        />
    ) : null;
};

function SelectBranchField({
    name = "",
    rules = [],
    label = "",
    required = false,
    requireMessage = "",
    placeholder = "",
    fieldProps,
    options,
    type = "",
    disabled = false,
    onChange,
    multiple = false,
    getPopupContainer = false,
    span,
    style = {},
    ...props
}) {
    const { isSuperAdmin } = useAppContext();
    const Wrapper = isSuperAdmin === false ? ({ children }) => children : Grid.Col;

    return (
        <Wrapper span={span}>
            <FormItem
                {...props}
                style={isSuperAdmin === false ? { display: "none" } : style}
                name={name}
                required={required}
                requireMessage={requireMessage}
                rules={rules}
                label={label}
                placeholder={placeholder}
            >
                <Field
                    name={name}
                    options={options}
                    onChange={onChange}
                    type={type}
                    disabled={disabled}
                    fieldProps={fieldProps}
                    multiple={multiple}
                    getPopupContainer={getPopupContainer}
                />
            </FormItem>
        </Wrapper>
    );
}

export { SelectBranchField };
