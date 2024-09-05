import { createProxyMiddleware } from "http-proxy-middleware";

import paths from "@/constants/paths";
import { cleanObject } from "@/utils";
import { hashSecureToken, rewriteUrl } from "@/utils/string";
import { getResourceDetail } from "@/services/api/resource";

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};

export default async function handler(req, res) {
    const url = req.url;
    const path = req.query.path[0];

    try {
        const resResource = await getResourceDetail({
            data: { id: path },
            context: {
                req,
                res,
            },
        });

        const resourceData = resResource.data;

        if (!resourceData?.thirdPartyResourceId) {
            return res.writeHead(307, { Location: paths.notFound }).end();
        }

        const secureToken = hashSecureToken(
            path,
            process.env.PRACTICE_TEST_SECRET_KEY,
        );

        const newPath = rewriteUrl({
            dataPassQuery: cleanObject(
                {
                    secureKey: path,
                    unitTestId: resourceData.thirdPartyResourceId,
                    isPreview: true,
                },
                { clear: [ undefined, "", null ] },
            ),
            configUrl: {
                redirect: "?practiceTestSlug=",
            },
        });

        const proxy = createProxyMiddleware({
            target: process.env.NEXT_PUBLIC_ITEST4U_URL,
            pathRewrite: {
                [url]: `/thirdparty/practice-test${newPath}`,
            },
            changeOrigin: true,
            headers: {
                "thirdparty-secure-token": secureToken,
            },
        });

        proxy(req, res, (err) => {
            if (err) {
                res.status(500).json({ error: "Proxy error" });
            }
        });
    } catch (err) {
        res.writeHead(307, { Location: paths.forbidden }).end();
    }
}
