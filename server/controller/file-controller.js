const { DB } = require("../database/db");
const { v4: uuidv4 } = require("uuid");
const { fileToDataUrl } = require("../utils");

module.exports.fileController = {
	async uploadFile({ file, ttl }) {
		const fileName = uuidv4();

		await DB.set(fileName, fileToDataUrl({ file }), "EX", ttl);
	
		return { fileName };
	},
	async getFile({ fileName }) {
		const file = await DB.get(fileName);
		return file;
	},
};
