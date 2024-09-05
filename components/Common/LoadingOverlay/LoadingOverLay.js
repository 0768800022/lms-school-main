// components/LoadingOverlay.js

import { useAppLoading } from "./LoadingOverlayProvider";

import styles from "./LoadingOverlay.module.scss";

const LoadingOverlay = () => {
    const { loading } = useAppLoading();
    return (
        <div className={styles.overlayContainer}>
            {loading && (
                <div className={styles.overlay}>
                    <div className={styles.loader}></div>
                </div>
            )}
        </div>
    );
};

export default LoadingOverlay;
