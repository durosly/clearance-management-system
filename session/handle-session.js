import { getSession } from "next-auth/react";
import mongoose from "mongoose";
import UserModel from "../models/user";

async function handleSession({ req, authLevel }) {
	try {
		mongoose.connect(process.env.MONGODB_URL);

		const session = await getSession({ req });

		const user = session?.user;

		if (!user) return false;

		const dbUser = await UserModel.findOne({ email: user.email });

		if (!dbUser) return false;

		if (authLevel !== "all" && !authLevel.includes(dbUser.type))
			return false;

		return dbUser;
	} catch (error) {
		return false;
	}
}

export default handleSession;
