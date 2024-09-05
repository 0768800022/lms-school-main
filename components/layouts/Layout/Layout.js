import React from "react";
import { defineMessages, useIntl } from "react-intl";
import Head from "next/head";
import classNames from "classnames";

import Breadcrumb from "../Breadcrumb";
import Footer from "../Footer";
import Header from "../Header";

import styles from "./Layout.module.scss";

const messages = defineMessages({
    pageTitle: {
        id: "common.pagetitle",
        defaultMessage: "LMS - Giải pháp quản lý trường học",
    },
});

function Body({ children, className }) {
    return <div className={classNames(styles.content, className)}>{children}</div>;
}

function Root({ children, title, className }) {
    const intl = useIntl();

    return (
        <>
            <Head>
                <title>{title || intl.formatMessage(messages.pageTitle)}</title>
            </Head>
            <main className={classNames(styles.masterLayout, className)}>{children}</main>
        </>
    );
}

function Layout({ children, title, breadcrumb, role }) {
    return (
        <Root title={title}>
            <Header />
            <Breadcrumb data={breadcrumb} role={role} />
            <Body>{children}</Body>
            <Footer />
        </Root>
    );
}

Layout.Body = Body;
Layout.Root = Root;
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Breadcrumb = Breadcrumb;

export default Layout;
