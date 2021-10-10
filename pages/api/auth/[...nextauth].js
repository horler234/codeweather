import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import connectDB from "../../../middleware/mongodb";
import bcrypt from "bcrypt";
import { connectToDatabase } from "../../../lib/db";

export default connectDB(
  NextAuth({
    session: {
      jwt: true,
    },
    providers: [
      Providers.Credentials({
        id: "credentials",
        async authorize(credentials) {
          const client = await connectToDatabase();

          const user = await client.db
            .collection("users")
            .findOne({ email: credentials.email });

          if (!user) {
            throw Error("This email is not registered.");
          }
          const auth = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!auth) {
            throw Error("Incorrect password");
          }

          return { email: user.email, name: user.name };
        },
      }),
    ],

    database: process.env.MONGODB_URI,
  })
);
