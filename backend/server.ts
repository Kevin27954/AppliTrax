import express, { Request, Response, Express } from "express";

const app: Express = express();
const PORT: number = 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Typescript backend");
});

app.listen(PORT, () => {
    console.log(
        "The application is listening on port http://localhost:" + PORT
    );
});
