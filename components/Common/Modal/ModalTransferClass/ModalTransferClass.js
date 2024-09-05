import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { transferClassroomStudent } from "@/services/api/classroomStudents";
import { combineName, handleCatchError } from "@/utils/common";

import Button from "../../Button";
import { Form, useForm } from "../../Form";
import { SelectField } from "../../Select";
import { TextareaField } from "../../Textarea";
import Modal from "../Modal";

import styles from "./ModalTransferClass.module.scss";

function ModalTransferClass({ open, onOpenChange, trigger, data, classOptions, onSuccess }) {
    const [ _open, setOpen ] = useState(open);
    const [ form ] = useForm();
    useEffect(() => {
        setOpen(open);
    }, [ open ]);

    const newOnOpenChange = (newOpen) => {
        setOpen(newOpen);
        onOpenChange && onOpenChange(newOpen);
    };

    const handleSubmit = async (values) => {
        try {
            const resTransfer = await transferClassroomStudent({
                data: {
                    classroomId: values?.newClass,
                    classroomStudentId: data?.id,
                    note: values?.note,
                },
            });

            if (resTransfer?.result) {
                toast.success("Chuyển lớp thành công");
                setOpen(false);
                onSuccess();
            } else {
                handleCatchError(resTransfer);
            }
        } catch (err) {
            handleCatchError(err?.response?.data);
        }
    };

    return (
        <Modal
            onOpenChange={newOnOpenChange}
            open={_open}
            trigger={trigger && <Modal.Trigger>{trigger}</Modal.Trigger>}
        >
            <div className={styles.wrapper}>
                <div className={styles.title}>Chuyển lớp</div>
                <div className={styles.description}>
                    Bạn đang thực hiện thao tác chuyển lớp cho học sinh{" "}
                    {data ? combineName(data.student) : ""}
                </div>
                <Form
                    onFinish={handleSubmit}
                    form={form}
                    className={styles.form}
                    initialValues={{
                        currentClass: data?.classroomId || null,
                        newClass: null,
                        note: "",
                    }}
                >
                    <div className={styles.group}>
                        <SelectField
                            disabled
                            name="currentClass"
                            label="Lớp học hiện tại"
                            options={classOptions}
                        />
                        <SelectField
                            required
                            name="newClass"
                            label="Chuyển sang lớp"
                            options={classOptions?.filter((c) => c.value !== data?.classroomId)}
                        />
                    </div>
                    <TextareaField
                        name="note"
                        label="Lý do (Tối đa 255 kí tự)"
                        fieldProps={{ rows: 10, maxLength: 255 }}
                    />

                    <div className={styles.actions}>
                        <Modal.Close><Button type="outline">Hủy</Button></Modal.Close>
                        <Button buttonType="submit">Xác nhận</Button>
                    </div>
                </Form>
            </div>
        </Modal>
    );
}

export default ModalTransferClass;
