import classNames from "classnames";
import React from "react";

import styles from "./Container.module.scss";

function Container({ children, className, style, maxWidth, margin, asChild, ...other }) {
    const props = {
        className: classNames(styles.root, className),
        style: { ...style, "--max-width": maxWidth, "--margin": margin },
        ...other,
    };

    if (asChild) {
        return React.cloneElement(children, {
            className: classNames(props.className, children.props.className),
            style: { ...props.style, children: children.props.style },
            ...other,
        });
    }

    return <div {...props}>{children}</div>;
}

export default Container;
