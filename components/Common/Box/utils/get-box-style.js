function mergeStyles(styles, theme) {
    if (Array.isArray(styles)) {
        return [ ...styles ].reduce((acc, item) => ({ ...acc, ...mergeStyles(item, theme) }), {});
    }

    if (typeof styles === "function") {
        return styles(theme);
    }

    if (styles == null) {
        return {};
    }

    return styles;
}

export function getBoxStyle({ theme, style, vars, styleProps }) {
    const _style = mergeStyles(style, theme);
    const _vars = mergeStyles(vars, theme);
    return { ..._style, ..._vars, ...styleProps };
}
