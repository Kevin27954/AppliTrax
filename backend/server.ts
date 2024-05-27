import express, { Request, Response, Express, NextFunction } from "express";
import { config } from "dotenv";
import cors, { CorsOptions } from "cors";
import bodyParser from "body-parser";
import { start_mongo, closeConnection } from "./src/mongo-util";
import { jobRouter } from "./src/mongo/jobs/jobs.route";
import { userRouter } from "./src/mongo/users/users.routes";
import { verifyToken } from "./src/auth/auth.util";

config();

const app: Express = express();
const PORT: number = 3000;

let corsConfig: CorsOptions = {
    origin: ["http://localhost:4200", "*"],
    optionsSuccessStatus: 200,
};

app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Verifies idToken and stores it in req.user
app.use(verifyToken);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

app.use("/jobs", jobRouter);
app.use("/user", userRouter);

app.get("/", (req: Request, res: Response) => {
    res.send(req.user);
});

// Starts Mongo Connection
start_mongo();

// Starts Server
app.listen(PORT, () => {
    console.log(`The server is live http://localhost:${PORT}`);
});

// Close Mongo Connection
process.on("SIGINT", closeConnection);
process.on("SIGTERM", closeConnection);
