import React, { useEffect, useMemo, useRef, useState } from "react";

import { ROLES_CODE } from "@/constants/constant";
import { useAppContext } from "@/contexts";
import useAuth from "@/hooks/useAuth";
import useTeacherClasses from "@/hooks/useTeacherClasses";

import Button from "../../Button";
import { Form, useForm, useWatch } from "../../Form";
import Radio from "../../Radio";
import { SelectField } from "../../Select";
import Modal from "../Modal";

import styles from "./ModalChangeRole.module.scss";

function ModalChangeRole({ open, onOpenChange, trigger }) {
    const modalRef = useRef();
    const { changeActiveRole, defaultBranch, activeRole } = useAppContext();
    const { fetchClasses, isLoading: isGetClassDefaultLoading } = useTeacherClasses({
        enabled: false,
    });
    const [ form ] = useForm();
    const selectedBranch = useWatch("branch", form);
    const { branchRoles } = useAuth();

    const getDefaultClassId = async (userRole) => {
        if (userRole !== ROLES_CODE.TEACHER) return null;

        const { data } = await fetchClasses();

        return data?.headClassrooms?.[0]?.id || data?.subjectClassrooms?.[0]?.id;
    };

    const selectBranchOptions = useMemo(() => {
        if (!branchRoles) return [];

        const convertedBranchRoles = branchRoles.reduce((acc, { branch }) => {
            if (!acc[branch.id]) {
                acc[branch.id] = {
                    label: branch.name,
                    value: branch.id,
                };
            }

            return acc;
        }, {});

        return Object.values(convertedBranchRoles);
    }, [ branchRoles ]);

    const handleSubmit = async (values) => {
        if (values) {
            const { roleCode, branch } = values;

            if (!roleCode || !branch) return;

            changeActiveRole(roleCode, branch);

            const selectedSiteUrl = branchRoles.find(
                ({ branch, role }) => role.code == roleCode && branch.id == defaultBranch,
            )?.lmsSiteUrl;

            const defaultClassId = await getDefaultClassId(roleCode);

            const openUrl = new URL(selectedSiteUrl);
            openUrl.searchParams.set(
                "meta",
                [ roleCode, branch, defaultClassId ].filter(Boolean).join(","),
            );

            changeActiveRole(activeRole, defaultBranch);

            if (location.hostname === openUrl.hostname) {
                window.open(openUrl.href, "_self");
            } else {
                window.open(openUrl.href);
            }

            onOpenChange(false);
        }
    };

    useEffect(() => {
        if (!branchRoles || !open) return;

        form.setFieldsValue({
            branch: Number(defaultBranch),
            roleCode: activeRole,
        });
    }, [ activeRole, defaultBranch, branchRoles, open ]);

    return (
        <Modal.Root
            innerRef={modalRef}
            width="49rem"
            onOpenChange={onOpenChange}
            open={open}
            trigger={trigger}
        >
            <Modal.Body className={styles.wrapper}>
                <Form
                    form={form}
                    onFinish={handleSubmit}
                    initialValues={{
                        branch: "",
                        roleCode: "",
                    }}
                >
                    <div className={styles.selectValue}>
                        <SelectField
                            rules={[
                                {
                                    required: true,
                                    message: "Chi nhánh không được bỏ trống.",
                                },
                            ]}
                            name="branch"
                            placeholder="Chọn chi nhánh"
                            options={selectBranchOptions}
                            getPopupContainer={() => modalRef.current}
                        />
                    </div>
                    {selectedBranch && (
                        <>
                            <div className={styles.label}>Chọn vai trò</div>
                            <div>
                                <Form.Item
                                    name="roleCode"
                                    rules={[
                                        { required: true, message: "Vai trò không được bỏ trống." },
                                    ]}
                                >
                                    <Radio.Group className={styles.selectRole}>
                                        {branchRoles
                                            ?.filter(
                                                (branchRole) =>
                                                    branchRole?.branch?.id == selectedBranch,
                                            )
                                            .map((item, index) => (
                                                <Radio
                                                    key={index}
                                                    label={item?.role?.name}
                                                    value={item?.role?.code}
                                                />
                                            ))}
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                        </>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button fullWidth loading={isGetClassDefaultLoading} onClick={form.submit}>
                    Chuyển đến màn hình vai trò
                </Button>
            </Modal.Footer>
        </Modal.Root>
    );
}

export default ModalChangeRole;
