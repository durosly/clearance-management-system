import CourseRegModel from "../../../../../models/course-reg";
import handleSession from "../../../../../session/handle-session";
import { ADMIN_LEVEL } from "../../../../../auth_constants/auth";

async function handler(req, res) {
    if (req.method === "PUT") {
        const { id } = req.query;

        try {
            const user = await handleSession({
                req,
                authLevel: [ADMIN_LEVEL],
            });

            if (!user) throw new Error("Unathorized");

            await CourseRegModel.findByIdAndUpdate(id, {
                status: true,
            });

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
