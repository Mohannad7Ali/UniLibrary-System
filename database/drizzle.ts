import config from "@/lib/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
if (!config.env.databaseUrl) {
  throw new Error("DATABASE_URL is not defined");
}
const sql = neon(config.env.databaseUrl!); // ! tell ts : this value absoluty isnot null or undefine
export const db = drizzle(sql);
