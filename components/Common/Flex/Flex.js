import React from "react";
import classNames from "classnames";

import styles from "./Flex.module.scss";

function Flex({
    className,
    gap,
    rowGap,
    columnGap,
    align,
    justify,
    wrap,
    direction,
    children,
    asChild = false,
    style,
    fullWidth = false,
    ...props
}) {
    const flexStyles = {
        gap: gap,
        "rowGap": rowGap,
        "columnGap": columnGap,
        "alignItems": align,
        "justifyContent": justify,
        "flexWrap": wrap,
        "flexDirection": direction,
        ...style,
    };

    if (asChild) {
        return React.cloneElement(children, {
            style: {
                ...flexStyles,
                ...(children.props?.style ?? {}),
            },
            className: classNames(className, children.props?.className, styles.root),
            ...props,
        });
    }

    return (
        <div
            style={flexStyles}
            data-full-width={fullWidth}
            className={classNames(className, flexStyles.root, styles.root)}
            {...props}
        >
            {children}
        </div>
    );
}

export default Flex;
