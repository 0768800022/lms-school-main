import classNames from "classnames";
import React from "react";

import styles from "./StyledScrollBar.module.scss";

function StyledScrollbar({
    children,
    width,
    height,
    radius,
    asChild = false,
    className,
    innerRef,
    ...props
}) {
    const style = {
        "--scrollbar-width": width,
        "--scrollbar-height": height,
        "--scrollbar-radius": radius,
    };

    if (asChild) {
        return React.cloneElement(children, {
            ...props,
            ref: innerRef,
            style: { ...style, ...children.props.style },
            className: classNames(styles.root, className, children.props.className),
        });
    }

    return (
        <div
            {...props}
            ref={innerRef}
            style={{ ...props.style, ...style }}
            className={classNames(styles.root, className)}
        >
            {children}
        </div>
    );
}

export default StyledScrollbar;
