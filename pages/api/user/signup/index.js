import mongoose from "mongoose";
import UserModel from "../../../../models/User";

async function handler(req, res) {
	if (req.method === "POST") {
		try {
			mongoose.connect(process.env.MONGODB_URL);

			const { email, firstname, middlename, lastname, password } =
				req.body;

			if (!email) {
				throw new Error("Email cannot be empty");
			} else if (!firstname) {
				throw new Error("first name cannot be empty");
			} else if (!lastname) {
				throw new Error("Last name cannot be empty");
			} else if (!password) {
				throw new Error("Password cannot be empty");
			}

			const alreadyExist = await UserModel.findOne({
				email,
			});
			if (alreadyExist) throw new Error("email address already taken");

			await UserModel.create({
				firstname,
				middlename,
				email,
				password,
				lastname,
			});

			// await ProfileModel.create({ _userId: newUser.id });

			// await user.save();
			res.status(200).json({ ok: true, msg: "Success" });
		} catch (error) {
			res.status(401).json({ ok: true, msg: error.message });
		}
	} else {
		// throw new Error("Invalid request method")
		res.status(400).json({ msg: "invalid request method" });
	}
}

export default handler;
