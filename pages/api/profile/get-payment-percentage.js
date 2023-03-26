import ProfileModel from "../../../models/profile";
import handleSession from "../../../session/handle-session";
import { STUDENT_LEVEL } from "../../../auth_constants/auth";
import PaymentListModel from "../../../models/payment-list";
import PaymentModel from "../../../models/payment";
import SessionModel from "../../../models/session";

async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const user = await handleSession({
                req,
                authLevel: [STUDENT_LEVEL],
            });

            if (!user) throw new Error("Unathorized");

            const profile = await ProfileModel.findOne({ _userId: user.id });
            const sessionDB = await SessionModel.findById(profile._sessionId);

            const paymentList = await PaymentListModel.find({
                _collegeId: { $in: ["all", profile._collegeId] },
                _departmentId: { $in: ["all", profile._departmentId] },
                _sessionId: profile._sessionId,
                sessionInfo: `${sessionDB.title} (${sessionDB.level})`,
            });

            if (!sessionDB) {
                return res
                    .status(200)
                    .json({ ok: true, msg: "Success", percentage: 0 });
            }
            const paymentsDone = await PaymentModel.find({
                sessionInfo: `${sessionDB.title} (${sessionDB.level})`,
                _userId: user.id,
            });

            const percentage = (paymentsDone.length / paymentList.length) * 100;

            res.status(200).json({ ok: true, msg: "Success", percentage });
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
