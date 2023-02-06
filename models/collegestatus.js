import mongoose from "mongoose";

const collegestatusSchema = new mongoose.Schema({
	_userId: String,

	level: String,
	_departmentId: String,
	status: {
		type: Boolean,

		default: false,
	},
});

const CollegeStatusModel =
	mongoose.models.CollegeStatus ||
	mongoose.model("CollegeStatus", collegestatusSchema);

export default CollegeStatusModel;
