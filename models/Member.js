import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },   // e.g. gym001
  name: { type: String, required: true },              // Member name
  joinDate: { type: Date, required: true },
  expiryDate: { type: Date, required: true },
  package: { type: String, enum: ["Basic", "Standard", "Premium"], required: true }
}, { timestamps: true });

export default mongoose.model("Member", memberSchema);
