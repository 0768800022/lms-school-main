import React from "react";

import Button from "@/components/Common/Button";
import Modal from "@/components/Common/Modal";

import styles from "./FormModal.module.scss";

const CloseModalButton = ({ labelButtonCancel, disabled }) => (
    <Modal.Close>
        <Button disabled={disabled} type="outline">
            {labelButtonCancel || "Hủy"}
        </Button>
    </Modal.Close>
);

function FormModal({
    classNames = {},
    trigger,
    open,
    onClose,
    onSubmit,
    title,
    children,
    formId,
    loading,
    width = "70rem",
    maskClosable = true,
    disabled = false,
    renderFooter,
    labelButtonConfirm,
    labelButtonCancel,
    isEdit,
}) {
    const getLabelConfirmButton = () => {
        if (labelButtonConfirm) {
            return labelButtonConfirm;
        }

        if (isEdit !== undefined) {
            return isEdit ? "Cập nhật" : "Thêm mới";
        }

        return "Xác nhận";
    };

    return (
        <Modal.Root
            open={open}
            onOpenChange={(open) => !open && onClose?.()}
            width={width}
            maskClosable={maskClosable}
            className={classNames.root}
            trigger={trigger}
        >
            <Modal.Header className={classNames.header} title={title} />
            <Modal.Body className={classNames.body}>
                {React.cloneElement(children, {
                    formId,
                    onSubmit,
                    ...children.props,
                })}
            </Modal.Body>
            <Modal.Footer className={classNames.footer}>
                {renderFooter?.({
                    closeButton: <CloseModalButton disabled={loading} labelButtonCancel={labelButtonCancel} />,
                    submitButtonProps: {
                        disabled: loading,
                        buttonType: "submit",
                        form: formId,
                        loading,
                    },
                }) || (
                    <>
                        <CloseModalButton disabled={loading} labelButtonCancel={labelButtonCancel} />
                        <Button
                            disabled={loading || disabled}
                            buttonType="submit"
                            form={formId}
                            loading={loading}
                            className={styles.confirm}
                        >
                            {getLabelConfirmButton()}
                        </Button>
                    </>
                )}
            </Modal.Footer>
        </Modal.Root>
    );
}

export default FormModal;
