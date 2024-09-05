import React, { useEffect, useRef } from "react";
import dayjs from "dayjs";
import { toast } from "sonner";

import Button from "@/components/Common/Button";
import Container from "@/components/Common/Container";
import DatePicker from "@/components/Common/DatePicker";
import { Form, useForm } from "@/components/Common/Form";
import { InputField } from "@/components/Common/Input";
import ModalChangePassword from "@/components/Common/Modal/ModalChangePassword";
import { SelectField } from "@/components/Common/Select";
import { YEAR_DATE_FORMAT } from "@/constants/constant";
import useArea from "@/hooks/useArea";
import useAuth from "@/hooks/useAuth";
import ChangePasswordIcon from "@/public/icons/change-password.svg";
import DotIcon from "@/public/icons/dot.svg";
import ChangeAvatarIcon from "@/public/icons/gallery-edit.svg";
import { updateAvatar, updateProfile } from "@/services/api/account";
import { cleanObject } from "@/utils";
import { trimSpaceName } from "@/utils/common";

import styles from "./Profile.module.scss";

function Profile() {
    const { user, refetch, activeRole } = useAuth();

    const fileAvatar = useRef(null);
    const imgRef = useRef(null);

    const [ form ] = useForm();
    const { provinces, districts, wards, changeProvince, changeDistrict } = useArea();

    const handleSubmit = async (values) => {
        const resUpdate = await updateProfile({
            data: cleanObject({
                ...values,
                firstName: trimSpaceName(values?.firstName),
                lastName: trimSpaceName(values?.lastName),
                birthday: values.birthday ? dayjs(values.birthday).format(YEAR_DATE_FORMAT) : null,
            }),
        });

        if (!resUpdate.result) {
            //
        }

        toast.success("Cập nhật thông tin thành công");
    };

    const onChangeAvatar = async () => {
        const file = fileAvatar.current.files[0];
        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            toast.error(
                "Ảnh đại diện cần có dung lượng ≤ 2MB và thuộc một trong các định dạng: .jpg, .jpeg, .png",
            );
            return;
        }
        const fileSizeLimit = 2 * 1024 * 1024;
        const allowedTypes = [ "image/jpeg", "image/jpg", "image/png" ];
        if (file.size > fileSizeLimit) {
            toast.error(
                "Ảnh đại diện cần có dung lượng ≤ 2MB và thuộc một trong các định dạng: .jpg, .jpeg, .png",
            );
            return;
        }
        if (!allowedTypes.includes(file.type)) {
            toast.error(
                "Ảnh đại diện cần có dung lượng ≤ 2MB và thuộc một trong các định dạng: .jpg, .jpeg, .png",
            );
            return;
        }

        const formData = new FormData();
        formData.append("file ", file);
        const json = await updateAvatar({ data: formData });

        if (!json.result) throw Error(json.message);
        imgRef?.current?.setAttribute("src", URL.createObjectURL(file));
        refetch();
    };

    useEffect(() => {
        if (user) {
            form.setFieldsValue(
                {
                    ...user,
                    birthday: user?.birthday ? dayjs(user?.birthday) : null,
                },
                false,
            );

            if (user?.provinceId) {
                changeProvince(user.provinceId);

                if (user?.districtId) {
                    changeDistrict(user.districtId);
                }
            }
        }
    }, [ user ]);

    return (
        <div className={styles.wrapper}>
            <Container className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.title}>Thông tin người dùng</div>
                    <input
                        hidden
                        ref={fileAvatar}
                        type="file"
                        accept=".png,.jpeg,.jpg"
                        onChange={onChangeAvatar}
                    />
                    <div
                        className={styles.avatar}
                        onClick={() => {
                            fileAvatar?.current && fileAvatar?.current.click();
                        }}
                    >
                        <img
                            ref={imgRef}
                            alt="avatar"
                            src={user?.avatar ? user?.avatar : "/images/layout/logo.png"}
                            // style={{
                            //     objectFit: user?.avatar ? "cover" : "contain",
                            // }}
                        />
                        <ChangeAvatarIcon />
                    </div>
                    <Form
                        className={styles.form}
                        form={form}
                        initialValues={{
                            code: "",
                            lastName: "",
                            firstName: "",
                            phone: "",
                            email: "",
                            provinceId: null,
                            districtId: null,
                            wardId: null,
                            address: "",
                            birthday: "",
                        }}
                        onFinish={handleSubmit}
                    >
                        <InputField name="code" disabled label="Mã người dùng" />
                        <div className={styles.role}>{activeRole?.name}</div>
                        <InputField name="lastName" label="Họ và tên đệm" />
                        <InputField name="firstName" label="Tên" />
                        <InputField
                            name="phone"
                            type="number"
                            disabled={Boolean(user?.phone)}
                            label="Số điện thoại"
                        />
                        <InputField name="email" disabled={Boolean(user?.email)} label="Email" />

                        <div className={styles.group}>
                            <Form.Item name="birthday">
                                <DatePicker
                                    placeholder="Ngày sinh"
                                    picker="date"
                                    getPopupContainer={() => null}
                                    allowClear
                                    className={styles.birthday}
                                    dropdownClassName={styles.dropdownPicker}
                                />
                            </Form.Item>
                            <SelectField
                                name="gender"
                                label="Giới tính"
                                options={[
                                    { label: "Nam", value: "MALE" },
                                    { label: "Nữ", value: "FEMALE" },
                                ]}
                            />
                        </div>
                        <div className={styles.password}>
                            <div className={styles.left}>
                                <div className={styles.label}>Mật khẩu</div>
                                <div className={styles.dotPassword}>
                                    <DotIcon />
                                    <DotIcon />
                                    <DotIcon />
                                    <DotIcon />
                                    <DotIcon />
                                    <DotIcon />
                                    <DotIcon />
                                    <DotIcon />
                                    <DotIcon />
                                </div>
                            </div>
                            <ModalChangePassword
                                // open={openModalChangePassword}
                                trigger={
                                    <div className={styles.changePassword}>
                                        <ChangePasswordIcon />
                                    </div>
                                }
                                // onOpenChange={() => setOpenModalChangePassword(false)}
                            />
                        </div>
                        <InputField name="address" label="Số nhà, tên đường" />
                        <SelectField
                            name="provinceId"
                            label="Tỉnh/ thành phố"
                            options={provinces}
                            onChange={(value) => {
                                changeProvince(value);
                                form.setFieldValue("districtId", null);
                                form.setFieldValue("wardId", null);
                            }}
                        />
                        <SelectField
                            name="districtId"
                            label="Quận/ huyện"
                            options={districts}
                            onChange={(value) => {
                                changeDistrict(value);
                                form.setFieldValue("wardId", null);
                            }}
                        />
                        <SelectField name="wardId" label="Phường/ xã" options={wards} />
                        <Button buttonType="submit">Cập nhật</Button>
                    </Form>
                </div>
            </Container>
        </div>
    );
}

export default Profile;
