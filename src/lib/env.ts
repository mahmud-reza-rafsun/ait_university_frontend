import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        BACKEND_URL: z.string().url(),
        SESSION_URL: z.string().url(),
    },
    client: {
        NEXT_PUBLIC_API_BASE_URL: z.string().url(),
        NEXT_PUBLIC_FRONTEND_URL: z.string().url(),
    },
    runtimeEnv: {
        BACKEND_URL: process.env.BACKEND_URL,
        SESSION_URL: process.env.SESSION_URL,
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
        NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    },
});
