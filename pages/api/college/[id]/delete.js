import CollegeModel from "../../../../models/college";
import handleSession from "../../../../session/handle-session";
import { ADMIN_LEVEL } from "../../../../auth_constants/auth";

async function handler(req, res) {
	if (req.method === "DELETE") {
		try {
			const user = await handleSession({
				req,
				authLevel: [ADMIN_LEVEL],
			});

			if (!user) throw new Error("Unathorized");

			const { id } = req.query;

			const college = await CollegeModel.findByIdAndDelete(id);

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
