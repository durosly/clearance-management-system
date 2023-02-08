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

			const { jambreg, dob, soo, loo, sor, lor, address } = req.body;

			if (!jambreg) {
				throw new Error("Enter jamb registration number");
			} else if (!dob) {
				throw new Error("Enter date of birth");
			} else if (!soo) {
				throw new Error("Enter State of origin");
			} else if (!loo) {
				throw new Error("Enter Local government of origin");
			} else if (!sor) {
				throw new Error("Enter State of residence");
			} else if (!lor) {
				throw new Error("Enter Local government of residence");
			} else if (!address) {
				throw new Error("Enter Address");
			}
			await ProfileModel.create({
				_userId: user.id,
				jambreg,
				dob,
				stateoforigin: soo,
				localoforigin: loo,
				stateofresidence: sor,
				localofresidence: lor,
				address,
			});

			// await ProfileModel.create({ _userId: newUser.id });

			// await user.save();
			res.status(200).json({ ok: true, msg: "Success" });
		} catch (error) {
			res.status(401).json({ ok: false, msg: error.message });
		}
	} else {
		// throw new Error("Invalid request method")
		res.status(400).json({ ok: false, msg: "invalid request method" });
	}
}

export default handler;
