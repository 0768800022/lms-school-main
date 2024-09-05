import React, { useEffect } from "react";
import Router from "next/router";
import * as NProgress from "nprogress";

const NavigateProgress = ({
    color = "#0CA6ED",
    startPosition = 0.2,
    stopDelayMs = 200,
    height = 3,
    showOnShallow = false,
    options,
    nonce,
}) => {
    let timer = null;

    useEffect(() => {
        if (options) {
            NProgress.configure(options);
        }
        Router.events.on("routeChangeStart", routeChangeStart);
        Router.events.on("routeChangeComplete", routeChangeEnd);
        Router.events.on("routeChangeError", routeChangeError);
        return () => {
            Router.events.off("routeChangeStart", routeChangeStart);
            Router.events.off("routeChangeComplete", routeChangeEnd);
            Router.events.off("routeChangeError", routeChangeError);
        };
    }, []);

    const routeChangeStart = (_, { shallow }) => {
        if (!shallow || showOnShallow) {
            NProgress.set(startPosition);
            NProgress.start();
        }
    };

    const routeChangeEnd = (_, { shallow }) => {
        if (!shallow || showOnShallow) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                NProgress.done(true);
            }, stopDelayMs);
        }
    };

    const routeChangeError = (_err, _url, { shallow }) => {
        if (!shallow || showOnShallow) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                NProgress.done(true);
            }, stopDelayMs);
        }
    };

    return (
        // eslint-disable-next-line react/no-unknown-property
        <style nonce={nonce} jsx global>
            {`
                #nprogress {
                    pointer-events: none;
                }
                #nprogress .bar {
                    background: ${color};
                    position: fixed;
                    z-index: 9999;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: ${height}px;
                }
                #nprogress .peg {
                    display: block;
                    position: absolute;
                    right: 0px;
                    width: 100px;
                    height: 100%;
                    box-shadow:
                        0 0 10px ${color},
                        0 0 5px ${color};
                    opacity: 1;
                    -webkit-transform: rotate(3deg) translate(0px, -4px);
                    -ms-transform: rotate(3deg) translate(0px, -4px);
                    transform: rotate(3deg) translate(0px, -4px);
                }
                #nprogress .spinner {
                    display: block;
                    position: fixed;
                    z-index: 1031;
                    top: 15px;
                    right: 15px;
                }
                #nprogress .spinner-icon {
                    width: 18px;
                    height: 18px;
                    box-sizing: border-box;
                    border: solid 2px transparent;
                    border-top-color: ${color};
                    border-left-color: ${color};
                    border-radius: 50%;
                    -webkit-animation: nprogresss-spinner 400ms linear infinite;
                    animation: nprogress-spinner 400ms linear infinite;
                }
                .nprogress-custom-parent {
                    overflow: hidden;
                    position: relative;
                }
                .nprogress-custom-parent #nprogress .spinner,
                .nprogress-custom-parent #nprogress .bar {
                    position: absolute;
                }
                @-webkit-keyframes nprogress-spinner {
                    0% {
                        -webkit-transform: rotate(0deg);
                    }
                    100% {
                        -webkit-transform: rotate(360deg);
                    }
                }
                @keyframes nprogress-spinner {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}
        </style>
    );
};

export default React.memo(NavigateProgress);
