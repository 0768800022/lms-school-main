import React from "react";

import { phoneRegExp } from "@/constants/validator";

import Button from "../../Button";
import { Form, useForm } from "../../Form";
import { InputField } from "../../Input";
import Note from "../../Note";
import Modal from "../Modal";

import styles from "./ModalAddClassStudent.module.scss";

function PhoneForm({ handleSubmit, confirmAddRole, setConfirmAddRole }) {
    const [ form ] = useForm();
    return (
        <>
            <Modal.Body>
                <div className={styles.description}>
                    Nhập số điện thoại học sinh cần thêm vào lớp học
                </div>
                <Form
                    onFinish={handleSubmit}
                    form={form}
                    className={styles.form}
                    initialValues={{
                        phone: "",
                    }}
                >
                    <InputField
                        label="Số điện thoại"
                        name="phone"
                        onChange={() => setConfirmAddRole(false)}
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
                    />
                    <span>
                        {confirmAddRole && (
                            <Note
                                title="Xác nhận bổ sung vai trò học sinh cho người dùng"
                                type="warning"
                                content={
                                    <div className={styles.noteContent}>
                                        Người dùng này hiện đã tồn tại trên hệ thống. <br /> <br />
                                        Tuy nhiên, tài khoản này{" "}
                                        <strong>chưa được gán vai trò học sinh.</strong> Bạn có muốn
                                        thêm vai trò học sinh cho người dùng này, đồng thời thực
                                        hiện thêm người dùng vào lớp học này không?
                                    </div>
                                }
                            />
                        )}
                    </span>
                </Form>
            </Modal.Body>
            <Modal.Footer className={styles.footer}>
                <Modal.Close>
                    <Button type="outline">Hủy</Button>
                </Modal.Close>
                <Button onClick={form.submit}>Thêm vào lớp học</Button>
            </Modal.Footer>
        </>
    );
}

export default PhoneForm;
