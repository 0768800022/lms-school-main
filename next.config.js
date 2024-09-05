/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: "/:path*",
                destination: `${process.env.NEXT_PUBLIC_ITEST4U_URL}/:path*`,
                has: [
                    {
                        type: "header",
                        key: "referer",
                        value: "^.*/preview-resource/.*",
                    },
                ],
            },
            {
                source: "/preview-resource/:path*",
                destination: "/api/proxy",
            },
        ];
    },
    webpack: (config) => {
        // https://react-svgr.com/docs/next/
        // Grab the existing rule that handles SVG imports
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));

        config.module.rules.push(
            // Reapply the existing rule, but only for svg imports ending in ?url
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            // Convert all other *.svg imports to React components
            {
                test: /\.svg$/i,
                issuer: /\.(js|jsx)?$/,
                resourceQuery: { not: /url/ }, // exclude if *.svg?url
                use: [ { loader: "@svgr/webpack", options: { dimensions: false } } ],
            },
        );

        // Modify the file loader rule to ignore *.svg, since we have it handled now.
        fileLoaderRule.exclude = /\.svg$/i;

        for (const rule of config.module.rules) {
            if (rule.oneOf && Array.isArray(rule.oneOf)) {
                for (const moduleLoader of rule.oneOf) {
                    if (Array.isArray(moduleLoader.use)) {
                        moduleLoader.use.forEach((loader) => {
                            const isCssLoader =
                                typeof loader.loader === "string" &&
                                loader.loader.includes("css-loader");
                            const isPostCssLoader =
                                typeof loader.loader === "string" &&
                                loader.loader.includes("postcss-loader");

                            if (isCssLoader && !isPostCssLoader) {
                                const loaderOptions = loader.options;
                                if (loaderOptions && loaderOptions.modules) {
                                    loaderOptions.modules = {
                                        ...loaderOptions.modules,
                                        exportLocalsConvention: "camelCaseOnly",
                                    };
                                }
                            }
                        });
                    }
                }
            }
        }

        return config;
    },
    sassOptions: {
        prependData: `@use "./styles/mixins.scss" as *;`,
    },
};

module.exports = nextConfig;
