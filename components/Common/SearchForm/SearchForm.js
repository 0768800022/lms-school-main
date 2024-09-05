import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import React, { Fragment, useCallback, useEffect } from "react";

import { Form, useForm } from "@/components/Common/Form";
import { FieldTypes, YEAR_DATE_FORMAT } from "@/constants/constant";
import { cleanObject } from "@/utils";

import { InputField } from "../Input";
import ResetButton from "../ResetButton";
import { SelectField } from "../Select";
import styles from "./SearchForm.module.scss";

const searchFields = {
    [FieldTypes.SELECT]: SelectField,
    // [FieldTypes.DATE]: DatePickerField,
    // [FieldTypes.DATE_RANGE]: (props) => (
    //     <DateRangePickerField disabledDate={disabledDate} {...props} />
    // ),
    // [FieldTypes.SELECT]: AutoCompleteField,
    default: InputField,
};

const SearchForm = ({
    form: formProp,
    fields = [],
    hiddenAction,
    onSearch,
    className,
    onReset,
    initialValues,
    width = 1700,
    alignSearchField,
    path,
}) => {
    const [ form ] = useForm();
    const { query, push, pathname } = useRouter();

    const pushQuery = (newQuery) => {
        push(
            {
                pathname,
                query: cleanObject(
                    {
                        ...query,
                        ...newQuery,
                    },
                    { clear: [ undefined, "", null, 0 ] },
                ),
            },
            null,
            { shallow: true },
        );
    };

    const handleSubmit = (values) => {
        const newValues = { ...values };

        Object.keys(newValues).forEach((key) => {
            if (dayjs.isDayjs(newValues[key])) {
                newValues[key] = dayjs(newValues[key]).format(YEAR_DATE_FORMAT);
            } else {
                newValues[key] = newValues[key]?.toString()?.trim();
            }
        });

        onSearch?.(cleanObject(newValues));
    };

    const handleReset = () => {
        form.resetFields();
        onReset?.();
    };

    const renderField = useCallback(
        ({ type, submitOnChanged, onChange, key, renderItem, style, component, ...props }) => {
            if (renderItem) {
                return (
                    <Form.Item {...props} name={key} style={{ marginBottom: "0px" }}>
                        {renderItem()}
                    </Form.Item>
                );
            }

            const Field = component || searchFields[type] || searchFields.default;
            return (
                <Field
                    {...props}
                    name={key}
                    fieldProps={{
                        style: { ...style, width: "100%", height: 32 },
                    }}
                    style={{ ...style, width: "100%", height: 32 }}
                    onChange={(e) => {
                        if (submitOnChanged) {
                            form.submit();
                        } else {
                            onChange?.(e);
                        }
                    }}
                />
            );
        },
        [],
    );

    useEffect(() => {
        const normalizeValues = { ...initialValues };
        Object.keys(normalizeValues).forEach((key) => {
            if (!isNaN(normalizeValues[key])) {
                normalizeValues[key] = Number(normalizeValues[key]);
            }
        });
        form.setFieldsValue(normalizeValues);
    }, [ initialValues ]);

    return (
        <Form
            className={styles.filter}
            form={form}
            // initialValues={{
            //     search: query?.search || "",
            //     status: query?.status || "",
            //     branch: query?.branch || "",
            // }}
            onSubmit={(values) => pushQuery(values)}
        >
            {/* <InputField
                className={styles.filterSearch}
                name="search"
                placeholder="Tìm chi nhánh/ số điện thoại"
                // onChange={(e) => setSearch(e?.target?.value)}
                fieldProps={{
                    leftSection: <SearchIcon width={24} height={24} />,
                    leftSectionWidth: "30px",
                }}
            /> */}

            {fields.map((field) => {
                const { key, colSpan, className, ...props } = field;
                return (
                    <Fragment key={key} className={className}>
                        {renderField({ ...props, key })}
                    </Fragment>
                );
            })}
            <div className={styles.reset}>
                <ResetButton
                    onClick={() => {
                        form.reset();
                        push(path, null, { shallow: true });
                    }}
                />
            </div>
        </Form>
    );
};

export default SearchForm;
