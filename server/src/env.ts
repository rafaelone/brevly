import { z } from "zod";

const envSchema = z.object({
	PORT: z.coerce.number().default(3333),
	NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
	DATABASE_URL: z.string().url().startsWith("postgres://"),
	AWS_ACCOUNT_ID: z.string(),
	AWS_ACCESS_KEY_ID: z.string(),
	AWS_SECRET_ACCESS_KEY: z.string(),
	AWS_BUCKET: z.string(),
	AWS_REGION: z.string(),
	AWS_CDN: z.string().url(),
});

export const env = envSchema.parse(process.env);
