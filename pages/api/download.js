const path = require("path");
const axios = require("axios");

export default async function handler(req, res) {
    const { fileUrl } = req.query;
    try {
        const response = await axios.get(fileUrl, { responseType: "stream" });

        const fileName = path.basename(fileUrl);
        const contentType = response.headers["content-type"] || "application/octet-stream";

        res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
        res.setHeader("Content-Type", contentType);

        response.data.pipe(res);
    } catch (error) {
        console.error("Error fetching or sending file:", error);
        res.status(500).send("Error fetching or sending file");
    }
}
