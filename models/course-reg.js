import mongoose from "mongoose";

const courseregSchema = new mongoose.Schema(
	{
		_courseIds: [String],
		_userId: String,
		status: { type: Boolean, default: false },
		level: Number,
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

const CourseRegModel =
	mongoose?.models?.CourseReg || mongoose.model("CourseReg", courseregSchema);

export default CourseRegModel;
