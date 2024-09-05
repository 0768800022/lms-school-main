import * as RadixPopover from "@radix-ui/react-popover";
import classNames from "classnames";

import { FONT_FAMILY } from "@/fonts/config";
import useUncontrolled from "@/hooks/useUncontrolled";

import styles from "./Popover.module.scss";

function Popover({
    children,
    open,
    className,
    onOpenChange,
    align,
    sideOffset = 5,
    alignOffset,
    target,
    ...props
}) {
    const [ _open, _onOpenChange ] = useUncontrolled({ value: open, onChange: onOpenChange });
    return (
        <RadixPopover.Root open={_open} onOpenChange={_onOpenChange}>
            {target}
            <RadixPopover.Portal>
                <RadixPopover.Content
                    {...props}
                    align={align}
                    alignOffset={alignOffset}
                    sideOffset={sideOffset}
                    className={classNames(styles.content, FONT_FAMILY.className, className)}
                >
                    {children}
                </RadixPopover.Content>
            </RadixPopover.Portal>
        </RadixPopover.Root>
    );
}

function Target({
    children,
    preventOnClick,
    onClick,
    onMouseLeave,
    onMouseEnter,
    className,
    ...props
}) {
    return (
        <RadixPopover.Trigger
            {...props}
            asChild
            className={classNames({
                [className]: true,
                [styles.trigger]: true,
            })}
            onClick={(e) => {
                if (preventOnClick) {
                    e.preventDefault();
                }
                onClick?.(e);
            }}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
        >
            <div>{children}</div>
        </RadixPopover.Trigger>
    );
}

function Close({ className, children, ...props }) {
    return (
        <RadixPopover.Close {...props} className={className}>
            {children}
        </RadixPopover.Close>
    );
}

function Arrow({ className, ...props }) {
    return <RadixPopover.Arrow {...props} className={classNames(styles.arrow, className)} />;
}

Popover.Close = Close;
Popover.Arrow = Arrow;
Popover.Target = Target;

export default Popover;
