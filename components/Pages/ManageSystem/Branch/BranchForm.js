import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import Flex from "@/components/Common/Flex";
import { Form } from "@/components/Common/Form";
import { InputField } from "@/components/Common/Input";
import { SelectField } from "@/components/Common/Select";
import Switch from "@/components/Common/Switch";
import { TextareaField } from "@/components/Common/Textarea";
import { commonStatus } from "@/constants/constant";
import { errorCodes } from "@/constants/errorCode";
import {
    formatRegExp,
} from "@/constants/validator";
import useArea from "@/hooks/useArea";
import useBasicForm from "@/hooks/useBasicForm";

import styles from "./BranchForm.module.scss";

const BranchForm = ({ className, formId, onSubmit, dataDetail, handleChangeValue }) => {
    const formRef = useRef();

    const validateFields = [
        {
            name: "code",
            message: errorCodes.BRANCH_IS_EXISTED,
        },
    ];

    const { form, mixinFuncs, onValuesChange } = useBasicForm({
        onSubmit,
        validateFields,
    });
    const { provinces, districts, wards, changeProvince, changeDistrict } = useArea();
    const [ checked, setChecked ] = useState(true);
    useEffect(() => {
        if (dataDetail) {
            form.setFieldsValue({ ...dataDetail });
            changeProvince(dataDetail.provinceId);
            changeDistrict(dataDetail.districtId);

            setChecked(dataDetail.status === commonStatus.ACTIVE ? true : false);
        }
    }, [ dataDetail ]);
    const handleSubmit = (values) => {
        mixinFuncs.handleSubmit({
            ...values,
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
                <InputField
                    required
                    name="code"
                    label="Mã chi nhánh"
                    rules={[
                        {
                            pattern: formatRegExp,
                            message:
                                "Mã chi nhánh chỉ chứa chữ cái, không khoảng trắng, số và ký tự đặc biệt thường gặp (.,- , _)",
                        },
                        {
                            pattern: /^.{3,20}$/,
                            message: "Mã chi nhánh phải có độ dài từ 3 đến 20 ký tự.",
                        },
                    ]}
                />
                <InputField
                    required
                    rules={[
                        {
                            whitespace: true,
                            message: "Tên chi nhánh không được chỉ chứa khoảng trắng.",
                        },
                    ]}
                    name="name"
                    label="Tên chi nhánh"
                />
                <InputField
                    name="phone"
                    label="Số điện thoại"
                    rules={[
                        {
                            required: true,
                            message: "Số điện thoại không được bỏ trống.",
                        },
                        {
                            pattern: /^.{8,11}$/,
                            message: "Số điện thoại phải có độ dài từ 8 đến 11 ký tự.",
                        },
                    ]}
                    type="number"
                    fieldProps={{
                        onlyDigit: true,
                    }}
                />
                <SelectField
                    required
                    name="provinceId"
                    label="Tỉnh/ thành phố"
                    options={provinces}
                    onChange={(value) => {
                        changeProvince(value);
                        form.setFieldsValue({
                            districtId: null,
                            wardId: null,
                        });
                    }}
                />
                <div className={styles.area} ref={formRef}>
                    <SelectField
                        required
                        name="districtId"
                        label="Quận/ huyện"
                        options={districts}
                        onChange={(districtId) => {
                            changeDistrict(districtId);
                            form.setFieldsValue({
                                wardId: null,
                            });
                        }}
                    />
                    <SelectField required name="wardId" label="Phường/ xã" options={wards} />
                </div>
                <InputField
                    required
                    rules={[
                        {
                            whitespace: true,
                            message: "Số nhà, tên đường không được chỉ chứa khoảng trắng.",
                        },
                        {
                            max: 255,
                            message: "Số nhà, tên đường chỉ chứa tối đa 255 ký tự.",
                        },
                    ]}
                    name="address"
                    label="Số nhà, tên đường"
                />
                <TextareaField
                    name="note"
                    label="Ghi chú (Tối đa 255 kí tự)"
                    fieldProps={{ rows: 10, maxLength: 255 }}
                />

                <div>
                    <h4 className={styles.swichlabel}>Trạng thái</h4>
                    <div className={styles.statusSwitch}>
                        <div className={styles.switchTitle}>Đang hoạt động</div>
                        <Form.Item name="status">
                            <Switch
                                checked={checked}
                                onCheckedChange={() => setChecked(!checked)}
                            />
                        </Form.Item>
                    </div>
                </div>
            </Flex>
        </Form>
    );
};

export default BranchForm;
