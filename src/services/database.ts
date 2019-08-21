import { connect, connection } from "mongoose";
import config from "../config";

export const connectToDatabase = async () => {
  try {
    // const AURL = "mongodb://sms-management-api_mongo_1:27017/sms-api";
    // const trial = await connect(`${config.MONGO_DB_URL}`, { useNewUrlParser: true });
    // console.log("trial>>>>", trial.connections[0]);
    return connect(`${config.MONGO_DB_URL}`, { useNewUrlParser: true });
  } catch (error) {
    console.log("\nerror>>>\n", error);
    process.exit(1);
  }
};

export const database = connection;