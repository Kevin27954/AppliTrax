import { mongoClient } from "../../mongo-util";
import express from "express";

export const jobRouter = express.Router();

jobRouter.get("/users", (req, res) => {
    const sample_db = mongoClient.db("sample_mflix");
    const userCollection = sample_db.collection("users");

    const query = { name: "Ned Stark" };
    var user = userCollection.find(query);

    // user.then((value) => {
    //     res.send(value);
    // });

    console.log(user);

    console.log("I ran");
});
