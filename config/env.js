import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  VITE_PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET_KEY,
  JWT_EXPIRATION_TIME,
  ARCJET_KEY,
  ARCJET_ENV,
  QSTASH_URL,
  QSTASH_TOKEN,
  SERVER_URL,
  EMAIL_PASSWORD,
  // QSTASH_CURRENT_SIGNING_KEY,
  // QSTASH_NEXT_SIGNING_KEY,
} = process.env;
