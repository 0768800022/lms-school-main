import React, { Children } from "react";
import classnames from "classnames";

import Button from "@/components/Common/Button";
import Container from "@/components/Common/Container";
import FormModal from "@/components/Common/Modal/FormModal";
import Pagination from "@/components/Common/Pagination";
import Table from "@/components/Common/Table";
import useListPage from "@/hooks/useListPage";
import PencilIcon from "@/public/icons/pencil.svg";
import TrashIcon from "@/public/icons/trash.svg";

import styles from "./ListPageModal.module.scss";

const ListPageModal = ({
    breadcrumbs = [],
    title = "",
    className,
    columns = [],
    objectName,
    children,
    data,
    loading,
    openModal,
    handleOpenCreateModal,
    handleCloseModal,
    onSubmit,
    formId,
    handleOpenEditModal,
    isGetDetailLoading,
    isSubmitLoading,
    isChangeValues,
    renderActionColumn,
    handlePaging,
    pagination,
    top = true,
    classNameTable,
    classNameRow,
    onClickTableCell,
    isEdit,
}) => {
    let SearchForm = null;
    let Modal = null;
    Children.forEach(children, (child) => {
        if (child.type === ListPageModal.SearchForm) SearchForm = child;
        if (child.type === ListPageModal.Modal) Modal = child;
    });

    return (
        <div className={classnames(styles.wrapper, className)}>
            <Container>
                {top && (
                    <div className={styles.top}>
                        <div className={styles.title}>Quản lý {objectName}</div>
                        <div className={styles.action}>
                            <Button onClick={handleOpenCreateModal}>+ Thêm mới</Button>
                        </div>
                    </div>
                )}

                {SearchForm}
                <Table
                    className={classnames(styles.table, classNameTable)}
                    classNameRow={classNameRow}
                    data={data}
                    columns={columns}
                    isLoading={loading || isGetDetailLoading}
                    actions={renderActionColumn}
                    onClickTableCell={onClickTableCell}
                />
                <Pagination
                    className={styles.pagination}
                    onChange={handlePaging}
                    total={pagination?.total}
                    current={pagination?.current - 1}
                    size={pagination?.size}
                />
                {!!Modal && React.cloneElement(Modal, {
                    open: openModal,
                    title,
                    onClose: handleCloseModal,
                    onSubmit,
                    formId,
                    loading: isSubmitLoading || isGetDetailLoading,
                    isChangeValues,
                    isEdit,
                })}
            </Container>
        </div>
    );
};

function SearchForm({ children }) {
    return children;
}

ListPageModal.SearchForm = SearchForm;
ListPageModal.Modal = FormModal;

export default ListPageModal;
