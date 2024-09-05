import React, { useEffect, useState } from "react";
import * as SwitchRadix from "@radix-ui/react-switch";

import useUncontrolled from "@/hooks/useUncontrolled";

import styles from "./Switch.module.scss";

function Switch({ value, onChange, ...props }) {
    const [ _checked, _onChange ] = useUncontrolled({ value, onChange });
    delete props?.error;

    const onCheckedChange = (checked) => {
        _onChange(checked);
    };

    useEffect(() => {
        _onChange(value);
    }, [ value ]);

    return (
        <SwitchRadix.Root
            value={_checked}
            className={styles.wrapper}
            checked={_checked}
            onChange={_onChange}
            onCheckedChange={onCheckedChange}
            {...props}
        >
            <Thumb />
        </SwitchRadix.Root>
    );
}

const Thumb = () => <SwitchRadix.Thumb className={styles.thumb} />;

Switch.Thumb = Thumb;

export default Switch;
