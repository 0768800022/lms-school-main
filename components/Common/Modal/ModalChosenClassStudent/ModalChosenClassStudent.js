import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { toast } from "sonner";

import { commonStatus, ROLES_CODE } from "@/constants/constant";
import { useDebounce } from "@/hooks/useDebounce";
import useUserList from "@/hooks/useUserList";
import ArrowLeftBtn from "@/public/icons/arrow-left-btn.svg";
import ArrowRightBtn from "@/public/icons/arrow-right-btn.svg";
import SearchIcon from "@/public/icons/search-normal.svg";
import { addListStudent } from "@/services/api/classroomStudents";
import { combineName, handleCatchError, removeAccents } from "@/utils/common";

import Button from "../../Button";
import { Form, useForm } from "../../Form";
import { InputField } from "../../Input";
import ResetButton from "../../ResetButton";
import Modal from "../Modal";

import DragTransferStudent from "./DragTransferStudent/DragTransferStudent";

import styles from "./ModalChosenClassStudent.module.scss";

const filterUnselect = (item) => ({
    ...item,
    selected: false,
});

function ModalChosenClassStudent({ trigger, open, onOpenChange, classData, onSuccess }) {
    const [ form ] = useForm();
    const [ _open, setOpen ] = useState(open);
    const [ isDrag, setIsDrag ] = useState(false);
    const [ search, setSearch ] = useState("");
    const searchDebounce = useDebounce(search);

    const { users } = useUserList({
        filter: {
            branchId: classData?.branchId,
            roleCode: ROLES_CODE.STUDENT,
            notStudySchoolYearId: classData?.schoolYearId,
            status: commonStatus.ACTIVE,
            sortByName: true,
        },
        mappingData: (res) =>
            res?.map((item) => ({
                ...item,
                fullName: combineName(item),
                selected: false,
            })),
    });

    const [ dataLeft, setDataLeft ] = useState([]);

    const [ dataRight, setDataRight ] = useState([]);

    useEffect(() => {
        setDataLeft(
            users?.map((item) => ({
                ...item,
                fullName: combineName(item),
                selected: Boolean(dataLeft?.find((dI) => dI?.id === item?.id)?.selected),
            })),
        );
    }, [ users ]);

    useEffect(() => {
        setOpen(open);
    }, [ open ]);

    const newOnOpenChange = (newOpen) => {
        setOpen(newOpen);
        onOpenChange && onOpenChange(newOpen);
    };

    const handleDropLeft = (event) => {
        const item = event.dataTransfer.getData("text/plain");
        const idStdLeft = dataLeft.filter((std) => std?.id);
        if (idStdLeft.includes(item)) {
            return;
        }
        const indexStd = dataRight.findIndex((std) => std?.id === +item);
        if (indexStd !== -1) {
            setDataRight((prevItems) => {
                const newItems = [ ...prevItems ];
                newItems.splice(indexStd, 1);
                return newItems;
            });

            setDataLeft((prevItems) => [ dataRight[indexStd], ...prevItems ]);
        }
    };

    const handleDropRight = (event) => {
        const item = event.dataTransfer.getData("text/plain");
        const idStdRight = dataRight.filter((std) => std?.id);
        if (idStdRight.includes(item)) {
            return;
        }
        const indexStd = dataLeft.findIndex((std) => std?.id === +item);
        if (indexStd !== -1) {
            setDataLeft((prevItems) => {
                const newItems = [ ...prevItems ];
                newItems.splice(indexStd, 1);
                return newItems;
            });

            setDataRight((prevItems) => [ dataLeft[indexStd], ...prevItems ]);
        }
    };

    const handleSelect = () => {
        const dataTransfer = dataLeft.filter((item) => item.selected);

        setDataLeft([ ...dataLeft.filter((item) => !item.selected) ]);
        setDataRight([ ...dataRight, ...dataTransfer ].map(filterUnselect));
    };

    const handleUnSelect = () => {
        const dataTransfer = dataRight.filter((item) => item.selected);

        setDataRight([ ...dataRight.filter((item) => !item.selected) ]);
        setDataLeft([ ...dataLeft, ...dataTransfer ].map(filterUnselect));
    };

    const handleSubmit = async () => {
        if (!dataRight?.length) {
            toast.error("Bạn cần chọn ít nhất một học sinh để thêm vào lớp học");
            return;
        }
        try {
            const resAdd = await addListStudent({
                data: {
                    classroomId: classData?.id,
                    studentIds: dataRight?.map((student) => student.id),
                },
            });

            if (resAdd?.result) {
                toast.success("Thêm học sinh vào lớp học thành công");
                onSuccess();
                newOnOpenChange(false);
            } else {
                handleCatchError(resAdd);
            }
        } catch (err) {
            handleCatchError(err?.response?.data);
        }
    };

    return (
        <Modal.Root width="121.6rem" onOpenChange={newOnOpenChange} open={_open} trigger={trigger}>
            <Modal.Header title="Thêm học sinh vào lớp" />
            <Modal.Body className={styles.body}>
                <Form
                    className={styles.filter}
                    form={form}
                    initialValues={{
                        search: "",
                        status: null,
                    }}
                    onFinish={(values) => {}}
                >
                    <InputField
                        name="search"
                        className={styles.filterSearch}
                        onChange={(e) => setSearch(e?.target?.value)}
                        placeholder="Tìm kiếm theo tên/mã/SĐT học sinh"
                        type="search"
                    />
                    {/* <SelectField
                        name="classroom"
                        className={styles.filterStatus}
                        onChange={(value) => {}}
                        placeholder="Lớp học"
                        options={[]}
                    /> */}
                    <div className={styles.reset}>
                        <ResetButton
                            onClick={() => {
                                form.resetFields();
                                setSearch("");
                            }}
                        />
                    </div>
                </Form>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <div className={styles.transferTitle}>
                            Tất cả học sinh ({dataLeft?.length || 0})
                        </div>
                        <DragTransferStudent
                            data={dataLeft?.filter((item) => {
                                const searchText = removeAccents(searchDebounce)?.toLowerCase();

                                return (
                                    removeAccents(item?.fullName)
                                        ?.toLowerCase()
                                        ?.includes(searchText) ||
                                    removeAccents(item?.code)
                                        ?.toLowerCase()
                                        ?.includes(searchText) ||
                                    removeAccents(item?.phone)?.includes(searchText)
                                );
                            })}
                            setData={setDataLeft}
                            keyName="data-left"
                            messageNodata="Chưa có học sinh"
                            onClickAllItem={() => {}}
                            handleChange={() => {}}
                            onDrop={handleDropLeft}
                            isDrag={isDrag}
                            setIsDrag={setIsDrag}
                        />
                    </div>
                    <div className={styles.boxActionBtn}>
                        <Button
                            className={classNames(styles.btnSelected, {
                                [styles.disable]: false,
                            })}
                            disabled={!dataLeft?.some((item) => item.selected)}
                            onClick={handleSelect}
                            iconRight={<ArrowRightBtn />}
                        >
                            Chọn
                        </Button>
                        <Button
                            className={classNames(styles.btnUnselected, {
                                [styles.disable]: true,
                            })}
                            disabled={!dataRight?.some((item) => item.selected)}
                            type="outline"
                            onClick={handleUnSelect}
                            iconLeft={<ArrowLeftBtn />}
                        >
                            Bỏ chọn
                        </Button>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.transferTitle}>
                            Học sinh đã chọn ({dataRight?.length || 0})
                        </div>
                        <DragTransferStudent
                            data={dataRight}
                            setData={setDataRight}
                            keyName="data-right"
                            messageNodata="Chưa có học sinh"
                            onClickAllItem={() => {}}
                            handleChange={() => {}}
                            onDrop={handleDropRight}
                            isDrag={isDrag}
                            setIsDrag={setIsDrag}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className={styles.actions}>
                <Modal.Close>
                    <Button type="outline">Hủy</Button>
                </Modal.Close>
                <Button onClick={handleSubmit}>Thêm vào lớp</Button>
            </Modal.Footer>
        </Modal.Root>
    );
}

export default ModalChosenClassStudent;
