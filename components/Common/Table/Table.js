import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import Image from "next/image";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";

import Loading from "../Loading";
import { useRoleValidator } from "../Permission";

import TableAction from "./TableAction";

import styles from "./Table.module.scss";

const columnHelper = createColumnHelper();

const emptyArray = [];

const getCommonPinningStyles = (column, shadow, isHeader) => {
    const isPinned = column.getIsPinned();
    const isLastLeftPinnedColumn = isPinned === "left" && column.getIsLastColumn("left");
    const isFirstRightPinnedColumn = isPinned === "right" && column.getIsFirstColumn("right");

    return {
        boxShadow: !shadow
            ? "none"
            : isLastLeftPinnedColumn
                ? "inset -10px 0 8px -8px rgba(5, 5, 5, 0.06)"
                : isFirstRightPinnedColumn
                    ? "inset 10px 0 8px -8px rgba(5, 5, 5, 0.06)"
                    : undefined,
        left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
        right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
        position: isPinned ? "sticky" : "relative",
        zIndex: isPinned ? 1 : 0,
        background: isPinned && !isHeader ? "#fff" : undefined,
    };
};

const Table = forwardRef(
    (
        {
            data,
            columns = [],
            noDataWithoutFilter = false,
            className,
            classNameRow,
            actions,
            isLoading = false,
            rowSelection,
            enableMultiRowSelection = false,
            scrollX = false,
            scrollY = false,
            onClickTableCell = () => {},
            rowKey = "id",
            withActionColumn = true,
        },
        ref,
    ) => {
        const { validateRole } = useRoleValidator();
        const [ selected, setRowSelection ] = useState({});
        const columnsDefine = useMemo(
            () =>
                columns
                    .filter(({ roles }) => validateRole(roles))
                    .map((column, index) => ({
                        ...columnHelper.accessor(column.dataIndex, {
                            header: column.title,
                            id: column.key || `column-${index}`,
                            cell: column?.cell
                                ? column?.cell
                                : (value) =>
                                    column.render?.(
                                        value.getValue(),
                                        value.row.original,
                                        column.dataIndex,
                                    ) || value.getValue(),
                        }),
                        pin: column.pin,
                    })),
            [ columns ],
        );

        const table = useReactTable({
            data: data || emptyArray,
            columns: columnsDefine,
            state: {
                rowSelection: rowSelection?.selectedRowKeys
                    ? rowSelection?.selectedRowKeys
                    : selected,
            },
            getCoreRowModel: getCoreRowModel(),
            enableMultiRowSelection,
            onRowSelectionChange: (row) => {
                setRowSelection(row);
                rowSelection?.onChange(row);
            },
            getRowId: (originalRow, index) => {
                return originalRow?.[rowKey] || index; // Use rowKey prop instead of 'id'
            },
        });

        useImperativeHandle(
            ref,
            () => {
                return {
                    getRowSelection: () => table.getState().rowSelection,
                };
            },
            [],
        );

        return (
            <div
                className={classNames(styles.wrapper, className, {
                    [styles.scrollX]: scrollX,
                })}
                style={{ ...(scrollY ? { maxHeight: scrollY, overflowY: "auto" } : {}) }}
            >
                <table
                    style={{
                        ...(scrollX
                            ? { tableLayout: "fixed", width: "max-content", minWidth: "100%" }
                            : {}),
                    }}
                >
                    <colgroup>
                        {columns?.map(({ width }, index) => (
                            <col key={index} style={{ width }} />
                        ))}
                    </colgroup>
                    <thead className={styles.header}>
                        {table?.getHeaderGroups() &&
                            table?.getHeaderGroups()?.map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        if (
                                            header.column.columnDef.pin &&
                                            !header.column.getIsPinned()
                                        ) {
                                            header.column.pin("left");
                                        }
                                        return (
                                            <th
                                                align={columns[header.index]?.align || "left"}
                                                className={styles.cell}
                                                key={header.id}
                                                style={{
                                                    ...getCommonPinningStyles(
                                                        header.column,
                                                        null,
                                                        true,
                                                    ),
                                                }}
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext(),
                                                    )}
                                            </th>
                                        );
                                    })}
                                    {withActionColumn && actions?.length && (
                                        <th align="center" className={styles.cell}>
                                            Thao tác
                                        </th>
                                    )}
                                </tr>
                            ))}
                    </thead>
                    <tbody className={styles.body}>
                        {noDataWithoutFilter ? (
                            <tr className={styles.row}>
                                <td className={styles.cell} colSpan="100%">
                                    <div className={styles.noData}>
                                        <Image
                                            alt="no-data"
                                            src="/images/common/no-data.png"
                                            width={100}
                                            height={100}
                                        />
                                        <div className={styles.text}>Chưa có dữ liệu</div>
                                    </div>
                                </td>
                            </tr>
                        ) : table?.getRowModel()?.rows?.length > 0 ? (
                            table?.getRowModel()?.rows.map((row) => (
                                <tr
                                    className={classNames(styles.row, {
                                        [styles.disabledRow]: row.original.disabled,
                                        [classNameRow] :row?.original?.enable,
                                    })}
                                    key={row.id}
                                >
                                    {row.getVisibleCells().map((cell, index) => (
                                        <td
                                            style={{ ...getCommonPinningStyles(cell.column, true) }}
                                            onClick={() =>
                                                !row.original.disabled && onClickTableCell(row)
                                            }
                                            align={columns[index]?.align || "left"}
                                            width={columns[index]?.width || "auto"}
                                            className={classNames({
                                                [styles.cell]: true,
                                                [styles.nonePadding]: columns[index]?.nonePadding,
                                                [styles.disabledCell]: row.original.disabled,
                                            })}
                                            key={cell.id}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    ))}
                                    {withActionColumn && actions?.length && (
                                        <td align="center" className={styles.cell} width={100}>
                                            <TableAction data={row.original} actions={actions} />
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr className={styles.row}>
                                <td className={styles.cell} colSpan="100%">
                                    <div className={styles.noData}>
                                        <Image
                                            alt="no-data"
                                            src="/images/common/no-data.png"
                                            width={100}
                                            height={100}
                                        />
                                        <div className={styles.text}>
                                            Không tìm thấy dữ liệu phù hợp
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {isLoading && (
                    <div className={styles.loading}>
                        <Loading show={isLoading} />
                    </div>
                )}
            </div>
        );
    },
);

Table.displayName = "table";

export default Table;
