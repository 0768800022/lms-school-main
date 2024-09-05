import { default as RcSelect } from "rc-select";

import useUncontrolled from "@/hooks/useUncontrolled";
import IconArrowDown from "@/public/icons/arrow-down.svg";
import IconClear from "@/public/icons/clear-icon.svg";
import { removeAccents } from "@/utils/common";

function Select({
    options = [],
    allowClear = true,
    showSearch = true,
    value,
    onChange,
    label,
    type,
    placeholder,
    error,
    defaultValue,
    multiple = false,
    mode,
    getPopupContainer,
    suffixIcon,
    ...props
}) {
    const _placeholder = label || placeholder;

    const [ _value, _onChange ] = useUncontrolled({ value, onChange });

    const hasValue = {
        "data-value": _value != undefined && _value?.length != 0,
    };
    const hasLabel = label && { "data-label": true };
    const hasError = error && { "data-error": true };
    const dataType = type && { "data-type": type };
    const dataAllowClear = allowClear && { "data-allow-clear": true };

    return (
        <RcSelect
            {...dataType}
            {...hasValue}
            {...hasError}
            {...hasLabel}
            {...dataAllowClear}
            mode={multiple ? "multiple" : mode}
            defaultValue={defaultValue}
            prefixCls="__select"
            value={_value}
            onChange={(value) => (value === undefined ? _onChange(null) : _onChange(value))}
            optionFilterProp="label"
            filterOption={(input, option) =>
                typeof option.label === "string"
                    ? removeAccents(option.label)?.toLowerCase().indexOf(removeAccents(input)?.toLowerCase()) >= 0
                    : true
            }
            getPopupContainer={(trigger) =>
                getPopupContainer ? getPopupContainer() : trigger.parentElement
            }
            placeholder={_placeholder}

            suffixIcon={suffixIcon ? suffixIcon : <IconArrowDown style={{ color: "#A7A7A7" }} />}
            showSearch={showSearch}
            allowClear={allowClear}
            clearIcon={<IconClear />}
            notFoundContent="Không tìm thấy dữ liệu"
            labelRender={(label) =>
                multiple ? (
                    label.label
                ) : (
                    <>
                        {hasLabel && (
                            <span className="__select-selection-item-label">{_placeholder}</span>
                        )}
                        <span className="__select-selection-item-content">{label.label}</span>
                    </>
                )
            }
            options={options}
            {...props}
        ></RcSelect>
    );
}

export default Select;
