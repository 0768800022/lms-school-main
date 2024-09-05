import { useRef } from "react";
import { useRouter } from "next/router";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { useForm } from "@/components/Common/Form";
import Switch from "@/components/Common/Switch";
import { useConfirmModal } from "@/components/layouts/AppWrapper/ConfirmModalWrapper";
import { commonStatus } from "@/constants/constant";
import PencilIcon from "@/public/icons/pencil.svg";
import TrashIcon from "@/public/icons/trash.svg";
import {
    renderDeleteFetcher,
    renderGetListFetcher,
    renderUpdateFetcher,
} from "@/services/api/common";

import { filterProps, overridableFunc } from "../utils";

import useQueryParams from "./useQueryParams";

const createActionButtons = (extraButtons) => ({
    edit: ({ onClick, ...props }) => ({
        label: `Chỉnh sửa`,
        icon: <PencilIcon />,
        onClick: (id) => onClick?.(id),
    }),
    delete: ({ onClick, ...props }) => ({
        label: `Xóa`,
        icon: <TrashIcon />,
        onClick: (id) => onClick?.(id),
    }),
    ...extraButtons,
});

const useListPage = ({
    apiConfig = {
        getList: {},
        delete: {},
        updateStatus: {},
    },
    options = {
        objectName: "",
        filter: undefined,
        setFilter: undefined,
        detailPath: "",
        size: 10,
        invalidateKeys: [],
        staleTime: null,
        form: null,
    },
    override = {
        prepareData: undefined,
        prepareGetListParams: undefined,
        handleDelete: undefined,
        handleClickEdit: undefined,
        prepareUpdateStatusPayload: undefined,
    },
} = {}) => {
    const paginationDefault = {
        current: 1,
        pageSize: options.size || 10,
        total: 0,
    };
    // const [ queryParams, setQueryParams ] = useQueryParams();
    const [ formInstance ] = useForm();
    const [ form ] = filterProps([ options.form, formInstance ]);
    const invalidateKeys = options.invalidateKeys || [];
    const { pathname } = useRouter();
    const [ query, pushQuery ] = useQueryParams();
    const [ filter, setFilter ] = filterProps(
        [ options.filter, query ],
        [ options.setFilter, pushQuery ],
    );
    const { confirm } = useConfirmModal();
    const pagination = useRef({ ...paginationDefault });
    pagination.current.current = Number(filter?.page || paginationDefault.current);
    pagination.current.pageSize = filter?.size || paginationDefault.pageSize;
    const prepareData = overridableFunc((response) => {
        return {
            data: response.data.content,
            total: response.data.totalElements,
        };
    }, override.prepareData);

    const prepareGetListParams = overridableFunc((filter) => {
        return {
            ...filter,
            page: filter.page ? filter.page - 1 : 0,
            size: filter.pageSize || options.size || 10,
        };
    }, override.prepareGetListParams);

    const handlePaging = (paging) => {
        setFilter({ ...filter, page: paging + 1 });
    };
    const queryKeyGetList = [ apiConfig.getList?.url, prepareGetListParams(filter) ];
    const {
        data,
        isFetching: isFetchingList,
        error,
        refetch: refetchList,
    } = useQuery({
        ...apiConfig.getList,
        queryKey: queryKeyGetList,
        queryFn: renderGetListFetcher(apiConfig.getList),
        select: prepareData,
        placeholderData: keepPreviousData,
        staleTime: options.staleTime == undefined ? Infinity : options.staleTime,
    });
    pagination.current.total = data?.total || 0;
    const { mutate: deleteMutate, isPending: isUpdatePending } = useMutation({
        ...(apiConfig.delete || {}),
        mutationKey: apiConfig.delete?.url,
        mutationFn: renderDeleteFetcher(apiConfig.delete),
        meta: {
            invalidates: [ ...queryKeyGetList, ...invalidateKeys ],
        },
    });

    const handleDelete = overridableFunc((id) => {
        deleteMutate(id, {
            onSuccess: () => {
                toast.success(`Xóa ${options.objectName} thành công!`);

                const isLastItem = data?.length === 1;
                if (isLastItem && pagination.current.current > 1) {
                    // setFilter((prev) => ({ ...prev, page: pagination.current.current - 1 }));
                    pagination.current.current = pagination.current.current - 1;
                } else {
                    refetchList();
                }
            },
            onError: (err) => {
                console.log(err);
                toast.error(`Xóa ${options.objectName} thất bại. Vui lòng thử lại!`);
            },
        });
    }, override.handleDelete);

    const handleClickDeleteColumn = ({ id }) => {
        if (!apiConfig.delete) throw new Error("apiConfig.delete is not defined");
        confirm({
            confirm: "Bạn có chắc chắn muốn thực hiện?",
            description: `Bạn đang thực hiện thao tác xóa ${options.objectName}. Sau khi xóa, dữ liệu này không thể
            khôi phục. Đồng thời, các nội dung đang sử dụng dữ liệu này có thể bị ảnh hưởng.`,
            title: `Xác nhận xóa ${options.objectName}`,
            onConfirm: () => {
                handleDelete(id);
            },
            onCancel: () => {},
        });
    };

    const handleClickEditColumn = overridableFunc(({ id }) => {}, override.handleClickEdit);
    const prepareUpdateStatusPayload = overridableFunc((item) => {
        return item;
    }, override.prepareUpdateStatusPayload);

    const { mutate: updateStatusMutate, isPending: isUpdateStatusPending } = useMutation({
        ...apiConfig.updateStatus,
        mutationKey: apiConfig.updateStatus?.url,
        mutationFn: renderUpdateFetcher(apiConfig.updateStatus),
        meta: {
            invalidates: [ ...queryKeyGetList, ...invalidateKeys ],
        },
    });

    const handleUpdateStatus = overridableFunc(({ id, status }) => {
        const isActive = status === commonStatus.ACTIVE;
        updateStatusMutate(prepareUpdateStatusPayload({ id, status }), {
            onSuccess: () => {
                toast.success(
                    `${isActive ? "Kích hoạt" : "Khóa"} ${options.objectName} thành công!`,
                );
            },
            onError: () => {
                toast.error(
                    `Cập nhật trạng thái ${options.objectName} thất bại. Vui lòng thử lại!`,
                );
            },
        });
    }, override.handleClickUpdateStatus);

    const handleClickUpdateStatusColumn = ({
        id,
        status,
        confirmTitle,
        confirmDescription,
        confirmText,
    }) => {
        if (!apiConfig.delete) throw new Error("apiConfig.updateStatus is not defined");

        confirm({
            title: confirmTitle || `Xác nhận cập nhật trạng thái ${options.objectName}`,
            description:
                confirmDescription ||
                `Bạn đang thực hiện thao tác tắt trạng thái sử dụng của ${options.objectName}. Các nội dung đang sử dụng dữ liệu này sẽ không còn khả dụng.`,
            confirm: confirmText || "Bạn có chắc chắn muốn thực hiện?",
            onConfirm: () => {
                handleUpdateStatus({ id, status });
            },
            onCancel: () => {},
        });
    };

    const renderActionColumn = ({
        actions = { edit: true, delete: true, updateStatus: false },
        extraActions = {},
        ...props
    }) => {
        const handleOnClick = {
            edit: handleClickEditColumn,
            delete: handleClickDeleteColumn,
            updateStatus: handleClickUpdateStatusColumn,
        };
        const buttons = createActionButtons(extraActions, options.objectName);
        const enabledActions = Object.entries(actions).filter(
            ([ key, value ]) => !!value && !!buttons[key],
        );
        const actionButtons = enabledActions.reduce((acc, [ action, value ], index) => {
            const props = typeof value === "object" ? value : {};
            acc.push(
                buttons[action]({
                    onClick: handleOnClick[action],
                    key: action,
                    ...props,
                }),
            );

            return acc;
        }, []);
        return actionButtons;

        // const actions =
    };

    const renderChangeStatusColumn = ({ confirmTitle, confirmDescription, confirmText } = {}) => {
        return {
            title: "Trạng thái",
            dataIndex: "status",
            align: "center",
            width: 150,
            render: (value, row) => (
                <span>
                    <Switch
                        onCheckedChange={(check) => {
                            handleClickUpdateStatusColumn({
                                id: row.id,
                                status: check ? commonStatus.ACTIVE : commonStatus.LOCK,
                                confirmTitle,
                                confirmDescription,
                                confirmText,
                            });
                        }}
                        checked={value === commonStatus.ACTIVE}
                    />
                </span>
            ),
        };
    };

    const handleSearch = (values) => {
        setFilter({ ...filter, ...values });
    };

    const handleResetSearch = () => {
        form.resetFields();
        setFilter({}, { mergePreviousParams: false });
    };
    return {
        loading: isFetchingList || isUpdatePending || isUpdateStatusPending,
        data: data?.data,
        refetchList,
        filter,
        pagination: pagination.current,
        error,
        handlePaging,
        deleteItem: deleteMutate,
        updateItem: updateStatusMutate,
        renderActionColumn,
        renderChangeStatusColumn,
        // renderActionColumn,
        // handleSearch,
        handleResetSearch,
        formSearchInstance: form,
        setFilter,
        queryKeyGetList,
    };
};

export default useListPage;
