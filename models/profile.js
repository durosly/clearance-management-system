import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
	_userId: String,
	jambreg: String,
	dob: Date,
	stateoforigin: String,
	soproof: String, // ! Proof of state of origin
	localoforigin: String,
	stateofresidence: String,
	localofresidence: String,
	_collegeId: String,
	deanstatus: { type: Boolean, default: false },
	address: String,
	clearanceLevel: { type: Number, default: 0 },
	_sessionId: String,
	_departmentId: String,
	matricnumber: String,
	status: {
		type: String,
		enum: ["pending", "in-school", "out-of-school", "graduated"],
		default: "pending",
	},
	created_at: { type: Date, default: Date.now },
});

const ProfileModel =
	mongoose?.models?.Profile || mongoose.model("Profile", profileSchema);

export default ProfileModel;
