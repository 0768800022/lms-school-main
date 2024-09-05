import React, { useState } from "react";
import { toast } from "sonner";

import { CODE_PASSWORD_MESSAGE } from "@/constants/constant";
import { passwordRegex, whiteSpaceRegex } from "@/constants/validator";
import CloseIcon from "@/public/icons/close-icon.svg";
import { changePassword } from "@/services/api/account";

import Button from "../../Button";
import { Form, useForm } from "../../Form";
import { PasswordField } from "../../PasswordInput";
import Modal from "../Modal";

import styles from "./ModalChangePassword.module.scss";

function ModalChangePassword({ trigger, open, onOpenChange }) {
    const [ _open, setOpen ] = useState(open);
    const [ form ] = useForm();
    const handleSubmit = async (values) => {
        try {
            await changePassword({ data: values });
        } catch (err) {
            switch (err?.response?.data?.code) {
                case (CODE_PASSWORD_MESSAGE.WRONG_OLD_PASSWORD,
                CODE_PASSWORD_MESSAGE.OLD_PASS_INCORRECT):
                    return form.setFields([
                        {
                            name: "oldPassword",
                            errors: [ "Mật khẩu hiện tại không chính xác" ],
                        },
                    ]);
                case (CODE_PASSWORD_MESSAGE.DUPLICATE_PASSWORD,
                CODE_PASSWORD_MESSAGE.SAME_OLD_PASSWORD):
                    return form.setFields([
                        {
                            name: "password",
                            errors: [ "Mật khẩu mới không được trùng mật khẩu hiện tại" ],
                        },
                    ]);
            }
        }

        toast.success("Đổi mật khẩu thành công");
        setOpen(false);
    };

    const newOnOpenChange = (newOpen) => {
        setOpen(newOpen);
        onOpenChange && onOpenChange(newOpen);
    };

    return (
        <Modal.Root
            width="54rem"
            onOpenChange={newOnOpenChange}
            open={_open}
            trigger={trigger}
        >
            <Modal.Header className={styles.header}>
                <div className={styles.title}>Đổi mật khẩu</div>
                <Modal.Close>
                    <CloseIcon />
                </Modal.Close>
            </Modal.Header>
            <Modal.Body>
                <Form
                    id="change-password"
                    className={styles.form}
                    onFinish={handleSubmit}
                    form={form}
                    initialValues={{
                        oldPassword: "",
                        password: "",
                        confirmPassword: "",
                    }}
                >
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
                        ]}
                        name="oldPassword"
                        label="Mật khẩu hiện tại"
                    />
                    <PasswordField
                        rules={[
                            { required: true, message: "Mật khẩu mới không được bỏ trống" },
                            {
                                pattern: whiteSpaceRegex,
                                message:
                                    "Mật khẩu mới không được bắt đầu và kết thúc bằng khoảng trắng!",
                            },
                            {
                                pattern: passwordRegex,
                                message:
                                    "Mật khẩu mới chỉ được sử dụng chữ cái, số và ký tự đặc biệt thường gặp!",
                            },
                            {
                                min: 8,
                                message: "Mật khẩu mới phải có tối thiểu 8 ký tự!",
                            },
                        ]}
                        name="password"
                        label="Mật khẩu mới"
                    />
                    <PasswordField
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
                        name="confirmPassword"
                        label="Xác nhận mật khẩu mới"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button buttonType="submit" fullWidth  form="change-password">
                    Xác nhận
                </Button>
            </Modal.Footer>
        </Modal.Root>
    );
}

export default ModalChangePassword;
