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
      type: String
    },
    profilePicture:{
      type: String,
      default: "https://gsimg.asiayo.com/ay-image-upload/1498635269366_default-avatar.png"
    },
    facebook:{
      type: String,
    },
    twitter:{
      type: String,
    },    
    roleType: {
        type: String,
        enum: ["User", "Editor", "Admin"],
        default: "User"
    },
    googleID: String,
    acercaDe: String,
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);