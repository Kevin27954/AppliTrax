import express, { Request, Response, Express, NextFunction } from "express";
import { config } from "dotenv";
import cors, { CorsOptions } from "cors";
import bodyParser from "body-parser";
import { start_mongo, closeConnection } from "./src/mongo-util";
import { jobRouter } from "./src/mongo/jobs/jobs.routes";
import { userRouter } from "./src/mongo/users/users.routes";
import { jobBoardRouter } from "./src/mongo/job-boards/job-board.routes";
import { verifyToken } from "./src/auth/auth.util";
import serverless from "serverless-http";

config();

const app: Express = express();
const PORT: number = 3000;

let corsConfig: CorsOptions = {
  origin: [
    "http://localhost:4200",
    "http://127.0.0.1:4000",
    "https://localhost:4200",
    "https://127.0.0.1:4000",
    "https://applitrax.web.app",
    "https://applitrax.firebaseapp.com",
  ],
  optionsSuccessStatus: 200,
};

app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Verifies idToken and stores it in req.user
app.use(verifyToken);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send("Something broke!");
});

app.use("/jobs", jobRouter);
app.use("/user", userRouter);
app.use("/jobboard", jobBoardRouter);

app.get("/check", (req: Request, res: Response) => {
  res.send("Hello from serverless");
});

// Starts Server
if (process.env.PROD === "false") {
  app.listen(PORT, () => {
    console.log(`The server is live http://localhost:${PORT}`);
  });
}

// Close Mongo Connection
//process.on("SIGINT", closeConnection);
//process.on("SIGTERM", closeConnection);

const serverlessHandler = serverless(app);

export const handler = async (event: any, context: any) => {
  const result = await serverlessHandler(event, context);
  await start_mongo();
  return result;
};
