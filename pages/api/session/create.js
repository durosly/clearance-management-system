import SessionModel from "../../../models/session";
import handleSession from "../../../session/handle-session";
import { ADMIN_LEVEL } from "../../../auth_constants/auth";

async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const user = await handleSession({
				req,
				authLevel: [ADMIN_LEVEL],
			});

			if (!user) throw new Error("Unathorized");

			const { title, year } = req.body;

			if (!title) {
				throw new Error("Enter title of session");
			} else if (!year) {
				throw new Error("Enter year of admission");
			}
			const session = await SessionModel.create({
				title,
				year,
			});

			// await user.save();
			res.status(200).json({ ok: true, msg: "Success", session });
		} catch (error) {
			res.status(401).json({ ok: false, msg: error.message });
		}
	} else {
		// throw new Error("Invalid request method")
		res.status(400).json({ ok: false, msg: "invalid request method" });
	}
}

export default handler;
