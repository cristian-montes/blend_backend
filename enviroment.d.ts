declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            PGSSLMODE: string;
            NODE_ENV: 'development' | 'production';
            PORT?: string;
        }
    }
}

export{}