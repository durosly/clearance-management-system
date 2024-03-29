import PaymentListModel from "../../../models/payment-list";
import PaymentModel from "../../../models/payment";
import ProfileModel from "../../../models/profile";
import SessionModel from "../../../models/session";
import handleSession from "../../../session/handle-session";
import { getFullPaymentData } from "../../../lib";
import { STUDENT_LEVEL } from "../../../auth_constants/auth";

async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const user = await handleSession({
                req,
                authLevel: [STUDENT_LEVEL],
            });

            if (!user) throw new Error("Unathorized");

            const { id, reference, title, amount } = req.body;

            if (!title) {
                throw new Error("Enter title of payment");
            } else if (!amount) {
                throw new Error("Enter amount of payment");
            } else if (!id) {
                throw new Error("A payment item was not selected");
            } else if (!reference) {
                throw new Error("Payment may not have been successful");
            }

            const paymentListItem = await PaymentListModel.findById(id);

            const profile = await ProfileModel.findOne({ _userId: user.id });
            const session = await SessionModel.findById(profile._sessionId);

            const payment = await PaymentModel.create({
                title,
                amount: paymentListItem.amount,
                reference,
                _collegeId: paymentListItem._collegeId,
                _departmentId: paymentListItem._departmentId,
                _sessionId: paymentListItem._sessionId,
                sessionInfo: `${session.title} (${session.level})`,
                _userId: user.id,
                _paymentListId: paymentListItem.id,
            });

            const paymentList = await PaymentListModel.find({
                _collegeId: { $in: ["all", profile._collegeId] },
                _departmentId: { $in: ["all", profile._departmentId] },
                _sessionId: profile._sessionId,
                sessionInfo: `${session.title} (${session.level})`,
            });

            const paymentsDone = await PaymentModel.find({
                sessionInfo: `${session.title} (${session.level})`,
                _userId: user.id,
            });

            if (paymentList.length === paymentsDone.length) {
                profile.clearanceLevel = 3;
                await profile.save();
            }

            const fullData = await getFullPaymentData(payment);

            // await user.save();
            res.status(200).json({
                ok: true,
                msg: "Success",
                payment: fullData,
            });
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
