import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";

import AddButton from "@/components/Common/AddButton";
import Button from "@/components/Common/Button";
import Container from "@/components/Common/Container";
import { useConfirmModal } from "@/components/layouts/AppWrapper/ConfirmModalWrapper";
import useArea from "@/hooks/useArea";
import useBranch from "@/hooks/useBranch";
import { unAssignBranchRole } from "@/services/api/user";
import { handleCatchError } from "@/utils/common";

import BasicInfoForm from "./BasicInfoForm";
import BranchForm from "./BranchForm";

import styles from "./CreateUser.module.scss";

function CreateUser({ userData }) {
    const { back } = useRouter();
    const isCreate = !userData;
    const { confirm } = useConfirmModal();
    const [ dataBranchRoles, setDataBranchRoles ] = useState([]);
    const { branches } = useBranch();
    const { provinces, districts, wards, changeProvince, changeDistrict } = useArea();

    useEffect(() => {
        if (!isCreate) {
            const newData = userData?.branchRoles?.map((item, index) => {
                const newRoles = item.userRoles.map((userRole) => ({
                    branchRoleId: userRole.assignmentId,
                    roleCode: userRole?.role?.code,
                    subjects: userRole?.teacherSubjects?.length
                        ? userRole?.teacherSubjects?.map((sub) => sub.id)
                        : [ null ],
                    subjectClassrooms: userRole?.teacherSubjects,
                    children: userRole?.children?.length
                        ? userRole?.children?.map((child) => child.id)
                        : [ null ],
                    classrooms: userRole?.classrooms,
                }));

                return {
                    branchRoleId: ++index,
                    branchId: item.branchId,
                    roles: newRoles,
                };
            });

            if (newData?.length > 0) {
                setDataBranchRoles(newData);
            } else {
                setDataBranchRoles([ { branchId: null, roles: [ { roleCode: null } ] } ]);
            }
        }
    }, []);

    const handleAddBranch = () => {
        setDataBranchRoles([
            ...dataBranchRoles,
            {
                branchId: branches?.filter(
                    (option) =>
                        !dataBranchRoles.map((dItem) => dItem.branchId).includes(option?.value),
                )?.[0]?.code,
                roles: [ { roleCode: null } ],
            },
        ]);
    };

    const handleRemoveBranch = (pos) => {
        if (dataBranchRoles[pos]?.branchRoleId) {
            confirm({
                confirm: "Bạn có chắc chắn muốn thực hiện?",
                description: `Bạn đang thực hiện thao tác xóa toàn bộ vai trò tại chi nhánh ${
                    branches?.find((bItem) => bItem.id === dataBranchRoles[pos].branchId)?.name
                }. Sau khi xóa, dữ liệu này không thể
                khôi phục. Đồng thời, các nội dung đang sử dụng dữ liệu này có thể bị ảnh hưởng.`,
                title: `Xác nhận xóa toàn bộ Vai trò`,
                onConfirm: async () => {
                    try {
                        const res = await unAssignBranchRole({
                            data: {
                                branchId: dataBranchRoles[pos]?.branchId,
                                userId: userData?.id,
                            },
                        });
                        if (res?.result) {
                            toast?.success("Xóa vai trò thành công");
                            setDataBranchRoles([
                                ...dataBranchRoles.filter((_, index) => index !== pos),
                            ]);
                        } else {
                            handleCatchError(res?.data);
                        }
                    } catch (err) {
                        handleCatchError(err?.response?.data);
                    }
                },
                onCancel: () => {},
            });
        } else {
            setDataBranchRoles([ ...dataBranchRoles.filter((_, index) => index !== pos) ]);
        }
    };

    const handleChangeBranch = (pos, newValue) => {
        dataBranchRoles.splice(pos, 1, { branchId: newValue, roles: [ { roleCode: null } ] });
        setDataBranchRoles([ ...dataBranchRoles ]);
    };

    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.title}>
                    {userData ? "Cập nhật thông tin người dùng" : "Thêm mới người dùng"}
                </div>
                <div className={styles.form}>
                    <BasicInfoForm
                        userData={userData}
                        isCreate={isCreate}
                        provinces={provinces}
                        districts={districts}
                        wards={wards}
                        changeProvince={changeProvince}
                        changeDistrict={changeDistrict}
                    />
                    {!isCreate && (
                        <div className={styles.userRole}>
                            <div className={styles.description}>Vai trò người dùng</div>
                            {dataBranchRoles?.map((_, bIndex) => (
                                <BranchForm
                                    key={bIndex}
                                    bIndex={bIndex}
                                    isCreate={isCreate}
                                    dataBranchRoles={dataBranchRoles}
                                    setDataBranchRoles={setDataBranchRoles}
                                    handleRemoveBranch={handleRemoveBranch}
                                    handleChangeBranch={handleChangeBranch}
                                />
                            ))}
                            {dataBranchRoles?.length < branches?.length && (
                                <AddButton
                                    onClick={handleAddBranch}
                                    label="Thêm vai trò tại chi nhánh khác"
                                />
                            )}
                        </div>
                    )}
                    <div className={styles.actions}>
                        <Button type="outline" onClick={() => back()}>
                            Hủy
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default CreateUser;
