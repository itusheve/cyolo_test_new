const express = require("express");
const fileRouter = express.Router();
const multer = require("multer");
const { DEFAULT_TTL } = require("../config");
const { fileController } = require("../controller/file-controller");
const { fileFromDataUrl } = require("../utils");
const upload = multer({});

const BASE_API = process.env.BASE_API ?? "";


// PUT /v1/file (enctype="multipart/form-data")
fileRouter.put("/file", upload.single("image", {}), async (req, res) => {
	try {
		if (!req.file) return res.status(400).json({ message: "file required" });

		const imageTTL = req.headers["image-ttl"];
		const ttl = imageTTL ? Number(imageTTL) * 60 : DEFAULT_TTL;
		const { fileName } = await fileController.uploadFile({ file: req.file, ttl: ttl });
		const url = BASE_API + "/v1/" + fileName;

		res.json({ src: url, fileName });
	} catch (error) {
		res.status(500).json({ message: "internal error" });
	}
});

// GET /v1/file-url
fileRouter.get("/:filename", async (req, res) => {
	try {
		const filename = req.params.filename;
		const file = await fileController.getFile({ fileName: filename });
		if (!file) return res.status(400).json({ message: "file not found" });
		const { type, data } = fileFromDataUrl({ dataUrl: file });
		res.writeHead(200, {
			"Content-Type": type,
			"Content-Length": data.length,
		});
		res.end(data);
	} catch (error) {
		res.status(500).json({ message: "internal error" });
	}
});

module.exports = { fileRouter };
