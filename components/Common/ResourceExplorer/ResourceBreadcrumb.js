import cls from "classnames";

import Breadcrumb from "@/components/layouts/Breadcrumb";

import styles from "./ResourceBreadcrumb.module.scss";

function ResourceBreadcrumb({ onNavigate, data, className, classNames = {}, ...props }) {
    return (
        <Breadcrumb
            {...props}
            ignoreSingle={false}
            className={className}
            classNames={{
                container: cls(styles.container, classNames.container),
                wrapper: cls(styles.wrapper, classNames.wrapper),
                item: cls(styles.item, classNames.item),
                ...classNames,
            }}
            data={data}
            renderItem={(item, props) => (
                <div {...props} onClick={() => onNavigate(item)}>
                    {item.label}
                </div>
            )}
        />
    );
}

export default ResourceBreadcrumb;
