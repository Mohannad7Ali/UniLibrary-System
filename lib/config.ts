const config = {
  env: {
    imageKit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    },
    apiEndpoint: process.env.API_ENDPOINT,
    databaseUrl: process.env.NEON_DATABASE_URL,
  },
};
export default config;
