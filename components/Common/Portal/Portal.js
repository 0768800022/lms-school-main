import React, { forwardRef,useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useLayoutEffect } from "@/hooks/useLayoutEffect";

import styles from "./Portal.module.scss";

function createPortalNode(props) {
    const node = document.createElement("div");
    node.setAttribute("data-portal", "true");
    node.classList.add(styles.portal);

    typeof props.className === "string" &&
        node.classList.add(...props.className.split(" "));
    typeof props.style === "object" && Object.assign(node.style, props.style);
    typeof props.id === "string" && node.setAttribute("id", props.id);
    return node;
}

const Portal = forwardRef(({ children, target, ...others }, ref) => {
    const [ mounted, setMounted ] = useState(false);
    const nodeRef = useRef(null);

    useLayoutEffect(() => {
        setMounted(true);
        nodeRef.current = !target
            ? createPortalNode(others)
            : typeof target === "string"
                ? document.querySelector(target)
                : target;

        ref = nodeRef.current;

        if (!target && nodeRef.current) {
            document.body.appendChild(nodeRef.current);
        }

        return () => {
            if (!target && nodeRef.current) {
                document.body.removeChild(nodeRef.current);
            }
        };
    }, [ target ]);

    if (!mounted || !nodeRef.current) {
        return null;
    }

    return createPortal(<>{children}</>, nodeRef.current);
});

Portal.displayName = "Portal";

export default Portal;
