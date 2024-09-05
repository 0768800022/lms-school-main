import React from "react";
import Image from "next/image";
import classNames from "classnames";

import styles from "./Empty.module.scss";
const Empty = ({ label ,width = 100,height=100,className }) => {
    return (
        <div className={classNames(styles.empty,className)}>
            <Image draggable={false} alt="no-data" src="/images/common/no-data.png" width={width} height={height} />
            <div className={styles.text}> {label  || "Không tìm thấy dữ liệu phù hợp"}</div>
        </div>
    );
};
export default Empty;
