import classNames from "classnames";

import styles from "./Skeleton.module.scss";

function Skeleton({
    children,
    visible = true,
    height,
    width,
    circle = false,
    animate = true,
    radius,
    className,
    style,
    ...props
}) {
    return (
        <div
            {...props}
            style={{
                ...style,
                "--skeleton-height": height,
                "--skeleton-width": circle ? height : width,
                "--skeleton-radius": circle ? "999px" : radius,
            }}
            data-visible={visible}
            data-animate={animate}
            className={classNames(styles.skeleton, className)}
        >
            {children}
        </div>
    );
}

export default Skeleton;
