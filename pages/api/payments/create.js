import PaymentListModel from "../../../models/payment-list";
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

			const { title, amount, college, department, session } = req.body;

			if (!title) {
				throw new Error("Enter title of payment");
			} else if (!amount) {
				throw new Error("Enter amount of payment");
			} else if (!college) {
				throw new Error("Select a college");
			} else if (!department) {
				throw new Error("Select a department");
			} else if (!session) {
				throw new Error("Select an academic session");
			}

			const payment = await PaymentListModel.create({
				title,
				amount,
				_collegeId: college,
				_departmentId: department,
				_sessionId: session,
			});

			// await user.save();
			res.status(200).json({ ok: true, msg: "Success", payment });
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
