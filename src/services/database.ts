import { connect } from "mongoose";
import config from "../config";

export const connectToDatabase = () => {
  try {
    return connect(`${config.MONGO_DB_URL}`, { useNewUrlParser: true });
  } catch (error) {
    console.log("\nerror>>>\n", error);
    process.exit(1);
  }
};