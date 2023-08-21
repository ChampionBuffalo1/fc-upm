namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    // SQL Config
    SQL_HOST?: string;
    SQL_USER?: string;
    SQL_PASSWORD?: string;
    SQL_DATABASE?: string;
  }
}
