import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
	title: String,
	level: Number,
	created_at: { type: Date, default: Date.now },
});

const SessionModel =
	mongoose.models.Session || mongoose.model("Session", sessionSchema);

export default SessionModel;
