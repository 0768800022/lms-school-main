import { useEffect,useState } from "react";

const useInfiniteScroll = (callback, direction) => {
    const [ isFetching, setIsFetching ] = useState(false);
    const [ element, setElement ] = useState(null);
    const handleScroll = () => {
        if (direction === "top") {
            if (element.scrollTop === 0) {
                setIsFetching(true);
                console.log("top");
            }
        } else {
            if (element.scrollHeight - element.clientHeight - element.scrollTop <= 1) {
                setIsFetching(true);
                console.log("bottom");
            }
        }
    };

    useEffect(() => {
        console.log({element});
        if (element) {
            element.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (element) {
                element.removeEventListener("scroll", handleScroll);
            }
        };
    }, [ element ]);

    useEffect(() => {
        if (isFetching && callback) {
            callback();
        }
    }, [ isFetching ]);

    return { isFetching, setIsFetching, element, setElement };
};

export default useInfiniteScroll;
