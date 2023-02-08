import formidable from "formidable";
import { handleSession } from "../../../session/handle-session";
// import CategoryModel from "../../../models/category";
import FoodModel from "../../../../models/food";
import { saveFile } from "../../../lib";
import { STUDENT_LEVEL } from "../../../auth_constants/auth";

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

			// console.log(productId);

			const files = [];

			for (const img in fData.files) {
				const file = fData.files[img];
				const filename = await saveFile(file);

				await FoodModel.findByIdAndUpdate(productId, {
					$addToSet: { images: filename },
				});
				files.push(filename);
				// console.log(file);
			}

			res.status(200).json({ ok: true, msg: "nice", files });
		} catch (error) {
			res.status(401).json({ ok: false, msg: error.message });
		}
	} else {
		// throw new Error("Invalid request method")
		res.status(400).json({ ok: false, msg: "invalid request method" });
	}
}

export default withSessionRoute(handler);
