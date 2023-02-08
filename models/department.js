import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
	name: String,
	abbr: String,
	created_at: { type: Date, default: Date.now },
	_collegeId: String,
	duration: Number,
});

const DepartmentModel =
	mongoose?.models?.Department ||
	mongoose.model("Department", departmentSchema);

export default DepartmentModel;
