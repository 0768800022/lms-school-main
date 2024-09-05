import React from "react";
import classNames from "classnames";

import NoteIcon from "@/public/icons/note-icon.svg";

import styles from "./Note.module.scss";

function Note({ type = "info", title = "Ghi chú", content }) {
    return (
        <div
            className={classNames({
                [styles.wrapper]: true,
                [styles.error]: type === "error",
                [styles.info]: type === "info",
                [styles.warning]: type === "warning",
            })}
        >
            <div className={styles.cover}>
                <div className={styles.coverIcon}>
                    <NoteIcon />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                <div className={styles.description}>
                    {content}
                </div>
            </div>
        </div>
    );
}

export default Note;
