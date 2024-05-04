import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createPool({
  host: process.env.NEXT_PUBLIC_HOST,
  user: process.env.NEXT_PUBLIC_USER,
  database: process.env.NEXT_PUBLIC_USER,
  password:process.env.NEXT_DB_PASSWORD,
  port:'3306'
});

export const db = drizzle(connection);