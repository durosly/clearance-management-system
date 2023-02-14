import formidable from "formidable";
import handleSession from "../../../session/handle-session";
// import CategoryModel from "../../../models/category";
import ProfileModel from "../../../models/profile";
import { saveFile } from "../../../lib";
import { STUDENT_LEVEL } from "../../../auth_constants/auth";
import { BIRTH_CERTIFICATE_FOLDER } from "../../../constants";

export const config = {
	api: {
		bodyParser: false,
	},
};

async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const user = await handleSession({
				req,
				authLevel: [STUDENT_LEVEL],
			});

			if (!user) {
				throw new Error("Unathorized");
			}

			// const form = new formidable.IncomingForm();

			const fData = await new Promise((resolve, reject) => {
				const form = new formidable.IncomingForm();
				form.parse(req, (err, fields, files) => {
					if (err) return reject(err);
					resolve({ fields, files });
				});
			});

			const file = fData.files.img;
			// console.log({ fData });
			const filename = await saveFile(file, BIRTH_CERTIFICATE_FOLDER);

			await ProfileModel.findOneAndUpdate(
				{ _userId: user.id },
				{
					birthcertificate: filename,
					clearanceLevel: 2,
				}
			);

			res.status(200).json({
				ok: true,
				msg: "uploaded successfully",
				file: filename,
			});
		} catch (error) {
			res.status(401).json({ ok: false, msg: error.message });
		}
	} else {
		// throw new Error("Invalid request method")
		res.status(400).json({ ok: false, msg: "invalid request method" });
	}
}

export default handler;
