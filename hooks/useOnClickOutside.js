import { useEffect, useRef } from "react";

export function useOnClickOutside(ref, handler, eventType = "mousedown") {
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    });

    useEffect(() => {
        const handleClickOutside = (event) => {
            const target = event.target;

            if (!target || !target.isConnected || !ref.current) {
                return;
            }

            const isOutside = !ref.current.contains(target);

            if (isOutside) {
                handlerRef.current(event);
            }
        };

        window.addEventListener(eventType, handleClickOutside);

        return () => {
            window.removeEventListener(eventType, handleClickOutside);
        };
    }, []);
}
