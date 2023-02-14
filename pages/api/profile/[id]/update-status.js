import ProfileModel from "../../../../models/profile";
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

			const { status } = req.body;
			const id = req.query.id;

			if (!status) {
				throw new Error("Please, select a status");
			}

			console.log(status, id);

			await ProfileModel.findByIdAndUpdate(id, { status });

			res.status(200).json({ ok: true, msg: "Success" });
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
