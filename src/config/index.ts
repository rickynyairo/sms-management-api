import dotenv from "dotenv";

dotenv.config();

const {
  env: {
    PORT,
    NODE_ENV,
    MONGO_DB_URL,
    SESSION_SECRET
  },
} = process;

export default Object.freeze({
  PORT,
  NODE_ENV,
  MONGO_DB_URL: NODE_ENV === "testing" ? `${MONGO_DB_URL}-test` : MONGO_DB_URL,
  SESSION_SECRET: `${SESSION_SECRET}`
});
