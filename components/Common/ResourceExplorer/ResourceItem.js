import { forwardRef } from "react";
import cls from "classnames";

import TextClamp from "@/components/Common/TextClamp";
import { convertBytes } from "@/utils";
import { getIconPath } from "@/utils/common";

import styles from "./ResourceItem.module.scss";

const ResourceItem = forwardRef(function ResourceItem(
    { onSelect, onOpen, onPreview, data, className, classNames = {}, ...props },
    ref,
) {
    const { id, name, size, type, url } = data;

    return (
        <div className={cls(styles.itemWrapper, className, classNames.wrapper)}>
            <div
                {...props}
                ref={ref}
                onClick={() => onSelect?.(data)}
                onDoubleClick={() => onOpen?.(data)}
                title={name}
                className={cls(styles.item, classNames.item)}
            >
                <ResourceIcon
                    className={classNames.icon}
                    item={data}
                    onPreview={onPreview}
                />
                <TextClamp lineClamp={2} className={cls(styles.itemName, classNames.name)}>
                    {name}
                </TextClamp>
                {!!size && (
                    <div className={cls(styles.itemCapacity, classNames.capacity)}>
                        {convertBytes(size)}
                    </div>
                )}
            </div>
        </div>
    );
});

export function isImageFile(filename) {
    const imageExtensions = new Set([ "jpg", "jpeg", "png" ]);

    const extension = filename.split(".").pop().toLowerCase();

    return imageExtensions.has(extension);
}

export const getResourceIcon = (item = {}) => {
    if (isImageFile(item.name)) {
        return item.url;
    }

    return getIconPath(item?.name, item.type);
};

function ResourceIcon({ item, className }) {
    return (
        <div className={cls(styles.iconWrapper, className)}>
            <div className={styles.icon}>
                <img
                    className={styles.img}
                    alt="icon"
                    src={getResourceIcon(item)}
                />
            </div>
        </div>
    );
}

export default ResourceItem;
