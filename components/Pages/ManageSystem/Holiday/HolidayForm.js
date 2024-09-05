import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Flex from "@/components/Common/Flex";
import { Form } from "@/components/Common/Form";
import { InputField } from "@/components/Common/Input";
import { TextareaField } from "@/components/Common/Textarea";
import { commonStatus } from "@/constants/constant";
import { errorCodes } from "@/constants/errorCode";
import useBasicForm from "@/hooks/useBasicForm";
import styles from "./HolidayForm.module.scss";
import DatePickerField from "@/components/Common/DatePicker/DatePickerField";
import { SelectField } from "@/components/Common/Select";
import dayjs from "dayjs";
import useBranch from "@/hooks/useBranch";

const HolidayForm = ({ className, formId, onSubmit, dataDetail, handleChangeValue, branches, setFilter }) => {
    const formRef = useRef();

    const validateFields = [
        {
            name: "code",
            message: errorCodes.HOLIDAY_OVERLAP,
        },
    ];

    const { form, mixinFuncs } = useBasicForm({
        onSubmit,
        validateFields,
    });
    const [checked, setChecked] = useState(true);

    // useEffect(() => {
    //     if (dataDetail) {
    //         form.setFieldsValue({
    //             ...dataDetail,
    //             startDate: dataDetail.startDate ? dayjs(dataDetail.startDate) : null,
    //             endDate: dataDetail.endDate ? dayjs(dataDetail.endDate) : null,
    //         });
    //         setChecked(dataDetail.status === commonStatus.ACTIVE ? true : false);
    //     }
    // }, [dataDetail]);

    useEffect(() => {
        if (dataDetail) {
            form.setFieldsValue({
                ...dataDetail,
                startDate: dataDetail.startDate ? dayjs(dataDetail.startDate, 'YYYY-MM-DD') : null,
                endDate: dataDetail.endDate ? dayjs(dataDetail.endDate, 'YYYY-MM-DD') : null,
            });
            setChecked(dataDetail.status === commonStatus.ACTIVE ? true : false);
        }
    }, [dataDetail]);


    // const handleSubmit = (values) => {
    //     mixinFuncs.handleSubmit({
    //         ...values,
    //         status: checked ? commonStatus.ACTIVE : commonStatus.LOCK,
    //     });
    // };

    const handleSubmit = (values) => {
        mixinFuncs.handleSubmit({
            ...values,
            startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : null,
            endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : null,
            status: checked ? commonStatus.ACTIVE : commonStatus.LOCK,
        });
    };

    return (
        <Form
            className={classNames(className, styles.form)}
            id={formId}
            form={form}
            onValuesChange={handleChangeValue}
            onFinish={handleSubmit}
            initialValues={{
                note: "",
            }}
        >
            <Flex direction="column" rowGap="24px">
                <SelectField
                    name="branchId"
                    onChange={(value) => setFilter({ branchId: value, page: 1 })}
                    placeholder="Chi nhánh"
                    options={branches}
                    fieldProps={{
                        style: {
                            width: 230,
                        },
                    }}
                />
                <InputField
                    required
                    rules={[
                        {
                            whitespace: true,
                            message: "Tên ngày nghỉ lễ không được chỉ chứa khoảng trắng.",
                        },
                    ]}
                    name="name"
                    label="Tên ngày nghỉ lễ"
                />

                <InputField
                    required
                    name="priority"
                    label="Vị trí"
                />

                <Flex direction="row" columnGap="24px">
                    <DatePickerField
                        required
                        name="startDate"
                        label="Ngày bắt đầu"
                        format="DD/MM/YYYY"
                        placeholder="Ngày bắt đầu"
                    />

                    <DatePickerField
                        required
                        name="endDate"
                        label="Ngày kết thúc"
                        format="DD/MM/YYYY"
                        placeholder="Ngày kết thúc"
                    />
                </Flex>


                <TextareaField
                    name="note"
                    label="Ghi chú (Tối đa 255 kí tự)"
                    fieldProps={{ rows: 10, maxLength: 255 }}
                />
            </Flex>
        </Form>
    );
};

export default HolidayForm;

