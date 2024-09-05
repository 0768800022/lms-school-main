import { useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";

import { TIME_FORMAT } from "@/constants/constant";

import Button from "../../Button";
import Flex from "../../Flex";
import Grid from "../../Grid";
import Modal from "../Modal";

import styles from "./ModalViewEvent.module.scss";

function ModalViewEvent({ trigger, open, onOpenChange, item }) {
    const [ _open, setOpen ] = useState(open);
    const newOnOpenChange = (newOpen) => {
        setOpen(newOpen);
        onOpenChange && onOpenChange(newOpen);
    };

    return (
        <Modal.Root
            onOpenChange={newOnOpenChange}
            open={_open}
            trigger={trigger}
        >
            <Modal.Header title="Chi tiết sự kiện" />
            <Modal.Body>
                <Flex direction="column" rowGap="24px">
                    {item?.length > 0 &&
                        item?.map((item, index) => {
                            const happening = dayjs().isBetween(
                                dayjs(item.startTime),
                                dayjs(item.endTime),
                                "minute",
                                "[]",
                            );
                            const isAfter = dayjs().isAfter(dayjs(item.endTime), "minute", "[]");
                            return (
                                <Flex direction="column" rowGap="18px" key={index}>
                                    <div className={styles.healing}>
                                        Thông tin sự kiện {index + 1}
                                    </div>

                                    <Grid>
                                        <Grid.Col span={3} className={styles.label}>
                                            <div className={styles.roleTitle}>Tên sự kiện </div>
                                        </Grid.Col>
                                        <Grid.Col span={6} className={styles.content}>
                                            {item?.name && item?.name}
                                        </Grid.Col>
                                    </Grid>

                                    <Grid>
                                        <Grid.Col span={3} className={styles.label}>
                                            <div className={styles.roleTitle}>Thời gian </div>
                                        </Grid.Col>
                                        <Grid.Col span={6} className={styles.content}>
                                            {[
                                                dayjs(item?.startTime).format(TIME_FORMAT),
                                                dayjs(item?.endTime).format(TIME_FORMAT),
                                            ]
                                                .filter(Boolean)
                                                .join(" - ")}
                                        </Grid.Col>
                                    </Grid>
                                    <Grid>
                                        <Grid.Col span={3} className={styles.label}>
                                            <div className={styles.roleTitle}>Trạng thái </div>
                                        </Grid.Col>
                                        {item && (
                                            <Grid.Col
                                                span={6}
                                                className={classNames({
                                                    [styles.content]: true,
                                                    [styles.happening]: happening,
                                                    [styles.before]: !happening && !isAfter,
                                                    [styles.after]: !happening && isAfter,
                                                })}
                                            >
                                                {happening
                                                    ? "Đang diễn ra"
                                                    : isAfter
                                                        ? "Đã kết thúc"
                                                        : "Chưa diễn ra"}
                                            </Grid.Col>
                                        )}
                                    </Grid>
                                </Flex>
                            );
                        })}
                </Flex>
            </Modal.Body>

            <Modal.Footer>
                <div className={styles.action}>
                    <Modal.Close>
                        <Button type="outline">Đóng</Button>
                    </Modal.Close>
                </div>
            </Modal.Footer>
        </Modal.Root>
    );
}

export default ModalViewEvent;
