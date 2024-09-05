import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useForm, useWatch } from "rc-field-form";
import { toast } from "sonner";

import Collapse from "@/components/Common/Collapse";
import { Form } from "@/components/Common/Form";
import ConfirmModal from "@/components/Common/Modal/ConfirmModal";
import { SelectField } from "@/components/Common/Select";
import useBranch from "@/hooks/useBranch";
import useRole from "@/hooks/useRole";
import ArrowDownIcon from "@/public/icons/arrow-down.svg";
import TrashIcon from "@/public/icons/trash.svg";
import { assignBranchRole } from "@/services/api/user";
import { handleCatchError } from "@/utils/common";

import RoleListForm from "./RoleListForm";

import styles from "./CreateUser.module.scss";

const BranchForm = ({
    bIndex,
    isCreate,
    dataBranchRoles,
    setDataBranchRoles,
    handleRemoveBranch,
    handleChangeBranch,
}) => {
    const [ openConfirmModal, setOpenConfirmModal ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ form ] = useForm();
    const { roles } = useRole();
    const { query } = useRouter();
    const { branches } = useBranch();
    const branch = useWatch([], form);
    const isAddNew = !dataBranchRoles[bIndex]?.branchRoleId;

    const setData = (values) => {
        setError(false);
        form.setFieldsValue(values);
    };

    const handleSubmit = async (values) => {
        if (!branch?.roles?.length) {
            setError(true);

            return;
        }
        if (!openConfirmModal) {
            setOpenConfirmModal(true);
            return;
        }

        try {
            const resUpdate = await assignBranchRole({
                data: {
                    userId: Number(query?.id),
                    branchId: values?.branchId || dataBranchRoles[bIndex]?.branchId,
                    userRoles: values?.roles?.map((userRole) => ({
                        id: userRole.branchRoleId,
                        roleId: roles.find((rItem) => rItem.code === userRole.roleCode)?.id,
                        subjectIds: userRole.subjects,
                        studentIds: userRole.children,
                        classroomId: userRole?.classRoom,
                    })),
                },
            });

            if (resUpdate.result) {
                if (!dataBranchRoles[bIndex].branchRoleId) {
                    dataBranchRoles[bIndex].branchRoleId = Math.random();
                    setDataBranchRoles([ ...dataBranchRoles ]);
                }
                const currentBranch =
                    resUpdate?.data?.[Math.min(bIndex, resUpdate?.data?.length - 1)];
                const newRoles = currentBranch?.userRoles?.map((userRole) => ({
                    branchRoleId: userRole.assignmentId,
                    roleCode: userRole?.role?.code,
                    subjects: userRole?.teacherSubjects?.length
                        ? userRole?.teacherSubjects?.map((sub) => sub.id)
                        : [ null ],
                    children: userRole?.children?.length
                        ? userRole?.children?.map((child) => child.id)
                        : [ null ],
                    classrooms: userRole?.classrooms,
                }));

                form.setFieldsValue({
                    branchId: currentBranch?.branchId,
                    roles: newRoles,
                });

                toast.success("Cập nhật người dùng thành công");
                setOpenConfirmModal(false);
            }
        } catch (err) {
            handleCatchError(err?.response?.data);
        }
    };

    useEffect(() => {
        form.setFieldsValue(dataBranchRoles?.[bIndex]);
    }, []);

    useEffect(() => {
        if (!dataBranchRoles[bIndex]?.branchId) {
            const defaultBranch = branches?.filter(
                (option) =>
                    option?.value === branch?.branchId ||
                    !dataBranchRoles?.map((dItem) => dItem.branchId)?.includes(option?.value),
            )?.[0]?.id;
            dataBranchRoles[bIndex].branchId = defaultBranch;
            setDataBranchRoles([ ...dataBranchRoles ]);
            form.setFieldValue("branchId", defaultBranch);
        }
    }, [ branches ]);

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            initialValues={{
                branchRoleId: null,
                branchId: null,
                roles: [ { roleCode: null } ],
            }}
        >
            <div className={classNames({ [styles.error]: error })}>
                <Collapse
                    defaultOpen={true}
                    trigger={
                        <Collapse.Trigger>
                            <div className={styles.collapseTrigger}>
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    {!isAddNew ? (
                                        <div className={styles.branchName}>
                                            {
                                                branches?.find(
                                                    (bItem) =>
                                                        bItem.id ===
                                                        dataBranchRoles[bIndex].branchId,
                                                )?.name
                                            }
                                        </div>
                                    ) : (
                                        <SelectField
                                            allowClear={false}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Chi nhánh không được bỏ trống.",
                                                },
                                            ]}
                                            style={{ height: 44 }}
                                            name="branchId"
                                            onChange={(value) => {
                                                setData({
                                                    branchRoleId: null,
                                                    branchId: value,
                                                    roles: [ { roleCode: null } ],
                                                });
                                                handleChangeBranch(bIndex, value);
                                            }}
                                            placeholder="Chi nhánh"
                                            options={branches?.filter(
                                                (option) =>
                                                    option?.value === branch?.branchId ||
                                                    !dataBranchRoles
                                                        ?.map((dItem) => dItem.branchId)
                                                        ?.includes(option?.value),
                                            )}
                                        />
                                    )}
                                </div>
                                <div className={styles.icon}>
                                    {(dataBranchRoles?.length > 1 || !isCreate) && (
                                        <TrashIcon
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveBranch(bIndex);
                                            }}
                                        />
                                    )}
                                    <div className={styles.arrowDown}>
                                        <ArrowDownIcon />
                                    </div>
                                </div>
                            </div>
                        </Collapse.Trigger>
                    }
                >
                    <div className={styles.collapseContent}>
                        <RoleListForm
                            form={form}
                            branchId={dataBranchRoles[bIndex].branchId}
                            isCreate={isCreate}
                            setData={setData}
                            branch={branch}
                            fieldName={bIndex}
                        />
                    </div>
                </Collapse>
            </div>
            {error && <div className={styles.errorText}>Vai trò không được bỏ trống.</div>}
            <ConfirmModal
                onOpenChange={() => setOpenConfirmModal(false)}
                open={openConfirmModal}
                confirm="Xác nhận cập nhật vai trò người dùng"
                description="Bạn đang thực hiện thao tác cập nhật thông tin về vai trò người dùng. Toàn bộ dữ liệu theo phân quyền cũ sẽ bị xóa. Dữ liệu này không thể khôi phục."
                title="Bạn có chắc chắn muốn thực hiện?"
                onCancel={() => setOpenConfirmModal(false)}
                onConfirm={() => form.submit()}
            />
        </Form>
    );
};

export default BranchForm;
