import React from "react";
import classNames from "classnames";

import ArrowLeftIcon from "@/public/icons/arrow-left.svg";
import ArrowLeftIcon2 from "@/public/icons/arrow-left-2.svg";
import ArrowRightIcon from "@/public/icons/arrow-right.svg";
import ArrowRightIcon2 from "@/public/icons/arrow-right-2.svg";

import styles from "./Pagination.module.scss";

function Pagination({
    className,
    current = 0,
    total = 0,
    size = 10,
    onChange = (value) => {
        console.log({ newPage: value });
    },
}) {
    const lastPage = Math.ceil(total / size) - 1;
    if (current > lastPage) {
        current = lastPage;
    }

    if (current < 0) {
        current = 0;
    }

    const onChangePage = (value) => {
        if (value < 0 || value > lastPage) {
            return;
        }
        onChange && onChange(value);
    };

    const PageItem = ({ page }) => (
        <div
            onClick={() => {
                onChangePage(page);
            }}
            className={classNames({
                [styles.item]: true,
                [styles.active]: current === page,
            })}
        >
            {page + 1}
        </div>
    );

    if (total <= size) {
        return <></>;
    }

    return (
        <div
            className={classNames({
                [styles.wrapper]: true,
                [className]: true,
            })}
        >
            <div className={styles.info}>Tổng {total} dòng</div>
            {total > 0 && (
                <div className={styles.paging}>
                    <div
                        onClick={() => {
                            onChangePage(0);
                        }}
                        className={classNames({
                            [styles.item]: true,
                            [styles.disabled]: current === 0,
                        })}
                    >
                        <ArrowLeftIcon2 />
                    </div>
                    <div
                        onClick={() => {
                            onChangePage(current - 1);
                        }}
                        className={classNames({
                            [styles.item]: true,
                            [styles.disabled]: current === 0,
                        })}
                    >
                        <ArrowLeftIcon />
                    </div>
                    {lastPage > 5 ? (
                        current < 2 ? (
                            <>
                                <PageItem page={0} />
                                <PageItem page={1} />
                                <PageItem page={2} />
                                <div className={styles.item}>...</div>
                                {current === lastPage - 2 && <PageItem page={lastPage - 2} />}
                                <PageItem page={lastPage - 1} />
                                <PageItem page={lastPage} />
                            </>
                        ) : current > lastPage - 2 ? (
                            <>
                                <PageItem page={0} />
                                <PageItem page={1} />
                                <div className={styles.item}>...</div>
                                {current === lastPage - 2 && <PageItem page={lastPage - 2} />}
                                <PageItem page={lastPage - 2} />
                                <PageItem page={lastPage - 1} />
                                <PageItem page={lastPage} />
                            </>
                        ) : (
                            <>
                                <PageItem page={0} />
                                <div className={styles.item}>...</div>
                                <PageItem page={current - 1} />
                                <PageItem page={current} />
                                <PageItem page={current + 1} />
                                <div className={styles.item}>...</div>
                                <PageItem page={lastPage} />
                            </>
                        )
                    ) : (
                        Array.from(Array(lastPage + 1).keys()).map((i) => (
                            <PageItem key={i} page={i} />
                        ))
                    )}
                    <div
                        onClick={() => {
                            onChangePage(current + 1);
                        }}
                        className={classNames({
                            [styles.item]: true,
                            [styles.disabled]: current === lastPage,
                        })}
                    >
                        <ArrowRightIcon />
                    </div>
                    <div
                        onClick={() => {
                            onChangePage(lastPage);
                        }}
                        className={classNames({
                            [styles.item]: true,
                            [styles.disabled]: current === lastPage,
                        })}
                    >
                        <ArrowRightIcon2 />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pagination;
