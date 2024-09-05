import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { toast } from "sonner";

import Alert from "@/components/Common/Alert";
import Button from "@/components/Common/Button";
import Carousel from "@/components/Common/Carousel";
import Container from "@/components/Common/Container";
import { Form, useForm } from "@/components/Common/Form";
import Grid from "@/components/Common/Grid";
import { InputField } from "@/components/Common/Input";
import ConfirmModal from "@/components/Common/Modal/ConfirmModal";
import ImportUserModal from "@/components/Common/Modal/ImportUserModal";
import ModalImportFail from "@/components/Common/Modal/ModalImportFail";
import NextLink from "@/components/Common/NextLink";
import Pagination from "@/components/Common/Pagination";
import Popover from "@/components/Common/Popover";
import ResetButton from "@/components/Common/ResetButton";
import { SelectBranchField, SelectField } from "@/components/Common/Select";
import Switch from "@/components/Common/Switch";
import Table from "@/components/Common/Table";
import TextClamp from "@/components/Common/TextClamp";
import Tooltip from "@/components/Common/Tooltip";
import { commonStatus, genderName, roleName, ROLES_CODE } from "@/constants/constant";
import paths from "@/constants/paths";
import { useAppContext } from "@/contexts";
import useBranch from "@/hooks/useBranch";
import useDataList from "@/hooks/useDataList";
import { useDebounce } from "@/hooks/useDebounce";
import useQueryParams from "@/hooks/useQueryParams";
import useRole from "@/hooks/useRole";
import ArrowCircleRightIcon from "@/public/icons/arrow-circle-right.svg";
import ArrowDownIcon from "@/public/icons/arrow-down.svg";
import PencilIcon from "@/public/icons/pencil.svg";
import SearchIcon from "@/public/icons/search-normal.svg";
import TrashIcon from "@/public/icons/trash.svg";
import { getUsers, updateUserStatus } from "@/services/api/user";
import { combineName, handleCatchError } from "@/utils/common";

import styles from "./ManageUser.module.scss";

const renderBranchRoleColumn = (value, roleCode) => {
    if (roleCode) {
        return roleName[roleCode];
    }

    return (
        <Tooltip
            align="center"
            side="bottom"
            className={styles.tooltipWrapper}
            trigger={
                <Tooltip.Trigger>
                    <div className={styles.textLine}>
                        {value?.map((role) => role.name)?.join(", ")}
                    </div>
                </Tooltip.Trigger>
            }
        >
            <div className={styles.tooltip} style={{ width: "fit-content", padding: "12px 16px" }}>
                {value?.map((role) => role.name)?.join(", ")}
            </div>
        </Tooltip>
    );
};

function ManageUser({ roleCode }) {
    const [ form ] = useForm();
    const router = useRouter();
    const [ query, setQuery ] = useQueryParams({
        search: "string",
    });
    const { push } = useRouter();
    const { roles } = useRole();
    const { branches } = useBranch();
    const { defaultBranch } = useAppContext();
    const { data, totalElements, refetch, currentPage, isFetching } = useDataList({
        fetcher: getUsers,
        filter: {
            ...query,
            branchId: query.branchId || defaultBranch,
            status: !query?.status
                ? commonStatus.ACTIVE
                : query?.status === "ALL"
                    ? undefined
                    : query?.status,
        },
    });

    const roleOptions = useMemo(() => {
        roles?.unshift({ label: "Tất cả người dùng", value: "" });

        return roles;
    }, [ roles ]);

    const [ errorImport, setErrorImport ] = useState();
    const [ , render ] = useState();
    const [ search, setSearch ] = useState(query?.search);
    const searchDebounce = useDebounce(search);
    const [ deleteUser, setDeleteUser ] = useState();
    const [ updateStatusUser, setUpdateStatusUser ] = useState();
    const [ importUser, setImportUser ] = useState();
    const carouselRef = useRef();

    useEffect(() => {
        if (!router.isReady || !branches?.length) return;

        form.setFieldsValue({
            ...form.getFieldsValue(),
            ...query,
        });
    }, [ router, branches ]);

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.on("settle", () => {
                render({});
            });
        }
    }, [ carouselRef.current ]);

    useEffect(() => {
        if (searchDebounce == undefined) return;

        setQuery((prev) => ({
            ...prev,
            search: searchDebounce?.trim(),
            page: 0,
        }));
    }, [ searchDebounce ]);

    const handleUpdateUserStatus = async (updateUser) => {
        try {
            const resUpdate = await updateUserStatus({
                data: updateUser ? updateUser : updateStatusUser,
            });

            if (!resUpdate.result) {
                toast.error("Cập nhật trạng thái thất bại");
                setUpdateStatusUser();
                return;
            }

            toast.success("Cập nhật trạng thái thành công");
            setUpdateStatusUser();
            refetch();
        } catch (err) {
            handleCatchError(err?.response?.data);
        }
    };

    const codeColumn = useMemo(
        () => ({
            title: "Mã người dùng",
            dataIndex: "code",
            width: 140,
            render: (value) => (
                <TextClamp title={value} lineClamp={1} className={styles.code}>
                    {value}
                </TextClamp>
            ),
        }),
        [],
    );

    const nameColumn = useMemo(
        () => ({
            title: "Họ và tên",
            width: 200,
            dataIndex: "firstName",
            render: (_, row) => (
                <TextClamp lineClamp={1} title={combineName(row)} className={styles.fullname}>
                    {combineName(row)}
                </TextClamp>
            ),
        }),
        [],
    );

    const phoneColumn = useMemo(
        () => ({
            title: "Số điện thoại",
            dataIndex: "phone",
            width: 140,
            render: (value) => <span>{value}</span>,
        }),
        [],
    );

    const statusColumn = useMemo(
        () => ({
            title: "Trạng thái",
            dataIndex: "status",
            align: "center",
            width: 110,
            render: (value, row) => (
                <span>
                    <Switch
                        onCheckedChange={(check) => {
                            if (!check) {
                                setUpdateStatusUser({
                                    id: row.id,
                                    status: commonStatus.LOCK,
                                });
                            } else {
                                handleUpdateUserStatus({
                                    id: row.id,
                                    status: commonStatus.ACTIVE,
                                });
                            }
                        }}
                        checked={value === commonStatus.ACTIVE}
                    />
                </span>
            ),
        }),
        [],
    );

    const columnsDefine = useMemo(() => {
        switch (roleCode) {
            case ROLES_CODE.TEACHER:
                return [
                    codeColumn,
                    nameColumn,
                    phoneColumn,
                    {
                        title: "Giảng dạy bộ môn",
                        dataIndex: "teacherExtraData.subjects",
                        width: 250,
                        render: (_, row) => {
                            const value = row?.teacherExtraData?.subjects || [];
                            const valueText =
                                value?.map((item) => item.fullName)?.join(", ") || " ";
                            return (
                                <TextClamp lineClamp={1} title={valueText} className={styles.email}>
                                    {valueText}
                                </TextClamp>
                            );
                        },
                    },
                    {
                        title: "Chủ nhiệm lớp",
                        dataIndex: "teacherExtraData.headClassrooms",
                        width: 200,
                        render: (_, row) => {
                            const value = row?.teacherExtraData?.headClassrooms || [];
                            const valueText = value?.map((item) => item.name)?.join(", ") || " ";
                            return (
                                <TextClamp lineClamp={1} title={valueText} className={styles.email}>
                                    {valueText}
                                </TextClamp>
                            );
                        },
                    },
                    statusColumn,
                ];
            case ROLES_CODE.STUDENT:
                return [
                    codeColumn,
                    nameColumn,
                    phoneColumn,
                    {
                        title: "Lớp học",
                        dataIndex: "studentExtraData.classroom",
                        width: 200,
                        render: (value) => {
                            return (
                                <TextClamp
                                    lineClamp={1}
                                    title={value?.name || " "}
                                    className={styles.email}
                                >
                                    {value?.name || " "}
                                </TextClamp>
                            );
                        },
                    },
                    {
                        title: "Phụ huynh",
                        dataIndex: "studentExtraData.parents",
                        width: 200,
                        render: (_, row) => {
                            const value = row?.studentExtraData?.parents || [];
                            return (
                                <Tooltip
                                    align="center"
                                    side="bottom"
                                    className={styles.tooltipWrapper}
                                    trigger={
                                        <Tooltip.Trigger>
                                            <div>
                                                {value?.map((item, index) => {
                                                    if (index > 1) return null;
                                                    const valueText = (
                                                        <div className={styles.email}>
                                                            <div className={styles.emailPre}>
                                                                {combineName(item)} - {item.phone}
                                                            </div>
                                                            {index === 1 && value.length > 2 ? (
                                                                <span>, +{value.length - 2}</span>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    );
                                                    return valueText;
                                                })}
                                            </div>
                                        </Tooltip.Trigger>
                                    }
                                >
                                    <div className={styles.tooltip}>
                                        {value?.map((item) => {
                                            const valueText = (
                                                <div>
                                                    {combineName(item)} - {item.phone}
                                                </div>
                                            );
                                            return valueText;
                                        })}
                                    </div>
                                </Tooltip>
                            );
                        },
                    },
                    statusColumn,
                ];
            case ROLES_CODE.PARENT:
                return [
                    codeColumn,
                    nameColumn,
                    phoneColumn,
                    {
                        title: "Là phụ huynh của học sinh",
                        dataIndex: "parentExtraData.students",
                        width: 200,
                        render: (_, row) => {
                            const value = row?.parentExtraData?.students || [];
                            return (
                                <Tooltip
                                    align="center"
                                    side="bottom"
                                    className={styles.tooltipWrapper}
                                    trigger={
                                        <Tooltip.Trigger>
                                            <div>
                                                {value?.map((item, index) => {
                                                    if (index > 1) return null;
                                                    const valueText = (
                                                        <div className={styles.email}>
                                                            <div className={styles.emailPre}>
                                                                {combineName(item)}
                                                            </div>
                                                            {index === 1 && value.length > 2 ? (
                                                                <span>, +{value.length - 2}</span>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    );
                                                    return valueText;
                                                })}
                                            </div>
                                        </Tooltip.Trigger>
                                    }
                                >
                                    <div className={styles.tooltip}>
                                        {value?.map((item) => {
                                            const valueText = <div>{combineName(item)}</div>;
                                            return valueText;
                                        })}
                                    </div>
                                </Tooltip>
                            );
                        },
                    },
                    statusColumn,
                ];
            default:
                return [
                    codeColumn,
                    nameColumn,
                    phoneColumn,
                    {
                        title: "Email",
                        dataIndex: "email",
                        width: 250,
                        render: (value) => (
                            <TextClamp lineClamp={1} title={value} className={styles.email}>
                                {value}
                            </TextClamp>
                        ),
                    },
                    {
                        title: "Giới tính",
                        dataIndex: "gender",
                        width: 100,
                        render: (value) => <span>{genderName[value]}</span>,
                    },
                    {
                        title: "Vai trò",
                        dataIndex: "roles",
                        render: (value) => (
                            <span className={styles.roles}>
                                {renderBranchRoleColumn(value, query?.roleCode)}
                            </span>
                        ),
                    },
                    statusColumn,
                ];
        }
    }, [ roleCode ]);

    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.top}>
                    <div className={styles.title}>Quản lý người dùng</div>
                    <div className={styles.action}>
                        <div className={styles.select}>
                            <Popover
                                align="bottom"
                                side="bottom"
                                className={styles.popoverContent}
                                target={
                                    <Popover.Target>
                                        <div className={styles.import}>
                                            <div>Import người dùng mới</div>
                                            <ArrowDownIcon />
                                        </div>
                                    </Popover.Target>
                                }
                            >
                                <div className={styles.content}>
                                    <div
                                        className={styles.importItem}
                                        onClick={() => setImportUser(ROLES_CODE.TEACHER)}
                                    >
                                        Import giáo viên
                                    </div>
                                    <div
                                        className={styles.importItem}
                                        onClick={() => setImportUser(ROLES_CODE.STUDENT)}
                                    >
                                        Import học sinh
                                    </div>
                                    <div
                                        className={styles.importItem}
                                        onClick={() => setImportUser(ROLES_CODE.PARENT)}
                                    >
                                        Import phụ huynh
                                    </div>
                                </div>
                            </Popover>
                        </div>
                        <NextLink href={paths.createUser}>
                            <Button>+ Thêm mới</Button>
                        </NextLink>
                    </div>
                </div>
                <div>
                    <Form
                        className={styles.filter}
                        form={form}
                        initialValues={{
                            search: "",
                            status: commonStatus.ACTIVE,
                            branchId: defaultBranch,
                        }}
                        onFinish={(values) => setQuery((prev) => ({ ...prev, values }))}
                    >
                        <Carousel
                            startIndex={roleOptions?.indexOf(
                                roleOptions?.find((item) => item.value === (query.roleCode || "")),
                            )}
                            onInit={(carousel) => (carouselRef.current = carousel)}
                            className={styles.carousel}
                            slidesToShow={null}
                            slideSpacing="1rem"
                            loop={false}
                            align="center"
                            watchDrag={false}
                            dragFree
                            autoplay={false}
                        >
                            <Carousel.Viewport className={styles.viewport}>
                                <Carousel.Container>
                                    {roleOptions?.map((item, index) => (
                                        <Carousel.Slide
                                            onClick={() => carouselRef.current.scrollTo(index)}
                                            key={index}
                                        >
                                            <div
                                                key={index}
                                                onClick={() => {
                                                    setQuery(
                                                        (prev) => ({
                                                            ...prev,
                                                            roleCode: item.value,
                                                            page: 0,
                                                        }),
                                                        { shallow: false },
                                                    );
                                                }}
                                                className={classNames({
                                                    [styles.item]: true,
                                                    [styles.active]:
                                                        (query.roleCode || "") === item.value,
                                                })}
                                            >
                                                {item.label}
                                            </div>
                                        </Carousel.Slide>
                                    ))}
                                </Carousel.Container>
                                {carouselRef.current?.canScrollNext() && (
                                    <div
                                        onClick={() =>
                                            carouselRef.current.scrollTo(roleOptions?.length - 1)
                                        }
                                        className={styles.arrowRight}
                                    >
                                        <ArrowCircleRightIcon />
                                    </div>
                                )}
                            </Carousel.Viewport>
                        </Carousel>
                        <Grid className={styles.filter} gutter="1rem">
                            <Grid.Col span={4}>
                                <InputField
                                    name="search"
                                    className={styles.filterSearch}
                                    onChange={(e) => setSearch(e?.target?.value)}
                                    placeholder="Tìm kiếm theo tên/số điện thoại/email"
                                    type="search"
                                />
                            </Grid.Col>
                            <SelectBranchField
                                span={3}
                                name="branchId"
                                onChange={(value) =>
                                    setQuery((prev) => ({ ...prev, branchId: value, page: 0 }))
                                }
                                placeholder="Chi nhánh"
                                options={branches}
                            />
                            <Grid.Col span={3}>
                                <SelectField
                                    fieldProps={{
                                        showSearch: false,
                                    }}
                                    name="status"
                                    onChange={(value) =>
                                        setQuery((prev) => ({ ...prev, status: value, page: 0 }))
                                    }
                                    placeholder="Trạng thái"
                                    options={[
                                        { label: "Tất cả", value: "ALL" },
                                        { label: "Đang hoạt động", value: commonStatus.ACTIVE },
                                        { label: "Ngưng hoạt động", value: commonStatus.LOCK },
                                    ]}
                                />
                            </Grid.Col>
                            <Grid.Col span="content">
                                <ResetButton
                                    onClick={() => {
                                        form.resetFields();
                                        setQuery(
                                            { status: commonStatus.ACTIVE },
                                            { mergePreviousParams: false, shallow: false },
                                        );
                                    }}
                                />
                            </Grid.Col>
                        </Grid>
                    </Form>
                </div>
                {errorImport && (
                    <Alert type="error" className={styles.errorImport}>
                        <div>
                            Một số [Tên vai trò] có thông tin chưa hợp lệ.
                            <ModalImportFail
                                trigger={<span className={styles.detail}>Xem chi tiết</span>}
                            />
                        </div>
                    </Alert>
                )}
                <React.Fragment key={roleCode}>
                    <Table
                        className={styles.table}
                        data={data}
                        columns={columnsDefine}
                        isLoading={isFetching}
                        actions={[
                            {
                                label: "Chỉnh sửa",
                                icon: <PencilIcon />,
                                onClick: (row) =>
                                    push({
                                        pathname: paths.userDetail,
                                        query: {
                                            id: row.id,
                                        },
                                    }),
                            },
                            {
                                label: "Xóa",
                                icon: <TrashIcon />,
                                onClick: (row) => {
                                    setDeleteUser(row.id);
                                },
                            },
                        ]}
                    />
                </React.Fragment>
                <Pagination
                    className={styles.pagination}
                    onChange={(newPage) => setQuery((prev) => ({ ...prev, page: newPage }))}
                    total={totalElements}
                    current={currentPage}
                />
                <ConfirmModal
                    onOpenChange={() => setDeleteUser()}
                    open={Boolean(deleteUser)}
                    confirm="Bạn có chắc chắn muốn thực hiện?"
                    description="Bạn đang thực hiện thao tác xóa người dùng. Sau khi xóa, dữ liệu này không thể
                    khôi phục. Đồng thời, các nội dung đang sử dụng dữ liệu này có thể bị ảnh hưởng."
                    title="Xác nhận xóa người dùng"
                    onCancel={() => setDeleteUser()}
                />
                <ConfirmModal
                    onOpenChange={() => setUpdateStatusUser()}
                    open={Boolean(updateStatusUser)}
                    confirm="Bạn có chắc chắn muốn thực hiện?"
                    description="Bạn đang thực hiện thao tác tắt trạng thái hoạt động của người dùng. Các nội dung đang sử dụng dữ liệu này sẽ không còn khả dụng."
                    title="Xác nhận cập nhật trạng thái người dùng"
                    onCancel={() => setUpdateStatusUser()}
                    onConfirm={() => {
                        handleUpdateUserStatus();
                    }}
                />
                <ImportUserModal
                    open={Boolean(importUser)}
                    onOpenChange={() => setImportUser()}
                    code={importUser}
                    selectBranch={true}
                />
            </Container>
        </div>
    );
}

export default ManageUser;
