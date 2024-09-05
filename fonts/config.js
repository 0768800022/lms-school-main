import localFont from "next/font/local";

export const FONT_FAMILY = localFont({
    src: [
        {
            path: "./SF-Pro-Display-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "./SF-Pro-Display-RegularItalic.ttf",
            weight: "400",
            style: "italic",
        },
        {
            path: "./SF-Pro-Display-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "./SF-Pro-Display-MediumItalic.ttf",
            weight: "500",
            style: "italic",
        },
        {
            path: "./SF-Pro-Display-Semibold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "./SF-Pro-Display-SemiboldItalic.ttf",
            weight: "600",
            style: "italic",
        },
        {
            path: "./SF-Pro-Display-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "./SF-Pro-Display-BoldItalic.ttf",
            weight: "700",
            style: "italic",
        },
    ],
});
