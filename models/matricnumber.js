import mongoose from "mongoose";

const matricnumberSchema = new mongoose.Schema(
	{
		_userId: String,
		_collegeId: String,
		_sessionId: String,
		_departmentId: String,
		matricnumber: String,
		count: Number,
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

const MatricNumberModel =
	mongoose?.models?.MatricNumber ||
	mongoose.model("MatricNumber", matricnumberSchema);

export default MatricNumberModel;
