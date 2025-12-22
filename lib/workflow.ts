import { Client } from "@upstash/workflow";

const client = new Client({
  token: process.env.QSTASH_TOKEN!,
  baseUrl: process.env.QSTASH_URL!,
});

export async function triggerSignupWorkflow(email: string) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  await client.trigger({
    url: `${baseUrl}/api/workflow`,
    body: { email },
    retries: 3,
    keepTriggerConfig: true,
  });
}
