import React from "react";
import Excel from "exceljs";

import { genderName } from "@/constants/constant";
import DownloadIcon from "@/public/icons/download.svg";
import { combineName } from "@/utils/common";

import Button from "../../Button";
import Table from "../../Table";
import Modal from "../Modal";

import styles from "./ModalImportFail.module.scss";

const columnsDefine = [
    {
        title: "Mã người dùng",
        dataIndex: "code",
        render: (value) => <span>{value}</span>,
    },
    {
        title: "Họ và tên",
        dataIndex: "firstName",
        render: (_, row) => <span>{combineName(row)}</span>,
    },
    {
        title: "Số điện thoại",
        dataIndex: "phone",
        render: (value) => <span>{value}</span>,
    },
    {
        title: "Email",
        dataIndex: "email",
        render: (value) => <span>{value}</span>,
    },
    {
        title: "Ngày sinh",
        dataIndex: "birthday",
        render: (value) => <span>{value}</span>,
    },
    {
        title: "Giới tính",
        dataIndex: "gender",
        render: (value) => <span>{genderName[value]}</span>,
    },
    {
        title: "Chi tiết lỗi import",
        dataIndex: "errors",
        render: (value) => <span>{value}</span>,
    },
];

const data = [
    {
        code: "QT001",
        firstName: "Ngọc Nhi",
        lastName: "Nguyễn Hoàng",
        phone: "0123456789",
        email: "ngocnhi2002@gmail.com",
        birthday: "01/01/2002",
        gender: "FEMALE",
        errors: [],
    },
    {
        code: "QT001",
        firstName: "Ngọc Nhi",
        lastName: "Nguyễn Hoàng",
        phone: "0123456789",
        email: "ngocnhi2002@gmail.com",
        birthday: "01/01/2002",
        gender: "FEMALE",
        errors: [],
    },
    {
        code: "QT001",
        firstName: "Ngọc Nhi",
        lastName: "Nguyễn Hoàng",
        phone: "0123456789",
        email: "ngocnhi2002@gmail.com",
        birthday: "01/01/2002",
        gender: "FEMALE",
        errors: [],
    },
    {
        code: "QT001",
        firstName: "Ngọc Nhi",
        lastName: "Nguyễn Hoàng",
        phone: "0123456789",
        email: "ngocnhi2002@gmail.com",
        birthday: "01/01/2002",
        gender: "FEMALE",
        errors: [],
    },
    {
        code: "QT001",
        firstName: "Ngọc Nhi",
        lastName: "Nguyễn Hoàng",
        phone: "0123456789",
        email: "ngocnhi2002@gmail.com",
        birthday: "01/01/2002",
        gender: "FEMALE",
        errors: [],
    },
    {
        code: "QT001",
        firstName: "Ngọc Nhi",
        lastName: "Nguyễn Hoàng",
        phone: "0123456789",
        email: "ngocnhi2002@gmail.com",
        birthday: "01/01/2002",
        gender: "FEMALE",
        errors: [],
    },
    {
        code: "QT001",
        firstName: "Ngọc Nhi",
        lastName: "Nguyễn Hoàng",
        phone: "0123456789",
        email: "ngocnhi2002@gmail.com",
        birthday: "01/01/2002",
        gender: "FEMALE",
        errors: [],
    },
    {
        code: "QT001",
        firstName: "Ngọc Nhi",
        lastName: "Nguyễn Hoàng",
        phone: "0123456789",
        email: "ngocnhi2002@gmail.com",
        birthday: "01/01/2002",
        gender: "FEMALE",
        errors: [],
    },
    {
        code: "QT001",
        firstName: "Ngọc Nhi",
        lastName: "Nguyễn Hoàng",
        phone: "0123456789",
        email: "ngocnhi2002@gmail.com",
        birthday: "01/01/2002",
        gender: "FEMALE",
        errors: [],
    },
    {
        code: "QT001",
        firstName: "Ngọc Nhi",
        lastName: "Nguyễn Hoàng",
        phone: "0123456789",
        email: "ngocnhi2002@gmail.com",
        birthday: "01/01/2002",
        gender: "FEMALE",
        errors: [],
    },
];

function ModalImportFail({ trigger, open, onOpenChange }) {
    const exportFailResult = async () => {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet("Sheet1");
        const tableObj = cellArrayObjectFail;
        const columns = [];
        const lenColumns = tableObj.length;
        for (let i = 0; i < lenColumns; i++) {
            const itemCell = tableObj[i];
            columns.push({ header: itemCell.display, key: itemCell.key, width: 30 });
            const cell = worksheet.getCell(`${itemCell.code}1`);
            cell.fill = {
                type: "pattern",
                bgColor: {
                    argb: "6AA84F",
                },
                pattern: "solid",
                fgColor: { argb: "6AA84F" },
            };
            cell.font = {
                size: 11,
                bold: true,
                color: { argb: "FFFFFF" },
            };
            cell.alignment = {
                vertical: "middle",
                horizontal: "center",
                wrapText: true,
            };
            cell.border = {
                top: { style: "thin", color: { argb: "79C440" } },
                left: { style: "thin", color: { argb: "79C440" } },
                bottom: { style: "thin", color: { argb: "79C440" } },
                right: { style: "thin", color: { argb: "79C440" } },
            };
        }
        worksheet.columns = columns;
        worksheet.getColumn(tableObj.length).style.alignment = {
            wrapText: true,
        };
        worksheet.getColumn(tableObj.length).style.font = {
            size: 11,
        };
        for (let i = 0; i < data.length; i++) {
            const itemResult = data[i];
            worksheet.addRow(itemResult);
        }
        const buffer = await workbook.xlsx.writeBuffer();
        const url = URL.createObjectURL(
            new Blob([ buffer ], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            }),
        );
        const link = document.createElement("a");
        link.setAttribute("download", "Import_list_fail.xlsx");
        link.href = url;
        link.click();
    };

    return (
        <Modal
            onOpenChange={onOpenChange}
            open={open}
            trigger={trigger && <Modal.Trigger>{trigger}</Modal.Trigger>}
        >
            <div className={styles.wrapper}>
                <div className={styles.title}>Danh sách các lỗi ở file tải lên</div>
                <div className={styles.table}>
                    <Table data={data} columns={columnsDefine} />
                </div>
                <div className={styles.footer}>
                    <div className={styles.info}>Tải dữ liệu từ Excel thất bại (3/12)</div>
                    <div className={styles.actions}>
                        <div className={styles.download} onClick={exportFailResult}>
                            <DownloadIcon /> Tải xuống danh sách lỗi
                        </div>
                        <Button type="outline">Đóng</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ModalImportFail;

const cellArrayObjectFail = [
    { code: "A", key: "code", display: "Mã người dùng" },
    { code: "B", key: "lastName", display: "Họ và tên đệm" },
    { code: "C", key: "firstName", display: "Tên" },
    { code: "D", key: "phone", display: "Số điện thoại" },
    { code: "E", key: "email", display: "Email" },
    { code: "F", key: "birthday", display: "Ngày sinh" },
    { code: "G", key: "gender", display: "Giới tính" },
    { code: "H", key: "errors", display: "Chi tiết lỗi import" },
];
