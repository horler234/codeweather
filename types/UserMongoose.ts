import { SearchMongoose } from "./SearchMongoose";

export interface UserMongoose {
  name: string;
  email: string;
  password: string;
  searches: SearchMongoose[];
  date_added?: string;
}
