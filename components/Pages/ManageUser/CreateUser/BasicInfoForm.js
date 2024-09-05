import React, { useEffect } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { toast } from "sonner";

import Button from "@/components/Common/Button";
import DatePicker from "@/components/Common/DatePicker";
import { Form, useForm } from "@/components/Common/Form";
import { InputField } from "@/components/Common/Input";
import { PasswordField } from "@/components/Common/PasswordInput";
import { SelectField } from "@/components/Common/Select";
import { SwitchField } from "@/components/Common/Switch";
import { commonStatus, YEAR_DATE_FORMAT } from "@/constants/constant";
import paths from "@/constants/paths";
import {
    emailRegExp,
    onlyWhiteSpace,
    passwordRegex,
    phoneRegExp,
    userCodeRegex,
    whiteSpaceRegex,
} from "@/constants/validator";
import useUserList from "@/hooks/useUserList";
import { cleanObject } from "@/utils";
import { handleCatchError, trimSpaceName } from "@/utils/common";

import styles from "./CreateUser.module.scss";

function BasicInfoForm({
    userData,
    isCreate,
    provinces,
    districts,
    wards,
    changeProvince,
    changeDistrict,
}) {
    const [ form ] = useForm();
    const { push } = useRouter();
    const { createMutate, updateMutate } = useUserList({});

    const handleSubmit = async (values) => {
        const newValues = {
            ...cleanObject(values, { clear: [ undefined, "", null, 0 ] }),
            firstName: trimSpaceName(values?.firstName),
            lastName: trimSpaceName(values?.lastName),
            status: values?.status ? commonStatus.ACTIVE : commonStatus.LOCK,
            birthday: values.birthday ? dayjs(values.birthday).format(YEAR_DATE_FORMAT) : null,
        };

        try {
            if (!isCreate) {
                await updateMutate({
                    ...newValues,
                    id: userData.id,
                });
                toast.success("Cập nhật người dùng thành công.");
            } else {
                await createMutate({ ...newValues })
                    .then((res) => res.data)
                    .then((data) => {
                        toast.success("Tạo mới người dùng thành công.");
                        push({
                            pathname: paths.userDetail,
                            query: {
                                id: data.id,
                            },
                        });
                    });
            }
        } catch (err) {
            handleCatchError(err?.response?.data, form);
        }
    };

    useEffect(() => {
        if (!isCreate) {
            form.setFieldsValue({
                ...userData,
                status: userData?.status === commonStatus.ACTIVE,
                birthday: userData?.birthday ? dayjs(userData?.birthday) : null,
            });
            if (userData?.provinceId) {
                changeProvince(userData.provinceId);

                if (userData?.districtId) {
                    changeDistrict(userData.districtId);
                }
            }
        }
    }, []);

    return (
        <Form
            initialValues={{
                code: "",
                firstName: "",
                lastName: "",
                email: "",
                status: true,
                birthday: "",
                phone: "",
                password: "",
                rePassword: "",
                provinceId: null,
                districtId: null,
                wardId: null,
            }}
            onFinish={handleSubmit}
            form={form}
            validateTrigger="onChange"
            className={styles.userInfoForm}
        >
            <span className={styles.description}>Thông tin người dùng</span>
            <InputField
                name="lastName"
                label="Họ và tên đệm"
                rules={[
                    {
                        required: true,
                        message: "Họ và tên đệm không được bỏ trống.",
                    },
                    {
                        max: 45,
                        message: "Họ và tên đệm chỉ được chứa tối đa 45 ký tự.",
                    },
                    {
                        pattern: onlyWhiteSpace,
                        message: "Họ và tên đệm không được bỏ trống.",
                    },
                ]}
            />
            <InputField
                rules={[
                    {
                        required: true,
                        message: "Tên không được bỏ trống.",
                    },
                    {
                        max: 45,
                        message: "Tên chỉ được chứa tối đa 45 ký tự.",
                    },
                    {
                        pattern: onlyWhiteSpace,
                        message: "Tên không được bỏ trống.",
                    },
                ]}
                name="firstName"
                label="Tên"
            />
            <div className={styles.group}>
                <InputField
                    rules={[
                        {
                            required: true,
                            message: "Mã người dùng không được bỏ trống.",
                        },
                        {
                            max: 20,
                            message: "Mã người dùng chỉ chứa tối đa 20 ký tự.",
                        },
                        {
                            pattern: userCodeRegex,
                            message:
                                "Mã người dùng chỉ chứa chữ cái, số và ký tự đặc biệt thường gặp (.,- , _)",
                        },
                    ]}
                    name="code"
                    label="Mã người dùng"
                    disabled={!isCreate}
                />
                <InputField
                    rules={[
                        {
                            required: true,
                            message: "Số điện thoại không được bỏ trống.",
                        },
                        {
                            pattern: phoneRegExp,
                            message: "Số điện thoại không hợp lệ.",
                        },
                        {
                            len: 10,
                            message: "Số điện thoại phải có chính xác 10 chữ số.",
                        },
                    ]}
                    name="phone"
                    label="Số điện thoại"
                    disabled={!isCreate}
                    fieldProps={{
                        onlyDigit: true,
                        type: "number",
                    }}
                />
            </div>
            <InputField
                rules={[
                    {
                        required: true,
                        message: "Email không được bỏ trống.",
                    },
                    {
                        pattern: emailRegExp,
                        message: "Email chưa đúng định dạng",
                    },
                    {
                        max: 64,
                        message: "Email chỉ chứa tối đa 64 ký tự.",
                    },
                ]}
                name="email"
                label="Email"
                disabled={!isCreate}
            />
            <div className={styles.group}>
                <SelectField
                    name="provinceId"
                    label="Tỉnh/ thành phố"
                    onChange={(value) => {
                        changeProvince(value);
                        form.setFieldValue("districtId", null);
                        form.setFieldValue("wardId", null);
                    }}
                    options={provinces}
                />
                <SelectField
                    name="districtId"
                    onChange={(value) => {
                        changeDistrict(value);
                        form.setFieldValue("wardId", null);
                    }}
                    label="Quận/ huyện"
                    options={districts}
                />
            </div>
            <div className={styles.group}>
                <SelectField name="wardId" label="Phường/ xã" options={wards} />
                <InputField name="address" label="Số nhà, tên đường" rules={[
                    {
                        max: 45,
                        message: "Số nhà, Tên đường chỉ chứa tối đa 45 ký tự.",
                    },
                ]} />
            </div>
            <div className={styles.group}>
                <Form.Item name="birthday">
                    <DatePicker
                        placeholder="Ngày sinh"
                        picker="date"
                        name="birthday"
                        allowClear
                        className={styles.birthday}
                        dropdownClassName={styles.dropdownPicker}
                    />
                </Form.Item>
                <SelectField
                    fieldProps={{
                        showSearch: false,
                    }}
                    name="gender"
                    label="Giới tính"
                    options={[
                        { label: "Nam", value: "MALE" },
                        { label: "Nữ", value: "FEMALE" },
                    ]}
                />
            </div>
            <div className={styles.group}>
                <PasswordField
                    rules={
                        isCreate
                            ? [
                                {
                                    required: true,
                                    message: "Mật khẩu không được bỏ trống.",
                                },
                                {
                                    pattern: whiteSpaceRegex,
                                    message:
                                          "Mật khẩu không được bắt đầu và kết thúc bằng khoảng trắng.",
                                },
                                {
                                    pattern: passwordRegex,
                                    message:
                                          "Mật khẩu chỉ được sử dụng chữ cái, số và ký tự đặc biệt thường gặp!",
                                },
                                {
                                    min: 8,
                                    message: "Mật khẩu phải có tối thiểu 8 ký tự!",
                                },
                            ]
                            : [
                                {
                                    pattern: whiteSpaceRegex,
                                    message:
                                          "Mật khẩu không được bắt đầu và kết thúc bằng khoảng trắng.",
                                },
                                {
                                    pattern: passwordRegex,
                                    message:
                                          "Mật khẩu chỉ được sử dụng chữ cái, số và ký tự đặc biệt thường gặp!",
                                },
                                {
                                    min: 8,
                                    message: "Mật khẩu phải có tối thiểu 8 ký tự!",
                                },
                            ]
                    }
                    name="password"
                    label="Mật khẩu"
                    type="password"
                />
                <PasswordField
                    name="rePassword"
                    label="Nhập lại mật khẩu"
                    type="password"
                    rules={[
                        { required: true, message: "Xác nhận mật khẩu không được bỏ trống." },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    (!value && !getFieldValue("password")) ||
                                    getFieldValue("password") === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "Mật khẩu chưa trùng khớp.",
                                    ),
                                );
                            },
                        }),
                    ].filter((item) => (isCreate ? true : !item.required))}
                />
            </div>
            <span className={styles.description2}>Trạng thái</span>
            <div className={styles.status}>
                <label>Đang hoạt động</label>
                <SwitchField name="status" />
            </div>
            <div className={styles.footer}>
                <Button buttonType="submit">{isCreate ? "Thêm mới" : "Lưu thay đổi"}</Button>
            </div>
        </Form>
    );
}

export default BasicInfoForm;
