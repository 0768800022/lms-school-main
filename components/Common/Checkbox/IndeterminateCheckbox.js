import React, { useEffect, useRef } from "react";

import Checkbox from "./Checkbox";

const IndeterminateCheckbox = ({ indeterminate, className = "", ...rest }) => {
    const ref = useRef();

    useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ ref, indeterminate ]);

    return (
        <Checkbox type="checkbox" ref={ref} className={className + " cursor-pointer"} {...rest} />
    );
};

export default IndeterminateCheckbox;
