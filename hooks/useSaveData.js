import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAppLoading } from "@/components/Common/LoadingOverlay/LoadingOverlayProvider";
import {
    renderCreateFetcher,
    renderGetDetailFetcher,
    renderUpdateFetcher,
} from "@/services/api/common";

import { overridableFunc } from "../utils";

const useSavePage = ({
    apiConfig = {
        getDetail: undefined,
        create: undefined,
        update: undefined,
    },
    options = {
        objectName: "",
        getListPath: "",
        isCreate: false,
        getSaveFailedMsg: undefined,
        id: undefined,
        editItem: undefined,
        refetchList: undefined,
        closeModal: undefined,
        queryKeyGetList: "",
        invalidateKeys: [],
    },
    override = {
        prepareGetDetailDataParams: undefined,
        prepareDetailData: undefined,
        handleGetDetailFail: undefined,
        prepareCreatePayload: undefined,
        handleSaveSuccess: undefined,
        handleSaveError: undefined,
        handleCreate: undefined,
        prepareUpdatePayload: undefined,
        handleUpdate: undefined,
    },
}) => {
    const submitType = options.isCreate ? "Thêm mới" : "Cập nhật";
    const { setAppLoading } = useAppLoading();
    const invalidateKeys = options.invalidateKeys || [];
    const prepareDetailData = overridableFunc((res) => {
        return res.data;
    }, override.prepareDetailData);
    const handleGetDetailFail = overridableFunc((error) => {
        console.log(error);
        toast.error(`Lấy dữ liệu thất bại. Vui lòng thử lại!`);
    }, override.handleGetDetailFail);

    const prepareGetDetailDataParams = overridableFunc(() => {
        return { id: options.id ? options.id : options.editItem ? options.editItem.id : undefined };
    }, override.prepareGetDetailDataParams);

    const {
        data,
        refetch: refetchDetail,
        isFetching,
    } = useQuery({
        ...apiConfig.getDetail,
        queryKey: [ ...([ apiConfig.getDetail?.url ] || []), prepareGetDetailDataParams() ],
        queryFn: renderGetDetailFetcher(apiConfig.getDetail),
        select: prepareDetailData,
        enabled: Boolean(options.id) || Boolean(options.editItem?.id),
        meta: {
            onError: (err) => {
                handleGetDetailFail(err);
            },
        },
    });

    const { mutate: createMutate, isPending: isPendingCreate } = useMutation({
        ...(apiConfig.create || {}),
        mutationKey: apiConfig.create?.url,
        mutationFn: renderCreateFetcher(apiConfig.create),
        meta: {
            invalidates: [ ...options.queryKeyGetList, invalidateKeys ],
        },
    });

    const prepareCreatePayload = overridableFunc((values) => {
        return values;
    }, override.prepareCreatePayload);

    const handleSaveSuccess = overridableFunc((res) => {
        toast.success(`${submitType} ${options.objectName} thành công!`);
        options.closeModal?.();
    }, override.handleSaveSuccess);

    const handleSaveError = overridableFunc((error) => {
        const errMsg = options.getSaveFailedMsg
            ? options.getSaveFailedMsg(error)
            : error?.message || `${submitType} ${options.objectName} thất bại. Vui lòng thử lại!`;
        toast.error(errMsg);
    }, override.handleSaveError);

    const handleCreate = overridableFunc((values, callback) => {
        createMutate(prepareCreatePayload(values), {
            onSuccess: handleSaveSuccess,
            onError: (err) => {
                callback?.(err);
                handleSaveError(err);
            },
        });
    }, override.handleCreate);

    const { mutate: updateMutate, isPending: isPendingUpdate } = useMutation({
        ...(apiConfig.update || {}),
        mutationKey: apiConfig.update?.url,
        mutationFn: renderUpdateFetcher(apiConfig.update),
        meta: {
            invalidates: [ ...options.queryKeyGetList, invalidateKeys ],
        },
    });

    const prepareUpdatePayload = overridableFunc((values) => {
        return values;
    }, override.prepareUpdatePayload);

    const handleUpdate = overridableFunc((values, callback) => {
        updateMutate(prepareUpdatePayload(values), {
            onSuccess: handleSaveSuccess,
            onError: (err) => {
                callback?.(err);
                handleSaveError(err);
            },
        });
    }, override.handleUpdate);

    const handleSubmit = (values, callback) => {
        if (options.isCreate) {
            handleCreate(values, callback);
        } else {
            handleUpdate({ ...values, id: options.id }, callback);
        }
    };

    useEffect(() => {
        setAppLoading(isFetching || isPendingCreate || isPendingUpdate);
    }, [ isFetching, isPendingCreate, isPendingUpdate ]);

    return {
        dataDetail: isFetching ? undefined : data,
        isGetDetailLoading: isFetching,
        isSubmitLoading: isPendingCreate || isPendingUpdate,
        submitType,
        getDetail: refetchDetail,
        handleCreate,
        create: createMutate,
        handleUpdate,
        update: updateMutate,
        handleSubmit,
    };
};

export default useSavePage;
