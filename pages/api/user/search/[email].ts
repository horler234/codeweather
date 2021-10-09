import { NextApiRequest, NextApiResponse } from "next";
import { errors } from "../../../../constants/errors";
import connectDB from "../../../../middleware/mongodb";
import { HttpMethod } from "../../../../types/HttpMethod";
import { handleAuthErrors } from "../../../../util/apiHelpers/handleAuthErrors";
import { connectToDatabase } from "../../../../lib/db";
import { SearchMongoose } from "../../../../types/SearchMongoose";

const getUserSearchAPIRoute = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const method = req.method as HttpMethod;

  if (method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      error: errors.REQUEST_METHOD_INVALID,
    });
    return;
  }
  const { db } = await connectToDatabase();
  const email = req.query.email;

  if (!email) {
    console.warn("no email, query: ", req.query);
    res.status(400).json({ error: errors.REQUEST_QUERY_INVALID });
    return;
  }

  // get user search history

  try {
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      res.status(422).json({
        error: { email: "User is not registered." },
      });
      return;
    }

    res.status(201).json({ search: user.search });
  } catch (err) {
    const errors = handleAuthErrors(err);
    res.status(400).json({ errors });
    console.error(errors);
  }
};

export default connectDB(getUserSearchAPIRoute);
