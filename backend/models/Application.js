const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job reference is required"],
    },
    name: {
      type: String,
      required: [true, "Applicant name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    resumeLink: {
      type: String,
      required: [true, "Resume link is required"],
      match: [
        /^https?:\/\/.+/,
        "Resume link must be a valid URL starting with http(s)://",
      ],
    },
    coverNote: {
      type: String,
      default: "",
      maxlength: [2000, "Cover note cannot exceed 2000 characters"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Application", applicationSchema);
