import { filterProps } from "./filter-props";

export function extractStyleProps(others) {
    const {
        m,
        mx,
        my,
        mt,
        mb,
        ml,
        mr,
        p,
        px,
        py,
        pt,
        pb,
        pl,
        pr,
        bg,
        c,
        opacity,
        ff,
        fz,
        fw,
        lts,
        ta,
        lh,
        fs,
        tt,
        td,
        w,
        miw,
        maw,
        h,
        mih,
        mah,
        bgsz,
        bgp,
        bgr,
        bga,
        pos,
        top,
        left,
        bottom,
        right,
        inset,
        display,
        flex,
        hiddenFrom,
        visibleFrom,
        lightHidden,
        darkHidden,
        ...rest
    } = others;

    const styleProps = filterProps({
        m,
        mx,
        my,
        mt,
        mb,
        ml,
        mr,
        p,
        px,
        py,
        pt,
        pb,
        pl,
        pr,
        bg,
        c,
        opacity,
        ff,
        fz,
        fw,
        lts,
        ta,
        lh,
        fs,
        tt,
        td,
        w,
        miw,
        maw,
        h,
        mih,
        mah,
        bgsz,
        bgp,
        bgr,
        bga,
        pos,
        top,
        left,
        bottom,
        right,
        inset,
        display,
        flex,
        hiddenFrom,
        visibleFrom,
        lightHidden,
        darkHidden,
    });

    return { styleProps, rest: rest };
}
