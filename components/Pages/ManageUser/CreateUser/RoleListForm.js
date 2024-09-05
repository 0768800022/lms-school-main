import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { toast } from "sonner";

import AddButton from "@/components/Common/AddButton";
import Button from "@/components/Common/Button";
import { Form, useWatch } from "@/components/Common/Form";
import { SelectField, SelectLazy } from "@/components/Common/Select";
import { useConfirmModal } from "@/components/layouts/AppWrapper/ConfirmModalWrapper";
import { commonStatusSchoolyear, ROLES_CODE } from "@/constants/constant";
import useRole from "@/hooks/useRole";
import useSubject from "@/hooks/useSubject";
import ErrorCircleIcon from "@/public/icons/error-circle.svg";
import TrashIcon from "@/public/icons/trash.svg";
import { getUsers, unAssignBranchRole } from "@/services/api/user";
import { combineName, handleCatchError } from "@/utils/common";

import styles from "./CreateUser.module.scss";

function RoleListForm({ form, isCreate, branch, setData, branchId }) {
    const { query } = useRouter();
    const { roles } = useRole();
    const { confirm } = useConfirmModal();
    const [ _subject, setSubject ] = useState({});
    const { getSubject } = useSubject();
    const curRoles = useWatch("roles", form);
    const curChildren =
        curRoles?.find((curRole) => curRole.roleCode === ROLES_CODE.PARENT)?.children || [];
    const _getSubject = () => {
        if (_subject[branchId]) {
            return;
        }
        getSubject(branchId).then((res) => setSubject({ ..._subject, [branchId]: res }));
    };

    const getBranchRole = (roleC) => branch?.roles?.find((role) => role.roleCode === roleC);

    const handleChangeRole = (pos, newValue) => {
        branch?.roles?.splice(pos, 1, {
            roleCode: newValue,
            subjects: [ null ],
            children: [ null ],
        });
        setData({ ...branch });
    };

    const handleChangeSubject = (pos, newValue) => {
        getBranchRole(ROLES_CODE.TEACHER).subjects.splice(pos, 1, newValue);
        setData({ ...branch });
    };

    const handleChangeChild = (pos, newValue) => {
        getBranchRole(ROLES_CODE.PARENT).children.splice(pos, 1, newValue);
        setData({ ...branch });
    };

    const handleRemoveRole = async (branchRoleId, onSuccess) => {
        try {
            const res = await unAssignBranchRole({ data: { id: branchRoleId } });
            if (res?.result) {
                toast?.success("Xóa vai trò thành công");
                onSuccess();
            } else {
                handleCatchError(res?.data);
            }
        } catch (err) {
            handleCatchError(err?.response?.data);
        }
    };

    return (
        <Form.List name="roles">
            {(branchFields, { add, remove }) => {
                if (!branchFields?.length) {
                    return (
                        <div
                            className={styles.content}
                            style={{
                                borderRadius: "0 0 12px 12px",
                            }}
                        >
                            <div className={styles.item}>
                                <AddButton
                                    onClick={() => {
                                        add({ roleCode: null });
                                    }}
                                    label="Thêm vai trò"
                                />
                            </div>
                            {!isCreate && (
                                <div className={styles.footer}>
                                    <Button buttonType="submit">Lưu thay đổi</Button>
                                </div>
                            )}
                        </div>
                    );
                }
                return branchFields?.map((branchField, index) => {
                    const item = branch?.roles?.[branchField.name] || {};
                    _getSubject();
                    return (
                        <Fragment key={index}>
                            <div className={styles.header}>
                                <span>{`Vai trò ${item?.branchRoleId ? roles?.find((role) => role.code === item.roleCode)?.name : index + 1}`}</span>
                                <div
                                    onClick={() => {
                                        if (item.branchRoleId) {
                                            confirm({
                                                confirm: "Bạn có chắc chắn muốn thực hiện?",
                                                description: `Bạn đang thực hiện thao tác xóa Vai trò. Sau khi xóa, dữ liệu này không thể
                                                khôi phục. Đồng thời, các nội dung đang sử dụng dữ liệu này có thể bị ảnh hưởng.`,
                                                title: `Xác nhận xóa Vai trò`,
                                                onConfirm: () => {
                                                    handleRemoveRole(item.branchRoleId, () => {
                                                        remove(index);
                                                    });
                                                },
                                                onCancel: () => {},
                                            });
                                        } else {
                                            remove(index);
                                        }
                                    }}
                                >
                                    {(branch?.roles?.length > 1 || !isCreate) && <TrashIcon />}
                                </div>
                            </div>
                            <div
                                className={styles.content}
                                style={{
                                    borderRadius:
                                        index === branch?.roles?.length - 1 ? "0 0 12px 12px" : "0",
                                }}
                            >
                                <div className={styles.item}>
                                    <div className={styles.selectValue}>
                                        <input
                                            hidden
                                            name={[ branchField.name, "branchRoleId" ]}
                                            defaultValue={item.branchRoleId}
                                        />
                                        <SelectField
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Vai trò không được bỏ trống.",
                                                },
                                            ]}
                                            disabled={Boolean(item?.branchRoleId)}
                                            getPopupContainer={() => null}
                                            name={[ branchField.name, "roleCode" ]}
                                            onChange={(value) => {
                                                handleChangeRole(index, value);
                                            }}
                                            label="Chọn vai trò"
                                            options={roles?.filter(
                                                (option) =>
                                                    option?.value === item.roleCode ||
                                                    !branch?.roles
                                                        ?.map((rItem) => rItem.roleCode)
                                                        .includes(option?.value),
                                            )}
                                        />
                                    </div>
                                </div>
                                {item.roleCode === ROLES_CODE.TEACHER && (
                                    <>
                                        <Form.List name={[ branchField.name, "subjects" ]}>
                                            {(
                                                sFields,
                                                { add: addSubject, remove: removeSubject },
                                            ) => {
                                                return sFields?.length > 0 ? (
                                                    sFields.map((sField, sIndex) => (
                                                        <>
                                                            <div
                                                                key={sField.key}
                                                                className={styles.item}
                                                            >
                                                                <div className={styles.selectValue}>
                                                                    <SelectField
                                                                        rules={[
                                                                            {
                                                                                required: true,
                                                                                message:
                                                                                    "Môn học phụ trách không được bỏ trống.",
                                                                            },
                                                                        ]}
                                                                        name={sField.name}
                                                                        onChange={(value) => {
                                                                            handleChangeSubject(
                                                                                sIndex,
                                                                                value,
                                                                            );
                                                                        }}
                                                                        label="Môn học phụ trách"
                                                                        options={_subject?.[
                                                                            branchId
                                                                        ]?.filter(
                                                                            (option) =>
                                                                                option?.value ===
                                                                                    item
                                                                                        ?.subjects?.[
                                                                                            sIndex
                                                                                        ] ||
                                                                                !item?.subjects?.includes(
                                                                                    option?.value,
                                                                                ),
                                                                        )}
                                                                    />
                                                                </div>
                                                                {(sIndex > 0 ||
                                                                    sFields?.length > 1) && (
                                                                    <div
                                                                        className={styles.removeRow}
                                                                        onClick={() => {
                                                                            removeSubject(sIndex);
                                                                        }}
                                                                    >
                                                                        <TrashIcon />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {item?.subjectClassrooms?.[sIndex]
                                                                ?.classrooms?.length ? (
                                                                    <div
                                                                        className={
                                                                            styles.subjectClassrooms
                                                                        }
                                                                    >
                                                                    Lớp học phụ trách:{" "}
                                                                        <span>
                                                                            {item?.subjectClassrooms?.[
                                                                                sIndex
                                                                            ]?.classrooms
                                                                                ?.map(
                                                                                    (cItem) =>
                                                                                        cItem.name,
                                                                                )
                                                                                .join(", ")}
                                                                        </span>
                                                                    </div>
                                                                ) : (
                                                                    <></>
                                                                )}
                                                            {sIndex === sFields?.length - 1 && (
                                                                <Button
                                                                    onClick={() => {
                                                                        addSubject(null);
                                                                    }}
                                                                    className={styles.addButton}
                                                                    type="outline"
                                                                >
                                                                    <div>+</div>
                                                                    <div>
                                                                        Thêm môn học phụ trách
                                                                    </div>
                                                                </Button>
                                                            )}
                                                        </>
                                                    ))
                                                ) : (
                                                    <Button
                                                        onClick={() => {
                                                            addSubject(null);
                                                        }}
                                                        className={styles.addButton}
                                                        type="outline"
                                                    >
                                                        <div>+</div>
                                                        <div>Thêm môn học phụ trách</div>
                                                    </Button>
                                                );
                                            }}
                                        </Form.List>
                                    </>
                                )}

                                {item.roleCode === ROLES_CODE.STUDENT ? (
                                    item?.classrooms?.length > 0 ? (
                                        <div className={styles.classroomHistory}>
                                            <div className={styles.historyTitle}>
                                                Lịch sử học tập
                                            </div>
                                            <ul className={styles.list}>
                                                {item?.classrooms?.map((classroom, index) => (
                                                    <li
                                                        key={index}
                                                        className={classNames({
                                                            [styles.historyItem]: true,
                                                            [styles.next]:
                                                                classroom?.schoolYear?.state ===
                                                                commonStatusSchoolyear.NEXT,
                                                            [styles.current]:
                                                                classroom?.schoolYear?.state ===
                                                                commonStatusSchoolyear.GOING_ON,
                                                        })}
                                                    >
                                                        <span className={styles.text}>
                                                            Năm học {classroom?.schoolYear?.name}:{" "}
                                                            {classroom?.name}
                                                        </span>
                                                        <span className={styles.tag}>
                                                            {classroom?.schoolYear?.state ===
                                                                commonStatusSchoolyear.NEXT &&
                                                                "Năm học tiếp theo"}
                                                            {classroom?.schoolYear?.state ===
                                                                commonStatusSchoolyear.GOING_ON &&
                                                                "Năm học hiện tại"}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <div className={styles.notice}>
                                            <ErrorCircleIcon />
                                            <div>
                                                Khi thêm mới học sinh tại đây, học sinh này{" "}
                                                <strong>chưa thuộc</strong> bất kỳ lớp học nào, bạn
                                                cần truy cập vào một lớp học và chọn học sinh này
                                                vào lớp.
                                            </div>
                                        </div>
                                    )
                                ) : (
                                    <></>
                                )}

                                {item.roleCode === ROLES_CODE.PARENT && (
                                    <>
                                        <Form.List name={[ branchField.name, "children" ]}>
                                            {(cFields, { add: addChild, remove: removeChild }) => {
                                                return cFields?.length > 0 ? (
                                                    cFields.map((cField, cIndex) => {
                                                        return (
                                                            <Fragment key={cField.key}>
                                                                <div className={styles.item}>
                                                                    <div
                                                                        className={
                                                                            styles.selectValue
                                                                        }
                                                                    >
                                                                        <Form.Item
                                                                            name={cField.name}
                                                                            rules={[
                                                                                {
                                                                                    required: true,
                                                                                    message:
                                                                                        "Học sinh không được để trống.",
                                                                                },
                                                                            ]}
                                                                        >
                                                                            <SelectLazy
                                                                                mappingData={(
                                                                                    data,
                                                                                ) =>
                                                                                    data?.map(
                                                                                        (item) => {
                                                                                            item.value =
                                                                                                item.id;
                                                                                            item.label = `${combineName(
                                                                                                item,
                                                                                            )} - ${item.phone}`;

                                                                                            return item;
                                                                                        },
                                                                                    )
                                                                                }
                                                                                filterOption={(
                                                                                    option,
                                                                                    value,
                                                                                ) =>
                                                                                    option.value ===
                                                                                        value ||
                                                                                    !curChildren?.includes(
                                                                                        option.value,
                                                                                    )
                                                                                }
                                                                                excludesId={[
                                                                                    query?.id,
                                                                                ]}
                                                                                fetcher={getUsers}
                                                                                fetcherFilter={{
                                                                                    roleId: roles?.find(
                                                                                        (role) =>
                                                                                            role.code ===
                                                                                            ROLES_CODE.STUDENT,
                                                                                    )?.id,
                                                                                    branchId,
                                                                                }}
                                                                                onChange={(
                                                                                    value,
                                                                                ) => {
                                                                                    handleChangeChild(
                                                                                        cIndex,
                                                                                        value,
                                                                                    );
                                                                                }}
                                                                                label="Là phụ huynh của học sinh"
                                                                            />
                                                                        </Form.Item>
                                                                    </div>
                                                                    {item?.children?.length > 1 && (
                                                                        <div
                                                                            className={
                                                                                styles.removeRow
                                                                            }
                                                                            onClick={() => {
                                                                                removeChild(cIndex);
                                                                            }}
                                                                        >
                                                                            <TrashIcon />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                {cIndex === cFields?.length - 1 && (
                                                                    <Button
                                                                        onClick={() => {
                                                                            addChild(null);
                                                                        }}
                                                                        className={styles.addButton}
                                                                        type="outline"
                                                                    >
                                                                        <div>+</div>
                                                                        <div>
                                                                            Thêm con của phụ huynh
                                                                        </div>
                                                                    </Button>
                                                                )}
                                                            </Fragment>
                                                        );
                                                    })
                                                ) : (
                                                    <Button
                                                        onClick={() => {
                                                            addChild(null);
                                                        }}
                                                        className={styles.addButton}
                                                        type="outline"
                                                    >
                                                        <div>+</div>
                                                        <div>Thêm con của phụ huynh</div>
                                                    </Button>
                                                );
                                            }}
                                        </Form.List>
                                    </>
                                )}
                                {index === branch?.roles?.length - 1 && (
                                    <>
                                        <div className={styles.item}>
                                            <AddButton
                                                onClick={() => {
                                                    add({ roleCode: null });
                                                }}
                                                label="Thêm vai trò"
                                            />
                                        </div>
                                        {!isCreate && (
                                            <div className={styles.footer}>
                                                <Button buttonType="submit">Lưu thay đổi</Button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </Fragment>
                    );
                });
            }}
        </Form.List>
    );
}

export default RoleListForm;
