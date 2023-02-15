import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
	title: String,
	level: { type: Number, default: 100 },
	year: String,
	created_at: { type: Date, default: Date.now },
});

const SessionModel =
	mongoose?.models?.Session || mongoose.model("Session", sessionSchema);

export default SessionModel;
