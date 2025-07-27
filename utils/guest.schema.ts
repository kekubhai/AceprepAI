import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  resumeText: { type: String, required: true },
  questions: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
});

export default guestSchema;