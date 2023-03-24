import SessionModel from "../../../models/session";
import handleSession from "../../../session/handle-session";
import { ADMIN_LEVEL } from "../../../auth_constants/auth";
import ProfileModel from "../../../models/profile";
import MatricNumberModel from "../../../models/matricnumber";
import DepartmentModel from "../../../models/department";

async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const user = await handleSession({
                req,
                authLevel: [ADMIN_LEVEL],
            });

            if (!user) throw new Error("Unathorized");

            const session = await SessionModel.findOne({ level: 100 })
                .sort("-created_at")
                .limit(1);

            if (!session) throw new Error("No session found for 100 level");

            const students = await ProfileModel.find({
                _sessionId: session.id,
            });

            for (const student of students) {
                if (!student?.matricnumber) {
                    let count = 0;
                    // get last matric number for current session
                    const lastMatricNumberCount =
                        await MatricNumberModel.findOne({
                            _sessionId: session.id,
                        })
                            .sort("-created_at")
                            .limit(1);
                    // if none start from 1000

                    if (!lastMatricNumberCount) {
                        count = 1000;
                    } else {
                        count = Number(lastMatricNumberCount.count) + 1;
                    }
                    // get department
                    const department = await DepartmentModel.findById(
                        student._departmentId
                    );

                    // construct mat number from dept and session year
                    const matNum = `${department.abbr}/${count}/${session.year}`;
                    // add to matric number count
                    await MatricNumberModel.create({
                        _userId: student.id,
                        _collegeId: student._collegeId,
                        _sessionId: session.id,
                        _departmentId: department.id,
                        count,
                    });
                    // update user profile
                    student.matricnumber = matNum;
                    await student.save();
                    console.log("needs mat number");
                }
            }

            // await user.save();
            res.status(200).json({ ok: true, msg: "Success" });
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
