// import CollegeModel from "../../../../models/college";
import SessionModel from "../../../../models/session";
import handleSession from "../../../../session/handle-session";
import { ADMIN_LEVEL } from "../../../../auth_constants/auth";

async function handler(req, res) {
	if (req.method === "PUT") {
		try {
			const user = await handleSession({
				req,
				authLevel: [ADMIN_LEVEL],
			});

			if (!user) throw new Error("Unathorized");

			const { id } = req.query;

			const { level } = req.body;

			// console.log({ level });

			const session = await SessionModel.findByIdAndUpdate(id, { level });

			// await ProfileModel.create({ _userId: newUser.id });

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
