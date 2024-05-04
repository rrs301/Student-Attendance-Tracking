export default {
    schema: "./utils/schema.js",
    driver: 'mysql2',
    dbCredentials: {
        host: process.env.NEXT_PUBLIC_HOST,
  user: process.env.NEXT_PUBLIC_USER,
  database: process.env.NEXT_PUBLIC_USER,
  password:process.env.NEXT_DB_PASSWORD,
        port:'3306'
    }
  };