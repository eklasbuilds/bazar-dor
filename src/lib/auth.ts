import { dash } from "@better-auth/infra";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { getCloudflareContext } from "@opennextjs/cloudflare";

function readEnv(env: CloudflareEnv) {
  return {
    secret: env.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL || process.env.BETTER_AUTH_URL || "http://localhost:3000",
    apiKey: env.BETTER_AUTH_API_KEY || process.env.BETTER_AUTH_API_KEY,
    googleId: env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID,
    googleSecret: env.GOOGLE_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET,
    githubId: env.GITHUB_CLIENT_ID || process.env.GITHUB_CLIENT_ID,
    githubSecret: env.GITHUB_CLIENT_SECRET || process.env.GITHUB_CLIENT_SECRET,
  };
}

export async function getAuth() {
  const { env } = await getCloudflareContext({ async: true });
  const config = readEnv(env);
  const googleReady = Boolean(config.googleId && config.googleSecret);
  const githubReady = Boolean(config.githubId && config.githubSecret);

  return betterAuth({
    appName: "বাজার দর",
    baseURL: config.baseURL,
    secret: config.secret,
    trustedOrigins: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://ecom.eklas.tech",
      "https://dash.better-auth.com",
    ],
    database: env.DB,
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
    },
    socialProviders: {
      ...(googleReady
        ? {
            google: {
              clientId: config.googleId as string,
              clientSecret: config.googleSecret as string,
            },
          }
        : {}),
      ...(githubReady
        ? {
            github: {
              clientId: config.githubId as string,
              clientSecret: config.githubSecret as string,
            },
          }
        : {}),
    },
    plugins: [
      dash({
        apiKey: config.apiKey,
      }),
      nextCookies(),
    ],
  });
}
