import mysql from "mysql2";
import { SQL_DATABASE, SQL_HOST, SQL_PASSWORD, SQL_USER } from "@/Constants";

class MySQL {
  sql: mysql.Pool;
  constructor() {
    this.sql = mysql.createPool({
      host: SQL_HOST,
      user: SQL_USER,
      password: SQL_PASSWORD,
      database: SQL_DATABASE,
      connectionLimit: 10,
      enableKeepAlive: true,
      waitForConnections: true,
    });
    this.sql.on("connection", () => console.log("Connected to SQL Server"));
  }

  query(query: string, values?: unknown[]) {
    return new Promise((resolve, reject) => {
      this.sql.query(query, values, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

export default new MySQL();
