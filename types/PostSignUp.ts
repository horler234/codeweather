import { SearchMongoose } from "./SearchMongoose";

export type PostSignUp = {
  email: string;
  name: string;
  password: string;
  search: SearchMongoose[];
};
