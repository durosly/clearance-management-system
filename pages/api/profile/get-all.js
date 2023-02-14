import ProfileModel from "../../../models/profile";
import handleSession from "../../../session/handle-session";
import { ADMIN_LEVEL } from "../../../auth_constants/auth";

async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const user = await handleSession({
				req,
				authLevel: [ADMIN_LEVEL],
			});

			if (!user) throw new Error("Unathorized");

			const { coll, dept, session } = req.query;

			const query = {};

			if (coll) {
				query._collegeId = coll;
			}
			if (dept) {
				query._departmentId = dept;
			}
			if (session) {
				query._sessionId = session;
			}

			const profiles = await ProfileModel.find(query);

			// await ProfileModel.create({ _userId: newUser.id });

			// await user.save();
			res.status(200).json({ ok: true, msg: "Success", profiles });
		} catch (error) {
			console.log(error.message);
			res.status(401).json({ ok: false, msg: error.message });
		}
	} else {
		// throw new Error("Invalid request method")
		res.status(400).json({ ok: false, msg: "invalid request method" });
	}
}

export default handler;
