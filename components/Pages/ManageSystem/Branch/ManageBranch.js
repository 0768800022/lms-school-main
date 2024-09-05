import { useEffect, useState } from "react";
import { toast } from "sonner";

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

import BranchForm from "./BranchForm";

import styles from "./ManageBranch.module.scss";

function ManageBranch() {
    const moduleConfig = {
        apiConfig: apiConfig.branch,
        objectName: "chi nhánh",
    };

    const [ filter, setFilter ] = useQueryParams({
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
            invalidateKeys: [ apiConfig.branch.autocomplete.url ],
            filter,
            setFilter,
        },
        override: {
            handleSaveError: (error) => {
                const code = error.response?.data?.code;
                if (code === errorCodes.BRANCH_IS_EXISTED.code) return;

                toast.error("Có lỗi xảy ra! Vui lòng thử lại.");
            },
        },
    });
    const { provinces, districts, wards, changeProvince, changeDistrict, isAddressLoading } =
        useArea();
    const [ search, setSearch ] = useState(filter?.search);
    const searchDebounce = useDebounce(search);
    const { getAddressObject } = useAddress(data);
    useEffect(() => {
        if (searchDebounce == undefined) return;

        setFilter({
            search: searchDebounce,
        });
    }, [ searchDebounce ]);

    useEffect(() => {
        if (search !== undefined)
            setFilter({
                page: 1,
            });
    }, [ search ]);

    const columns = [
        {
            title: "Mã chi nhánh",
            dataIndex: "code",
            width: "200px",
            render: (value) => (
                <span title={value} className="title-line-clamp">
                    {value}
                </span>
            ),
        },
        {
            title: "Tên chi nhánh",
            dataIndex: "name",
            width: "200px",
            render: (value) => (
                <span title={value} className="title-line-clamp">
                    {value}
                </span>
            ),
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            render: (value) => <span>{value}</span>,
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            render: (value, _row) => {
                const location = getAddressObject(_row);
                const address = `${location?.ward.name}, ${location?.district.name}, ${location?.province.name}`;

                return (
                    <span className="title-line-clamp" title={address}>
                        {address}
                    </span>
                );
            },
        },
        renderChangeStatusColumn(),
    ];

    useEffect(() => {
        formSearchInstance.setFieldsValue({
            search: filter.search,
            provinceId: Number(filter.provinceId) || null,
            wardId: Number(filter.wardId) || null,
            districtId: Number(filter.districtId) || null,
        });
        if (filter.provinceId) changeProvince(filter.provinceId);
        if (filter.districtId) changeDistrict(filter.districtId);
    }, []);

    return (
        <ListPageModal
            columns={columns}
            data={data}
            loading={loading || isAddressLoading}
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
                        provinceId: null,
                        districtId: null,
                        wardId: null,
                    }}
                    onSubmit={(values) => setFilter(values)}
                >
                    <InputField
                        className={styles.filterSearch}
                        name="search"
                        placeholder="Tìm kiếm theo tên chi nhánh/số điện thoại"
                        onChange={(e) => setSearch(e?.target?.value)}
                        type="search"
                    />
                    <SelectField
                        name="provinceId"
                        onChange={(provinceId) => {
                            setFilter({ provinceId, districtId: null, wardId: null, page: 1 });
                            changeProvince(provinceId);
                            formSearchInstance.setFieldValue("districtId", null);
                            formSearchInstance.setFieldValue("wardId", null);
                        }}
                        placeholder="Tỉnh/thành phố"
                        options={provinces}
                        fieldProps={{
                            style: {
                                width: 230,
                            },
                        }}
                    />
                    <SelectField
                        name="districtId"
                        onChange={(districtId) => {
                            setFilter({ districtId, wardId: null, page: 1 });
                            formSearchInstance.setFieldValue("wardId", null);
                            changeDistrict(districtId);
                        }}
                        placeholder="Quận/huyện"
                        options={districts}
                        fieldProps={{
                            style: {
                                width: 230,
                            },
                        }}
                    />
                    <SelectField
                        name="wardId"
                        onChange={(value) => setFilter({ wardId: value, page: 1 })}
                        placeholder="Phường/xã"
                        options={wards}
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
                                changeProvince([]);
                                changeDistrict([]);
                            }}
                        />
                    </div>
                </Form>
            </ListPageModal.SearchForm>
            <ListPageModal.Modal>
                <BranchForm {...{ dataDetail, handleChangeValue }} />
            </ListPageModal.Modal>
        </ListPageModal>
    );
}

export default ManageBranch;
