import React from "react";
import classNames from "classnames";

import styles from "./AspectRatio.module.scss";

function AspectRatio({ className, children, ratio = 1, ...props }) {
    if (!ratio) return children;
    return (
        <div
            {...props}
            style={{ "--ar-ratio": ratio }}
            className={classNames(styles.root, className)}
        >
            {children}
        </div>
    );
}

export default AspectRatio;
