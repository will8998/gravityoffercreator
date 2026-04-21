import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const url = process.env.DATABASE_URL ?? "file:gravity.db";
const authToken = process.env.DATABASE_AUTH_TOKEN;
const isRuntimeProd =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PHASE !== "phase-production-build";

if (isRuntimeProd && url.startsWith("file:")) {
  throw new Error(
    "DATABASE_URL must be set to a remote libsql URL in production. Writes to a file: URL will be lost on Vercel's ephemeral filesystem."
  );
}

const client = createClient({ url, authToken });

export const db = drizzle(client, { schema });
