import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
    name: String,
    abbr: String,
    created_at: { type: Date, default: Date.now },
});

const CollegeModel =
    mongoose?.models?.College || mongoose.model("College", collegeSchema);

export default CollegeModel;
