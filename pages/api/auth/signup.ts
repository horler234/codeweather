import { NextApiRequest, NextApiResponse } from "next";
import { errors } from "../../../constants/errors";
import connectDB from "../../../middleware/mongodb";
import { HttpMethod } from "../../../types/HttpMethod";
import { handleAuthErrors } from "../../../util/apiHelpers/handleAuthErrors";
import { connectToDatabase } from "../../../lib/db";
import { PostSignUp } from "../../../types/PostSignUp";
import bcrypt from "bcrypt";

const signUpAPIRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as HttpMethod;

  if (method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({
      error: errors.REQUEST_METHOD_INVALID,
    });
    return;
  }

  try {
    const body: PostSignUp = req.body;
    const { db } = await connectToDatabase();

    if (!body) {
      res.status(400).json({ error: errors.REQUEST_BODY_INVALID });
      return;
    }
    const { email, password, name, search } = body;
    const existingUser = await db.collection("users").findOne({ email: email });

    if (existingUser) {
      res.status(422).json({
        error: { email: "User is already registered.", use: existingUser },
      });
      return;
    }

    const salt = await bcrypt.genSalt();
    const pass = await bcrypt.hash(password, salt);

    const user = await db.collection("users").insertOne({
      email,
      password: pass,
      name,
      date_created: new Date(),
      search,
    });
    res.status(201).json({ _id: user.insertedId });
  } catch (err) {
    const errors = handleAuthErrors(err);
    res.status(400).json({ errors });
    console.error(errors);
  }
};

export default connectDB(signUpAPIRoute);
