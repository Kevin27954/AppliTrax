import express, { Request, Response, Express } from "express";
import { config } from "dotenv";
import cors, { CorsOptions } from "cors";
import bodyParser from "body-parser";
import { start_mongo, closeConnection } from "./src/mongo-util";
import { jobRouter } from "./src/mongo/jobs/jobs.route";

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

app.use("/jobs", jobRouter);

app.get("/", cors(corsConfig), (req: Request, res: Response) => {
    res.send("Typescript backend");
});

// Starts Mongo Connection
start_mongo();

// Starts Server
app.listen(PORT, () => {
    console.log(`The server is live http://localhost:${PORT}`);
});

// Close Mongo Connection
process.on('SIGINT', closeConnection);
process.on('SIGTERM', closeConnection);