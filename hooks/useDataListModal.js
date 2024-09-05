import { useState } from "react";

import { useAppLoading } from "@/components/Common/LoadingOverlay/LoadingOverlayProvider";
import { overridableFunc } from "@/utils";

import { useDisclosure } from "./useDisclosure";
import useListPage from "./useListPage";
import useSavePage from "./useSaveData";

function useDataListModal({
    apiConfig,
    options = {
        objectName: "",
        filter: undefined,
        setFilter: undefined,
        detailPath: "",
        size: 10,
        invalidateKeys: null,
        staleTime: null,
        form: null,
    },
    override = {
        prepareData: undefined,
        prepareGetListParams: undefined,
        handleDelete: undefined,
        handleClickEdit: undefined,
        prepareUpdateStatusPayload: undefined,
        prepareGetDetailDataParams: undefined,
        prepareDetailData: undefined,
        handleGetDetailFail: undefined,
        prepareCreatePayload: undefined,
        handleSaveSuccess: undefined,
        handleSaveError: undefined,
        handleCreate: undefined,
        prepareUpdatePayload: undefined,
        handleUpdate: undefined,
        handleCloseModal: undefined,
        handleOpenCreateModal: undefined,
        handleOpenEditModal: undefined,
    },
} = {}) {
    const [ openModal, handlerModal ] = useDisclosure(false);
    const { setAppLoading } = useAppLoading();
    const [ editItem, setEditItem ] = useState();
    const [ isSubmiting, setSubmit ] = useState();
    const [ isChangeValues, setChangeValue ] = useState(false);
    const title = `${editItem ? "Cập nhật" : "Thêm mới"} ${options.objectName}`;

    const handleCloseModal = overridableFunc(() => {
        handlerModal.close();
        setEditItem();
    }, override.handleCloseModal);

    const handleOpenCreateModal = overridableFunc(() => {
        setEditItem();
        handlerModal.open();
    }, override.handleOpenCreateModal);

    const onSubmit = overridableFunc((values, callback) => {
        setSubmit(true);
        handleSubmit(values, callback);
    }, override.onSubmit);

    const handleChangeValue = () => {
        setChangeValue(true);
    };

    const getFormId = () => {
        return `form-${options.objectName}`;
    };

    const handleOpenEditModal = overridableFunc((item) => {
        setEditItem(item);
        handlerModal.open();
    }, override.handleOpenEditModal);
    const prepareUpdatePayload = overridableFunc((values) => {
        return {
            ...values,
            id: editItem?.id,

        };
    }, override.prepareUpdatePayload);

    const {
        data,
        loading,
        pagination,
        handlePaging,
        renderActionColumn,
        handleSearch,
        handleResetSearch,
        refetchList,
        renderChangeStatusColumn,
        formSearchInstance,
        filter,
        setFilter,
        queryKeyGetList,
    } = useListPage({
        apiConfig,
        options: options,
        override: {
            prepareData: override.prepareData,
            prepareGetListParams: override.prepareGetListParams,
            handleDelete: override.handleDelete,
            handleClickEdit: handleOpenEditModal,
            prepareUpdateStatusPayload: override.prepareUpdateStatusPayload,
        },
    });

    const { handleSubmit, isGetDetailLoading, isSubmitLoading, submitType, dataDetail } =
        useSavePage({
            apiConfig,
            options: {
                isCreate: editItem ? false : true,
                editItem,
                refetchList,
                closeModal: handleCloseModal,
                queryKeyGetList,
                invalidateKeys: options.invalidateKeys,
                ...options,
            },
            override: {
                prepareGetDetailDataParams: override.prepareGetDetailDataParams,
                prepareUpdatePayload: prepareUpdatePayload,
                prepareDetailData: override.prepareDetailData,
                handleGetDetailFail: override.handleGetDetailFail,
                prepareCreatePayload: override.prepareCreatePayload,
                handleSaveSuccess: override.handleSaveSuccess,
                handleSaveError: override.handleSaveError,
                handleCreate: override.handleCreate,
                handleUpdate: override.handleUpdate,
            },
        });

    return {
        openModal,
        dataDetail,
        editItem,
        title,
        data,
        loading,
        pagination,
        handlePaging,
        handleSearch,
        handleResetSearch,
        isGetDetailLoading,
        isSubmitLoading,
        renderActionColumn,
        handleCloseModal,
        handleOpenEditModal,
        handleOpenCreateModal,
        onSubmit,
        getFormId,
        isChangeValues,
        handleChangeValue,
        isSubmiting,
        renderChangeStatusColumn,
        formSearchInstance,
        filter,
        setFilter,
        refetchList,
    };
}

export default useDataListModal;
