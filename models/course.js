import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
	{
		title: String,
		code: String,
		semester: { type: String, enum: ["first", "second"] },
		_departmentId: String,
		unit: Number,
		level: { type: Number, enum: [100, 200, 300, 400, 500] },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
	}
);

const CourseModel =
	mongoose?.models?.Course || mongoose.model("Course", courseSchema);

export default CourseModel;
