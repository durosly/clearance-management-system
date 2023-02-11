import CourseModel from "../../../models/course";
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

			const { title, code, unit, semester, department, level } = req.body;

			if (!title) {
				throw new Error("Enter title of course");
			} else if (!code) {
				throw new Error("Enter course code");
			} else if (!unit) {
				throw new Error("Enter course unit");
			} else if (!semester) {
				throw new Error("Enter course semester");
			} else if (!department) {
				throw new Error("Select course department");
			} else if (!level) {
				throw new Error("Enter course level");
			}

			const course = await CourseModel.create({
				title,
				code,
				unit,
				semester,
				_departmentId: department,
				level,
			});

			// await ProfileModel.create({ _userId: newUser.id });

			// await user.save();
			res.status(200).json({ ok: true, msg: "Success", course });
		} catch (error) {
			res.status(401).json({ ok: false, msg: error.message });
		}
	} else {
		// throw new Error("Invalid request method")
		res.status(400).json({ ok: false, msg: "invalid request method" });
	}
}

export default handler;
