import CollegeModel from "../../../models/college";
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

			const { name, abbr } = req.body;

			if (!name) {
				throw new Error("Enter name of college");
			} else if (!abbr) {
				throw new Error("Enter college abbrevation");
			}
			const college = await CollegeModel.create({
				name,
				abbr,
			});

			// await ProfileModel.create({ _userId: newUser.id });

			// await user.save();
			res.status(200).json({ ok: true, msg: "Success", college });
		} catch (error) {
			res.status(401).json({ ok: false, msg: error.message });
		}
	} else {
		// throw new Error("Invalid request method")
		res.status(400).json({ ok: false, msg: "invalid request method" });
	}
}

export default handler;
