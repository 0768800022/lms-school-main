import React, { useEffect, useState } from "react";

import styles from "./Loading.module.scss";

function Loading({ show }) {
    const [ mounted, setMounted ] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            {show && mounted && (
                <div className={styles.loadingProcess}>
                    <div className={styles.loadingComponent}></div>
                </div>
            )}
        </>
    );
}

export default Loading;
