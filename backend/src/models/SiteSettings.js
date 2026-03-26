import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema(
  {
    label: { type: String, required: true },
    url: { type: String, required: true }
  },
  { _id: false }
);

const siteSettingsSchema = new mongoose.Schema(
  {
    heroName: { type: String, default: "Your Name" },
    heroTitle: { type: String, default: "Full Stack Developer" },
    heroSubtitle: {
      type: String,
      default:
        "I design and build clean, high-performance web experiences."
    },
    about: {
      type: String,
      default:
        "Write a short story about yourself, your craft, and the value you bring."
    },
    location: { type: String, default: "Your City, Country" },
    email: { type: String, default: "you@example.com" },
    phone: { type: String, default: "+91 00000 00000" },
    resumeUrl: { type: String, default: "" },
    heroImageUrl: { type: String, default: "" },
    accentColor: { type: String, default: "#f59e0b" },
    socialLinks: { type: [socialLinkSchema], default: [] }
  },
  { timestamps: true }
);

export default mongoose.model("SiteSettings", siteSettingsSchema);
