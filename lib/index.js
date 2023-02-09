import fs from "fs";

export function uniqueFilename(filename, newFilename) {
	const fileExtension = filename.split(".").pop();
	const uniqueName = Math.random().toString(36).substring(2, 15);
	return `${newFilename}${uniqueName}.${fileExtension}`;
}

export const saveFile = async (file, folder) => {
	const newFileName = uniqueFilename(file.originalFilename, file.newFilename);
	const data = fs.readFileSync(file.filepath);
	const currentDir = process.cwd();
	// console.log(currentDir);

	const basePath = `${currentDir}/public/${folder}/`;

	try {
		if (!fs.existsSync(basePath)) {
			fs.mkdirSync(basePath);
		}
	} catch (err) {
		console.error(err);
		return false;
	}

	const uploadPath = `${basePath}${newFileName}`;

	// console.log(uploadPath);

	fs.writeFileSync(uploadPath, data);
	fs.unlinkSync(file.filepath);
	return newFileName;
};

export const stringifyDoc = (doc) => {
	return JSON.parse(JSON.stringify(doc));
};
