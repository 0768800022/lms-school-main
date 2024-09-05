import { Children } from "react";

function Stepper({ children, active }) {
    const convertedChildren = Children.toArray(children);
    const _children = convertedChildren.filter((child) => child.type === Step);
    const content = _children[active]?.props?.children;

    return content ? content : null;
}

function Step({ children }) {
    return children;
}

Stepper.Step = Step;

export default Stepper;
