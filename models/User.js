const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email es un campo requerido.'],
      // this match will disqualify all the emails with accidental empty spaces, missing dots in front of (.)com and the ones with no domain at all
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password es un campo requerido.'],
    },
    profilePicture:{
      type: String,
    },
    
    roleType: {
        type: String,
        enum: ["User", "Editor", "Admin"],
        default: "User"
    },
    googleID: String
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);