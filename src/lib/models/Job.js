import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [150, "Title cannot exceed 150 characters"],
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Design",
        "Marketing",
        "Technology",
        "Business",
        "Finance",
        "Healthcare",
        "Education",
        "Other",
      ],
    },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Remote", "Contract", "Internship"],
      default: "Full-time",
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
    },
    requirements: { type: String, default: "" },
    salary: { type: String, default: "" },
    logo: { type: String, default: "" },
  },
  { timestamps: true },
);

const Job = mongoose.models.Job || mongoose.model("Job", jobSchema);
export default Job;
