import { mongoClient } from "../../mongo-util";
import express from "express";

export const jobRouter = express.Router();

jobRouter.get("/users", (req, res) => {
    const sample_db = mongoClient.db("sample_mflix");

    const userCollection = sample_db.collection("users");

    const query = { name: "Ned Stark" };
    // var user = userCollection.findOne(query).then((value) => {
    //     res.send(value);
    // });

    // Iterator
    let cursor = userCollection.find({}).limit(20);

    
    cursor.toArray().then((arr) => {
        res.send(arr);
    });

    // (async () => {
    //     let arr: any[] = [];
    //     for await (const num of cursor) {
    //         arr.push(num);
    //     }
    //     return arr;
    // })().then((arr) => {
    //     res.send(arr);
    // });
});
