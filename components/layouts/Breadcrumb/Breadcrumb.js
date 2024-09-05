import React, { useRef } from "react";
import cls from "classnames";

import Container from "@/components/Common/Container";
import DropdownMenu from "@/components/Common/DropdownMenu";
import NextLink from "@/components/Common/NextLink";
import IconMenu from "@/public/icons/menu.svg";
import { roleValidator } from "@/utils/auth";

import styles from "./Breadcrumb.module.scss";

function Separator({ symbol, className }) {
    return <span className={cls(styles.breadcrumbSeparator, className)}>{symbol ?? "/"}</span>;
}

const Item = function Item({ className, index, data = {}, renderItem, ...props }) {
    if (renderItem) {
        return renderItem(data, {
            className: cls(styles.item, className),
            index,
            title: data.label,
            ...props,
        });
    }

    const Component = data?.link ? (props) => <NextLink {...props} href={data.link} /> : "div";

    return (
        <Component {...props} title={data.label} className={cls(styles.item, className)}>
            {data.label}
        </Component>
    );
};

function Breadcrumb({
    data = [],
    className,
    classNames = {},
    role,
    separator,
    renderItem,
    ignoreSingle = true,
    maxItems = 5,
}) {
    const dropdownContainer = useRef();

    const roleBasedBreadcrumb = data?.find((item) => roleValidator(role, item.roles));

    const breadcrumb = roleBasedBreadcrumb?.data || data;

    if (breadcrumb.length < 2 && ignoreSingle) return null;

    const dropdownCrumbs = breadcrumb.length > maxItems ? breadcrumb.slice(1, -3) : null;
    const visibleCrumbs = dropdownCrumbs ? breadcrumb.slice(-3) : breadcrumb.slice(1);

    return (
        <Container className={classNames.container} maxWidth="var(--container-width)">
            <div
                ref={dropdownContainer}
                className={cls(styles.breadcrumbWrapper, className, classNames.wrapper)}
            >
                <Item data={breadcrumb[0]} className={classNames.item} renderItem={renderItem} />
                {breadcrumb.length > 1 && (
                    <Separator symbol={separator} className={classNames.separator} />
                )}
                {!!dropdownCrumbs?.length && (
                    <>
                        <DropdownMenu
                            align="start"
                            container={dropdownContainer.current}
                            className={styles.dropdownCrumbs}
                            trigger={
                                <div className={cls(styles.dropdownTrigger)}>
                                    <IconMenu />
                                </div>
                            }
                        >
                            {dropdownCrumbs.map((crumb, index) => (
                                <DropdownMenu.Item key={index}>
                                    <Item
                                        data={crumb}
                                        renderItem={renderItem}
                                        className={cls(styles.dropdownItem, classNames.item)}
                                        data-is-dropdown={true}
                                    >
                                        {crumb.label}
                                    </Item>
                                </DropdownMenu.Item>
                            ))}
                        </DropdownMenu>
                        <Separator symbol={separator} className={classNames.separator} />
                    </>
                )}
                {visibleCrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                        <Item
                            key={index}
                            data={item}
                            className={classNames.item}
                            index={index}
                            renderItem={renderItem}
                            data-last-visible={index === visibleCrumbs.length - 1}
                        />
                        {index !== visibleCrumbs.length - 1 && (
                            <Separator symbol={separator} className={classNames.separator} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </Container>
    );
}

export default Breadcrumb;
