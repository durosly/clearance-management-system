import mongoose from "mongoose";

const paymentListSchema = new mongoose.Schema({
	title: String,
	amount: Number,
	created_at: { type: Date, default: Date.now },
	_collegeId: String, // all | college _id
	_departmentId: String, // all | department _id
});

const PaymentListModel =
	mongoose?.models?.PaymentList ||
	mongoose.model("PaymentList", paymentListSchema);

export default PaymentListModel;
