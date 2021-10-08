import { Schema, model } from "mongoose";
import { UserMongoose } from "../types/UserMongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";
import { SearchMongoose } from "../types/SearchMongoose";

/**
 * searchSchema is the schema for the user's search history
 */

const searchSchema = new Schema<SearchMongoose>({
  long: {
    type: Number,
    required: [true, "Long coords not added."],
  },
  lat: {
    type: Number,
    required: [true, "Long coords not added."],
  },
  city: {
    type: String,
    required: [true, "City not added."],
  },
});

export const userSchema = new Schema<UserMongoose>({
  name: {
    type: String,
    required: [true, "Please enter your full name"],
    minLength: [1, "Please enter your full name"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
    minLength: [6, "Minimum password length must be 6 characters"],
  },
  searches: { type: [searchSchema], required: false },
  date_added: {
    type: Date,
    default: Date.now,
  },
});

// fire a function before a new user has been saved to the database
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = model("user", userSchema);

export default User;
