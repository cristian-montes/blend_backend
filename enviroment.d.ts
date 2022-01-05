declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            PGSSLMODE: string;
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            SALT_ROUNDS: number;
            APP_SECRET: string;
            STRIPE_KEY:string;
            APP_URL:string;
            SECURE_COOKIES: boolean;
        }
    }
}

export{}