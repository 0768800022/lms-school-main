import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import dayjs from "dayjs";
import { toast } from "sonner";

import { commonStatus, YEAR_DATE_FORMAT } from "@/constants/constant";
import { errorCodes } from "@/constants/errorCode";
import { addNewStudent, addStudentByPhone } from "@/services/api/classroomStudents";
import { cleanObject } from "@/utils";
import { handleCatchError } from "@/utils/common";

import Stepper from "../../Stepper";
import Modal from "../Modal";

import InfoForm from "./InfoForm";
import PhoneForm from "./PhoneForm";

import styles from "./ModalAddClassStudent.module.scss";

function ModalAddClassStudent({ trigger, open, onOpenChange, onSuccess }) {
    const [ _open, setOpen ] = useState(open);
    const [ step, setStep ] = useState(0);
    const [ confirmAddRole, setConfirmAddRole ] = useState();
    const [ userPhone, setUserPhone ] = useState();
    const { query } = useRouter();

    useEffect(() => {
        setOpen(open);
    }, [ open ]);

    const newOnOpenChange = (newOpen) => {
        setOpen(newOpen);
        onOpenChange && onOpenChange(newOpen);
    };

    const handleSubmitPhone = async (values) => {
        try {
            const resAdd = await addStudentByPhone({
                data: {
                    phone: values?.phone,
                    classroomId: Number(query?.id),
                    allowCreateStudentRole: confirmAddRole,
                },
            });

            if (resAdd.result) {
                toast.success("Thêm học sinh vào lớp học thành công");
                setOpen(false);
                onSuccess();
            } else {
                const errorCode = errorCodes[resAdd?.code];
                if (errorCode?.message) {
                    toast.error(errorCode?.message);
                } else {
                    if (resAdd?.code === errorCodes.STUDENT_NOT_HAS_STUDENT_ROLE.code) {
                        setConfirmAddRole(true);
                    } else if (resAdd?.code === errorCodes.USER_NOT_EXIST_IN_CURRENT_SCHOOL.code) {
                        setUserPhone(values?.phone);
                        setStep(1);
                    }
                }
            }
        } catch (err) {
            handleCatchError(err?.response?.data);
        }
    };

    const handleSubmitInfo = async (values) => {
        const newValues = {
            ...cleanObject(values, { clear: [ undefined, "", null, 0 ] }),
            status: commonStatus.ACTIVE,
            birthday: values.birthday ? dayjs(values.birthday).format(YEAR_DATE_FORMAT) : null,
        };

        try {
            const resAdd = await addNewStudent({
                data: {
                    classroomId: query?.id,
                    createUserForm: newValues,
                    status: values?.status ? commonStatus.ACTIVE : commonStatus.LOCK,
                },
            });

            if (resAdd.result) {
                toast.success("Thêm học sinh vào lớp học thành công");
                setOpen(false);
                onSuccess();
            } else {
                handleCatchError(resAdd);
            }
        } catch (err) {
            handleCatchError(err?.response?.data);
        }
    };

    return (
        <Modal.Root
            onOpenChange={newOnOpenChange}
            open={_open}
            trigger={trigger}
            className={classNames({ [styles.modalWrapper]: step === 1 })}
        >
            <Modal.Header title="Thêm học sinh vào lớp" />
            <Stepper active={step}>
                <Stepper.Step>
                    <PhoneForm
                        handleSubmit={handleSubmitPhone}
                        confirmAddRole={confirmAddRole}
                        setConfirmAddRole={setConfirmAddRole}
                    />
                </Stepper.Step>
                <Stepper.Step>
                    <InfoForm
                        userPhone={userPhone}
                        handleSubmit={handleSubmitInfo}
                        onCancel={() => newOnOpenChange(false)}
                        onBack={() => setStep(0)}
                    />
                </Stepper.Step>
            </Stepper>
        </Modal.Root>
    );
}

export default ModalAddClassStudent;
