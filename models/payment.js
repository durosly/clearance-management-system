import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
	{
		title: String,
		_userId: String,
		amount: Number,
		_collegeId: String,
		_departmentId: String,
		_paymentListId: String,
		reference: String,
		_sessionId: String,
		sessionInfo: String,
	},
	{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const PaymentModel =
	mongoose?.models?.Payment || mongoose.model("Payment", paymentSchema);

export default PaymentModel;
