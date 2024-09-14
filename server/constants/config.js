const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    process.env.CLIENT_URL,
  ],
  credentials: true,
};

const COMM_TOKEN = "CommUnity-token"

export { corsOptions, COMM_TOKEN };
