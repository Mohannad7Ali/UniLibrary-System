const config = {
  env: {
    imageKit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    },
    apiEndpoint: process.env.API_ENDPOINT,
    databaseUrl: process.env.NEON_DATABASE_URL,
    upstash: {
      radisUrl: process.env.UPSTASH_REDIS_REST_URL,
      radisToken: process.env.UPSTASH_REDIS_REST_TOKEN,
      qstashUrl: process.env.QSTASH_URL,
      qstashToken: process.env.QSTASH_TOKEN,
    },
  },
};
export default config;
