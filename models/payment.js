import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
	title: String,
	_userId: String,
	created_at: { type: Date, default: Date.now },
	_collegeId: String,
	_paymentListId: String,
	reference: String,
	_sessionid: String,
});

const PaymentModel =
	mongoose?.models?.Payment || mongoose.model("Payment", paymentSchema);

export default PaymentModel;
