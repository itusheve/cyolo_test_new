module.exports.fileToDataUrl = ({ file }) => {
	const fileAsBase64 = file.buffer.toString("base64");
	return `data:${file.mimetype};base64,${fileAsBase64}`;
};

module.exports.fileFromDataUrl = ({ dataUrl }) => {
	let data = dataUrl.split(";base64,");
	const type = data[0].substr(5); // get mimetype
	data = Buffer.from(data[1], "base64");
	return { type, data };
};
