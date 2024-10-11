import { UserType } from "./types/modelTypes";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET: string,
      MONGO_URI: string,
      MONGO_DB: string,
      PORT: number,
      CLOUD_KEY: string,
      CLOUD_SECRET: string,
      CLOUD_NAME: string,
      PRODUCTION_URL: string,
    }
  }
  namespace Express {
    interface Request {
        user: UserType | null;
    }
  }
}

export {};