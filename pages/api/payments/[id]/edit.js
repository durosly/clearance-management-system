// import CollegeModel from "../../../../models/college";
// import DepartmentModel from "../../../../models/department";
import PaymentListModel from "../../../../models/payment-list";
import handleSession from "../../../../session/handle-session";
import { getFullPaymentData } from "../../../../lib";
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
			const { amount } = req.body;

			if (!amount) throw new Error("Enter new payment fee");

			const paymentDB = await PaymentListModel.findByIdAndUpdate(
				id,
				{
					amount,
				},
				{
					new: true,
				}
			);
			const payment = await getFullPaymentData(paymentDB);

			res.status(200).json({ ok: true, msg: "Success", payment });
		} catch (error) {
			res.status(401).json({ ok: false, msg: error.message });
		}
	} else {
		// throw new Error("Invalid request method")
		res.status(400).json({ ok: false, msg: "invalid request method" });
	}
}

export default handler;
