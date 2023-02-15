import CourseRegModel from "../../../models/course-reg";
import SessionModel from "../../../models/session";
import ProfileModel from "../../../models/profile";
import handleSession from "../../../session/handle-session";
import { STUDENT_LEVEL } from "../../../auth_constants/auth";

async function handler(req, res) {
	if (req.method === "POST") {
		try {
			const user = await handleSession({
				req,
				authLevel: [STUDENT_LEVEL],
			});

			if (!user) throw new Error("Unathorized");

			const { registerCourse } = req.body;

			// console.log(registerCourse);

			if (!registerCourse || registerCourse.length < 1) {
				throw new Error("Select atleast a course to register");
			}

			const userProfile = await ProfileModel.findOne({
				_userId: user.id,
			});
			const userSession = await SessionModel.findById(
				userProfile._sessionId
			);

			await CourseRegModel.findOneAndDelete({
				_userId: user.id,
				level: userSession.level,
			});

			const course = await CourseRegModel.create({
				_userId: user.id,
				_courseIds: registerCourse,
				level: userSession.level,
			});

			// await ProfileModel.create({ _userId: newUser.id });

			// await user.save();
			res.status(200).json({ ok: true, msg: "Success", course });
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
