import { useState } from "react";

import { useIsMounted } from "./useIsMounted";

// prevent: Can't perform a React state update on an unmounted component
// useful when we want to setState when fetch data in useEffect

function useMountedState(initialState) {
    const [ state, _setState ] = useState(initialState);
    const isMounted = useIsMounted();

    const setState = (newState) => {
        if (isMounted()) {
            _setState(newState);
        }
    };

    return [ state, setState ];
}

export default useMountedState;
