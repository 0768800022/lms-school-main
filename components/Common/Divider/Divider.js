import classNames from "classnames";

import styles from "./Divider.module.scss";

function Divider({
    label,
    type = "solid",
    size = 1,
    color = "rgba(68, 68, 68, 0.12)",
    className,
    labelPosition = "center",
    vertical = false,
    ...props
}) {
    return (
        <div
            {...props}
            style={{
                "--border-type": type,
                "--border-size": `${size}px`,
                "--border-color": color,
            }}
            data-vertical={vertical}
            data-with-label={!!label}
            className={classNames(styles.root, className)}
        >
            {label && (
                <div data-position={labelPosition} className={styles.label}>
                    {label}
                </div>
            )}
        </div>
    );
}

export default Divider;
