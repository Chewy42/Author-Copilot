const mongoose = require("mongoose");
const Ebook = require("./Ebook");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    openaiApiKey: {
      type: String,
    },
    openaiOrgId: {
      type: String,
    },
    ebooks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ebook",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);