import CollegeModel from "../../../models/college";
import DepartmentModel from "../../../models/department";
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

			const { name, abbr, college, duration } = req.body;

			if (!name) {
				throw new Error("Enter name of college");
			} else if (!abbr) {
				throw new Error("Enter college abbrevation");
			}
			const departmentDB = await DepartmentModel.create({
				name,
				abbr,
				_collegeId: college,
				duration,
			});

			const collegeDB = CollegeModel.findById(college);
			// await ProfileModel.create({ _userId: newUser.id });

			const department = {
				_id: departmentDB._id,
				name: departmentDB.name,
				abbr: departmentDB.abbr,
				duration: departmentDB.duration,
				college_name: collegeDB.name,
			};

			// await user.save();
			res.status(200).json({ ok: true, msg: "Success", department });
		} catch (error) {
			res.status(401).json({ ok: false, msg: error.message });
		}
	} else {
		// throw new Error("Invalid request method")
		res.status(400).json({ ok: false, msg: "invalid request method" });
	}
}

export default handler;
