import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import classNames from "classnames";

import { ROLES_CODE } from "@/constants/constant";
import useBranch from "@/hooks/useBranch";
import useRole from "@/hooks/useRole";
import UploadIcon from "@/public/icons/document-upload.svg";
import DownloadIcon from "@/public/icons/download.svg";
import XIcon from "@/public/icons/x.svg";

import Button from "../../Button";
import NextLink from "../../NextLink";
import Select from "../../Select";
import Modal from "../Modal";

import styles from "./ImportUserModal.module.scss";

const getLinkExampleFile = (code) => {
    switch (code) {
        case ROLES_CODE.TEACHER:
            return "/resources/import_teacher.zip";

        case ROLES_CODE.STUDENT:
            return "/resources/import_student.zip";

        case ROLES_CODE.PARENT:
            return "/resources/import_parent.zip";
    }
};

function ImportUserModal({ trigger, open, onOpenChange, code, selectBranch = false }) {
    const [ file, setFile ] = useState();
    const [ percent, setPercent ] = useState(0);
    const [ error, setError ] = useState("");
    const { branches } = useBranch();
    const { roles } = useRole();
    const { acceptedFiles, getRootProps, getInputProps, clearFiles } = useDropzone({
        accept: {
            "application/vnd.ms-excel": [ ".xls" ],
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [ ".xlsx" ],
        },
        onDrop: (files) => {
            setError("");
            setFile(files[0]);
        },
        onDropRejected: (files) => {
            if (files[0].errors.some((error) => error.code === "file-invalid-type")) {
                setError(
                    "File tải lên không đúng định dạng, hệ thống chỉ hỗ trợ các file có định dạng .xls,.xlsx",
                );
            }
        },
    });

    useEffect(() => {
        setPercent(0);
        if (!file) {
            return;
        }
        let interval2;
        let timeout;
        let clonePercent = percent;
        const randomNumber = Math.ceil(Math.random() * 9) * 10;
        const interval = setInterval(() => {
            if (clonePercent >= randomNumber) {
                clearInterval(interval);
                setTimeout(() => {
                    interval2 = setInterval(() => {
                        if (clonePercent >= 100) {
                            clearInterval(interval2);
                            return;
                        }
                        setPercent(clonePercent + 1);
                        clonePercent++;
                    }, 10);
                }, 500);
                return;
            }

            setPercent(clonePercent + 1);
            clonePercent++;
        }, 20);

        return () => {
            clearInterval(interval);
            clearInterval(interval2);
            clearTimeout(timeout);
        };
    }, [ file ]);

    return (
        <Modal.Root
            onOpenChange={onOpenChange}
            open={open}
            className={styles.modalWrapper}
            trigger={trigger}
            width="50rem"
        >
            <Modal.Header
                title={`Tải lên danh sách ${roles?.find((role) => role.code === code)?.name}`}
            />
            <Modal.Body className={styles.wrapper}>
                {file ? (
                    <div className={styles.fileContainer}>
                        <div className={styles.fileInfo}>
                            <div className={styles.image}>
                                <Image
                                    width={20}
                                    height={20}
                                    alt="excel"
                                    src="/images/common/excel.png"
                                />
                            </div>
                            <div className={styles.fileName}>{file?.name || "example.xlsx"}</div>
                        </div>
                        <div className={styles.process}>
                            <div className={styles.bar}>
                                <div
                                    className={styles.bar}
                                    style={{
                                        background: "#4CAF50",
                                        width: `${percent}%`,
                                        position: "absolute",
                                        left: 0,
                                        top: 0,
                                    }}
                                ></div>
                            </div>
                            <div className={styles.percent}>{percent}%</div>
                        </div>
                        <div className={styles.closeIcon} onClick={() => setFile()}>
                            <XIcon />
                        </div>
                    </div>
                ) : (
                    <div
                        {...getRootProps({
                            className: classNames({
                                [styles.dropzone]: true,
                                [styles.error]: Boolean(error),
                            }),
                        })}
                    >
                        <input {...getInputProps()} />
                        <div className={styles.dropzoneContainer}>
                            <UploadIcon />
                            <div className={styles.dropzoneText}>
                                {error ? (
                                    <div className={styles.error}>{error}</div>
                                ) : (
                                    <>
                                        <div>Kẻo và thả tệp vào đây hoặc chọn từ thiết bị</div>
                                        <div>
                                            Chọn tệp <span className={styles.notice}>tại đây</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {selectBranch && (
                    <Select
                        placeholder="Chọn chi nhánh"
                        onChange={(value) => {
                            console.log({ value });
                        }}
                        options={branches}
                    />
                )}
            </Modal.Body>
            <Modal.Footer className={styles.actions}>
                <NextLink href={getLinkExampleFile(code)}>
                    <Button
                        className={styles.downloadButton}
                        type="outline"
                        iconLeft={<DownloadIcon width={20} height={20} />}
                    >
                        Tải file mẫu
                    </Button>
                </NextLink>
                <div>
                    <Modal.Close>
                        <Button type="none">Hủy</Button>
                    </Modal.Close>
                    <Button disabled={!file}>Tải lên</Button>
                </div>
            </Modal.Footer>
        </Modal.Root>
    );
}

export default ImportUserModal;
