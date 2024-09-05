import React, { useEffect } from "react";

import {
    emailRegExp,
    onlyWhiteSpace,
    passwordRegex,
    phoneRegExp,
    whiteSpaceRegex,
} from "@/constants/validator";
import useArea from "@/hooks/useArea";

import Button from "../../Button";
import DatePicker from "../../DatePicker";
import { Form, useForm } from "../../Form";
import { InputField } from "../../Input";
import { PasswordField } from "../../PasswordInput";
import { SelectField } from "../../Select";
import { SwitchField } from "../../Switch";
import Modal from "../Modal";

import styles from "./ModalAddClassStudent.module.scss";

function InfoForm({ handleSubmit, userPhone, onCancel, onBack }) {
    const [ form ] = useForm();
    const { provinces, districts, wards, changeProvince, changeDistrict } = useArea();

    useEffect(() => {
        form.setFieldValue("phone", userPhone);
    }, [ userPhone ]);

    return (
        <>
            <Modal.Body>
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
                >
                    <div className={styles.form}>
                        <div className={styles.group}>
                            <InputField
                                rules={[
                                    {
                                        required: true,
                                        message: "Số điện thoại không được bỏ trống.",
                                    },
                                    {
                                        length: 10,
                                        message: "Số điện thoại phải có chính xác 10 chữ số.",
                                    },
                                    {
                                        pattern: phoneRegExp,
                                        message: "Số điện thoại không hợp lệ.",
                                    },
                                ]}
                                name="phone"
                                label="Số điện thoại"
                                disabled
                            />
                            <InputField
                                rules={[
                                    {
                                        required: true,
                                        message: "Mã người dùng không được bỏ trống.",
                                    },
                                ]}
                                name="code"
                                label="Mã người dùng"
                            />
                        </div>
                        <div className={styles.group}>
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
                            <InputField name="address" label="Số nhà, tên đường" />
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
                                rules={[
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
                                ]}
                                name="password"
                                label="Mật khẩu"
                                type="password"
                            />
                            <PasswordField
                                name="rePassword"
                                label="Nhập lại mật khẩu"
                                type="password"
                                rules={[
                                    { required: true, message: "Vui lòng nhập xác nhận mật khẩu." },
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
                                                    "Thông tin chưa trùng khớp, vui lòng nhập mật khẩu xác nhận trùng với mật khẩu mới",
                                                ),
                                            );
                                        },
                                    }),
                                ]}
                            />
                        </div>
                        <span className={styles.description}>Trạng thái</span>
                        <div className={styles.status}>
                            <label>Đang hoạt động</label>
                            <SwitchField name="status" />
                        </div>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.footer}>
                <Button type="outline" onClick={onCancel}>
                    Hủy
                </Button>{" "}
                <Button type="outline" onClick={onBack}>
                    Quay lại
                </Button>
                <Button onClick={form.submit}>Thêm vào lớp học</Button>
            </Modal.Footer>
        </>
    );
}

export default InfoForm;
