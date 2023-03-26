import mongoose from "mongoose";

const paymentListSchema = new mongoose.Schema(
    {
        title: String,
        amount: Number,
        _collegeId: String, // all | college _id
        _departmentId: String, // all | department _id
        _sessionId: String,
        sessionInfo: String, // session title (level)
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const PaymentListModel =
    mongoose?.models?.PaymentList ||
    mongoose.model("PaymentList", paymentListSchema);

export default PaymentListModel;
