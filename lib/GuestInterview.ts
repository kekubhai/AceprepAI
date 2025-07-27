import mongoose, { Schema, models, model } from "mongoose";

const GuestInterviewSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  resumeText: { type: String, required: true },
  questions: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
});

export default models.GuestInterview || model("GuestInterview", GuestInterviewSchema);

