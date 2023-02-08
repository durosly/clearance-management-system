import ProfileModel from "../models/profile";

async function getRegistrationLevel({ user }) {
	const profile = await ProfileModel.findOne({ _userId: user.id });

	if (!profile) return { v: "payment", type: "acceptance" };

	return { v: "nothing" };
}

export default getRegistrationLevel;
