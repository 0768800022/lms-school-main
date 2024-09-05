import React from "react";
import classnames from "classnames";

import Button from "../../Button";
import Modal from "../Modal";

import styles from "./ConfirmModal.module.scss";

function ConfirmModal({
    onOpenChange,
    onClose,
    open = false,
    trigger,
    title,
    description,
    confirm,
    onConfirm = () => {},
    onCancel = () => {},
    confirmText,
    cancelText,
    note = <></>,
    zIndex,
    className = "",
}) {
    return (
        <Modal.Root
            width="40rem"
            onOpenChange={onOpenChange}
            onClose={onClose}
            open={open}
            trigger={trigger}
            zIndex={zIndex}
        >
            <Modal.Header title={title} />
            <Modal.Body className={classnames(styles.wrapper, className)}>
                <div className={styles.description}>{description}</div>
                <div className={styles.confirm}>{confirm}</div>
                {note && <div className={styles.note}>{note}</div>}
            </Modal.Body>
            <Modal.Footer className={styles.actions}>
                <Button onClick={onCancel} type="outline">
                    {cancelText || "Hủy"}
                </Button>
                <Button onClick={onConfirm}>{confirmText || "Xác nhận"}</Button>
            </Modal.Footer>
        </Modal.Root>
    );
}

export default ConfirmModal;
