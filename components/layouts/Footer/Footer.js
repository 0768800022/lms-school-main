import React from "react";
import { FormattedMessage } from "react-intl";
import classNames from "classnames";

import styles from "./Footer.module.scss";

function Footer({ className }) {
    return (
        <div className={classNames(styles.wrapper, className)}>
            <FormattedMessage
                defaultMessage="© 2024 Copyright by DTP Education Solutions"
                id="components.layouts.Footer.Footer.content"
            />
        </div>
    );
}

export default Footer;
