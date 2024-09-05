import React from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import paths from "@/constants/paths";
import IconArrow from "@/public/icons/arrow-down.svg";
import { pushQuery } from "@/utils/common";

import Button from "../Button";
import Flex from "../Flex";

import DatePicker from "./DatePicker";

import styles from "./WeekPicker.module.scss";

function WeekPicker() {
    const router = useRouter();
    const { query } = router;
    return (
        <Flex columnGap="1rem" className={styles.selectedWeekWrapper}>
            <Button
                onClick={() =>
                    pushQuery(router, {
                        date: dayjs(query?.date).add(-7, "day").format("YYYY-MM-DD"),
                    })
                }
                type="outline"
                className={styles.btnSeekWeek}
                data-left
            >
                <IconArrow />
            </Button>
            <Button
                onClick={() =>
                    pushQuery(router, {
                        date: dayjs().format("YYYY-MM-DD"),
                    })
                }
                className={styles.selectedWeek}
            >
                Tuần này
            </Button>
            <Button
                onClick={() =>
                    pushQuery(router, {
                        date: dayjs(query?.date).add(7, "day").format("YYYY-MM-DD"),
                    })
                }
                type="outline"
                className={styles.btnSeekWeek}
                data-right
            >
                <IconArrow />
            </Button>
            <DatePicker
                onChange={(value) =>
                    pushQuery(router, {
                        date: dayjs(value).format("YYYY-MM-DD"),
                    })
                }
                value={dayjs(query?.date)}
                picker="week"
                getPopupContainer={() => null}
                placeholder="Chọn tuần"
                className={styles.weekPicker}
            />
        </Flex>
    );
}

export default WeekPicker;
