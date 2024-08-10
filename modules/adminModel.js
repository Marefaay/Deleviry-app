const mongoose = require("mongoose");
///user Schema
const adminSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
    profilePhoto: {
      type: Object,
      default: {
        url: "https://th.bing.com/th/id/R.152c34a899b6bf22d4da6c91b74403dd?rik=ELN9t4jt5Z7dhA&pid=ImgRaw&r=0",
        publidId: null,
      },
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    // addedBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Admin",
    // },
  },
  { timestamps: true }
);
const adminModel = mongoose.model("Admin", adminSchema);
module.exports = adminModel;
