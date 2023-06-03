const { Schema, model } = require("mongoose");
const { url } = require("../config/cloudinary_conf");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "This field is required"],
      unique: true,
      minLength: [
        4,
        "Username field must be at least 3 characters and no more than 20 characters",
      ],
      maxLength: [
        20,
        "Username field must be at least 3 characters and no more than 20 characters",
      ],
      validate: {
        validator: function (username) {
          return /^(?=.{3,20}$)(?![])(?!.*[_.-]{2})[a-zA-Z0-9._-]+(?<![])$/gm.test(
            username
          );
        },
        message: (props) => `${props.value} Is not a valid username`,
      },
    },
    email: {
      type: String,
      required: [true, "This field is required"],
      unique: true,
      validate: {
        validator: function (Email) {
          return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
            Email
          );
        },
        message: (props) => `${props.value} Is not a valid email`,
      },
    },
    avatar: {
      public_id: { type: String, required: true },
      url: {
        type: String,
        required: true,
        validate: { validator: function (Url) { return /\.(jpe?g|png)$/i.test(Url)}, message: () => "Only .jpg, .jpeg and .png files are allowed" },
      },
    },
    password: {
      type: String,
      required: [true, "This field is required"],
      minLength: [8, "Minimun 8 characters"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
