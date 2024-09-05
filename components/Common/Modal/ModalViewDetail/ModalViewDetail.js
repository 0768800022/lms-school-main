import { useState } from "react";

import Button from "../../Button";
import { useForm } from "../../Form";
import Modal from "../Modal";

import styles from "./ModalViewDetail.module.scss";

function ModalViewDetail({ trigger, open, onOpenChange, item, title, children }) {
    const [ _open, setOpen ] = useState(open);
    const [ form ] = useForm();
    const newOnOpenChange = (newOpen) => {
        setOpen(newOpen);
        onOpenChange && onOpenChange(newOpen);
    };

    return (
        <Modal.Root
            onOpenChange={newOnOpenChange}
            open={_open}
            trigger={trigger && <Modal.Trigger>{trigger}</Modal.Trigger>}
        >
            <Modal.Header title={title} />
            <Modal.Body>{children}</Modal.Body>

            <Modal.Footer>
                <div className={styles.action}>
                    <Modal.Close>
                        <Button type="outline">Đóng</Button>
                    </Modal.Close>
                </div>
            </Modal.Footer>
        </Modal.Root>
    );
}

export default ModalViewDetail;
