import { useEffect, useState } from "react";
import { toast } from "sonner";
import dayjs from "dayjs";
import 'dayjs/locale/vi';

// dayjs.locale('vi');

// import localizedFormat from "dayjs/plugin/localizedFormat";
// import localizedFormat from "dayjs-plugin-localized-format";

import { Form } from "@/components/Common/Form";
import { InputField } from "@/components/Common/Input";
import ResetButton from "@/components/Common/ResetButton";
import { SelectField } from "@/components/Common/Select";
import { errorCodes } from "@/constants/errorCode";
import useAddress from "@/hooks/useAddress";
import useArea from "@/hooks/useArea";
import useDataListModal from "@/hooks/useDataListModal";
import { useDebounce } from "@/hooks/useDebounce";
import useQueryParams from "@/hooks/useQueryParams";
import apiConfig from "@/services/api/config";

import ListPageModal from "../../ListPageModal/ListPageModal";

import HolidayForm from "./HolidayForm";

import styles from "./ManageHoliday.module.scss";
import useBranch from "@/hooks/useBranch";

function ManageHoliday() {
    const moduleConfig = {
        apiConfig: apiConfig.holidays,
        objectName: "ngày nghỉ lễ",
    };

    const { branches, defaultBranch } = useBranch();

    const [filter, setFilter] = useQueryParams({
        search: "string",
    });

    const {
        openModal,
        data,
        loading,
        title,
        dataDetail,
        isGetDetailLoading,
        isSubmitLoading,
        handleOpenCreateModal,
        handleCloseModal,
        handleChangeValue,
        onSubmit,
        getFormId,
        handleOpenEditModal,
        isChangeValues,
        renderActionColumn,
        renderChangeStatusColumn,
        pagination,
        handlePaging,
        formSearchInstance,
        handleResetSearch,
        editItem,
    } = useDataListModal({
        apiConfig: moduleConfig.apiConfig,
        options: {
            objectName: moduleConfig.objectName,
            invalidateKeys: [apiConfig.holidays.autocomplete.url],
            filter,
            setFilter,
        },
        override: {
            handleSaveError: (error) => {
                const branchId = error.response?.data?.branchId;
                if (branchId === errorCodes.HOLIDAY_OVERLAP.branchId) return;

                toast.error("Có lỗi xảy ra! Vui lòng thử lại.");
            },
            prepareGetListParams: (params) => {
                return {
                    ...params,
                    branchId: params.branchId || defaultBranch,
                };
            },
        },
    });

    const { provinces, districts, wards, changeProvince, changeDistrict, isAddressLoading } =
        useArea();

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const formatDateRange = (startDate, endDate) => {
        const startDay = capitalizeFirstLetter(dayjs(startDate).locale('vi').format('dddd [ngày] DD/MM/YYYY'));
        const endDay = capitalizeFirstLetter(dayjs(endDate).locale('vi').format('dddd [ngày] DD/MM/YYYY'));
        // const startDay = capitalizeFirstLetter(dayjs(startDate).format('dddd [ngày] DD/MM/YYYY'));
        // const endDay = capitalizeFirstLetter(dayjs(endDate).format('dddd [ngày] DD/MM/YYYY'));
        // const startDay = capitalizeFirstLetter(dayjs(startDate).format('dddd [ngày] DD/MM/YYYY'));
        // const endDay = capitalizeFirstLetter(dayjs(endDate).format('dddd [ngày] DD/MM/YYYY'));

        return `${startDay} - ${endDay}`;
    };

    const [search, setSearch] = useState(filter?.search);
    const searchDebounce = useDebounce(search);
    const { getAddressObject } = useAddress(data);

    useEffect(() => {
        if (searchDebounce === undefined) return;

        setFilter({
            search: searchDebounce,
        });
    }, [searchDebounce]);

    useEffect(() => {
        if (search !== undefined)
            setFilter({
                page: 1,
            });
    }, [search]);

    const columns = [
        {
            title: "Tên ngày lễ",
            dataIndex: "name",
            width: "200px",
            render: (value) => (
                <span title={value} className="title-line-clamp">
                    {value}
                </span>
            ),
        },
        {
            title: "Thời gian nghỉ lễ",
            dataIndex: ["startDate", "endDate"],
            width: "300px",
            render: (_, record) => (
                <span title={formatDateRange(record.startDate, record.endDate)} className="title-line-clamp">
                    {formatDateRange(record.startDate, record.endDate)}
                </span>
            ),
        },
        {
            title: "Vị trí",
            dataIndex: "priority",
            width: "200px",
            render: (value) => (
                <span title={value} className="title-line-clamp">
                    {value}
                </span>
            ),
        },
    ];

    useEffect(() => {
        formSearchInstance.setFieldsValue({
            search: filter.search,
            branchId: Number(filter.branchId) || null,
        });
        if (filter.branchId) changeBranch(filter.branchId);
    }, []);

    return (
        <ListPageModal
            columns={columns}
            data={data}
            loading={loading}
            openModal={openModal}
            title={title}
            handleOpenCreateModal={handleOpenCreateModal}
            handleCloseModal={handleCloseModal}
            onSubmit={onSubmit}
            formId={getFormId()}
            objectName={moduleConfig.objectName}
            handleOpenEditModal={handleOpenEditModal}
            dataDetail={dataDetail}
            isGetDetailLoading={isGetDetailLoading}
            isSubmitLoading={isSubmitLoading}
            isChangeValues={isChangeValues}
            pagination={pagination}
            handlePaging={handlePaging}
            renderActionColumn={renderActionColumn({ actions: { delete: false, edit: true } })}
            isEdit={!!editItem}
        >
            <ListPageModal.SearchForm>
                <Form
                    className={styles.filter}
                    form={formSearchInstance}
                    initialValues={{
                        search: null,
                        branchId: null,
                    }}
                    onSubmit={(values) => setFilter(values)}
                >
                    <SelectField
                        name="branchId"
                        onChange={(value) => setFilter({ branchId: value, page: 1 })}
                        placeholder="Chi nhánh"
                        options={branches}
                        fieldProps={{
                            style: {
                                width: 230,
                            },
                        }}
                    />
                    <div className={styles.reset}>
                        <ResetButton
                            onClick={() => {
                                handleResetSearch();
                            }}
                        />
                    </div>
                </Form>
            </ListPageModal.SearchForm>
            <ListPageModal.Modal>
                <HolidayForm
                    {...{ dataDetail, handleChangeValue, branches, setFilter }}
                />
            </ListPageModal.Modal>
        </ListPageModal>
    );
}

export default ManageHoliday;
