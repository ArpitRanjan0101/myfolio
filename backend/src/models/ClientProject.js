import mongoose from "mongoose";

const clientProjectSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    role: { type: String, default: "" },
    stack: { type: [String], default: [] },
    outcome: { type: String, default: "" },
    logoUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("ClientProject", clientProjectSchema);
