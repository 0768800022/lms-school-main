import React from "react";

import { FormItem } from "../Form";

import DatePicker from "./DatePicker";

const DatePickerField = ({
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
    picker,
    date,
    allowClear,
    dropdownClassName,
    className,
    suffixIcon,
    disabledDate,
    ...props
}) => {
    return (
        <FormItem
            {...props}
            name={name}
            required={required}
            requireMessage={requireMessage}
            rules={rules}
            label={label}
            placeholder={placeholder}
        >
            <DatePicker
                disabledDate={disabledDate}
                suffixIcon={suffixIcon}
                picker={picker}
                onChange={onChange}
                options={options}
                type={type}
                allowClear={allowClear}
                dropdownClassName={dropdownClassName}
                date={date}
                disabled={disabled}
                className={className}
                {...fieldProps}
            />
        </FormItem>
    );
};

export default DatePickerField;
