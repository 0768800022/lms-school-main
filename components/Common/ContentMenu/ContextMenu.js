import * as RadixContextMenu from "@radix-ui/react-context-menu";
import classNames from "classnames";

import styles from "./ContextMenu.module.scss";

const ContextMenu = ({
    trigger,
    children,
    className,
    align,
    sideOffset = 5,
    alignOffset,
    MenuItem = BaseMenuItem,
    menus,
    modal,
    onOpenChange,
    ...props
}) => {
    return (
        <RadixContextMenu.Root modal={modal} onOpenChange={onOpenChange}>
            {trigger}
            <RadixContextMenu.Portal>
                <RadixContextMenu.Content
                    {...props}
                    align={align}
                    alignOffset={alignOffset}
                    sideOffset={sideOffset}
                    className={classNames(styles.content, className)}
                >
                    {children ??
                        (menus || []).map(({ className, ...itemProp }, index) => (
                            <MenuItem
                                key={index}
                                className={classNames(styles.menuItem, className)}
                                {...itemProp}
                            />
                        ))}
                </RadixContextMenu.Content>
            </RadixContextMenu.Portal>
        </RadixContextMenu.Root>
    );
};

const Trigger = ({ children, disabled }) => (
    <RadixContextMenu.Trigger asChild disabled={disabled}>
        {children}
    </RadixContextMenu.Trigger>
);

const BaseMenuItem = ({ className, onClick, icon, label }) => (
    <RadixContextMenu.Item className={className} onClick={onClick}>
        {icon}
        <div className={styles.label}>{label}</div>
    </RadixContextMenu.Item>
);

ContextMenu.Trigger = Trigger;

export default ContextMenu;
