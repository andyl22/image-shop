declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      MONGO_URI: string;
      SECRET: string;
      NEXT_PUBLIC_STRIPE_API: string;
      NEXT_PUBLIC_STRIPE_SECRET: string;
    }
  }
}

export {};
