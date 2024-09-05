import { useMemo, useRef, useState } from "react";
import classNames from "classnames";

import Checkbox from "@/components/Common/Checkbox";
import { useWindowSize } from "@/hooks/useWindowSize";

import VirtualList from "./VirtualList";

import styles from "./DragTransferStudent.module.scss";

export default function DragTransferStudent({
    data = [],
    setData,
    className = "",
    messageNodata = "",
    onDrop,
    isDrag = false,
    setIsDrag,
    disabled = false,
    onScroll,
}) {
    const [ targetItem, setTargetItem ] = useState("");
    const refBody = useRef(null);
    const [ w, h ] = useWindowSize();
    const onDragEnter = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDrag(true);
    };
    const handleDragStart = (event, value) => {
        setTargetItem(value?.toString());
        setIsDrag(true);
        event.dataTransfer.setData("text/plain", value);
    };
    const handleDragLeave = () => {
        setIsDrag(false);
        setTargetItem("");
    };
    const onDragOver = (event) => {
        event.preventDefault();
        setIsDrag(true);
    };
    const onDropBox = (event) => {
        event.preventDefault();
        if (disabled) return false;
        setTargetItem("");
        setIsDrag(false);
        if (onDrop) onDrop(event);
    };
    const onClickAllItem = (e) => {
        setData([
            ...data.map((item) => ({
                ...item,
                selected: e.target.checked,
            })),
        ]);
    };
    const height = useMemo(() => {
        return refBody.current?.offsetHeight || 100;
    }, [ w, h ]);

    return (
        <div className={classNames(styles.tableData, className)}>
            <div className={styles.tableHeader}>
                <div className={styles.action}>
                    {data.length > 0 && (
                        <Checkbox
                            disabled={disabled}
                            onChange={onClickAllItem}
                            checked={data.every((item) => item.selected)}
                        />
                    )}
                </div>
                <div className={styles.studentCode}>
                    <span>Mã học sinh</span>
                </div>
                <div className={styles.studentName}>
                    <span>Tên học sinh</span>
                </div>
            </div>
            <div
                className={classNames(styles.tableBody, {
                    [styles.box]: isDrag,
                })}
                ref={refBody}
                onScroll={onScroll}
                onDragOver={onDragOver}
                onDrop={onDropBox}
            >
                {data.length > 0 ? (
                    <VirtualList
                        data={data}
                        setData={setData}
                        targetItem={targetItem}
                        disabled={disabled}
                        onDragEnter={onDragEnter}
                        handleDragLeave={handleDragLeave}
                        handleDragStart={handleDragStart}
                        height={height}
                    />
                ) : (
                    <div className={styles.noData}>{messageNodata}</div>
                )}
            </div>
        </div>
    );
}
