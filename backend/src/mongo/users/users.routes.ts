import express from "express";
import { getCollection } from "../../mongo-util";
import { UserData } from "../../types/types";
import { ObjectId } from "mongodb";

export const userRouter = express.Router();
const userCollection = getCollection("users");

userRouter.get("/", (req, res) => {
    const query = { uid: req.user!.uid };

    userCollection
        .findOne(query)
        .then((userData) => {
            res.status(200).json({ data: userData, message: "success" });
        })
        .catch((err) => {
            res.status(404).json({ message: err.message });
        });
});

userRouter.put("/register", (req, res) => {
    const query = { uid: req.user!.uid };
    let regsterUserData: UserData = {
        _id: new ObjectId(),
        uid: req.user!.uid,
        email: req.user!.email,
        major: "",
        username: "",
        createdOn: new Date(),
        updatedOn: new Date(),
        lastLogin: new Date()
    };
    // If exist updates, otherwise insert
    const options = { upsert: true };

    // the query will find doc, if it doesn't find it, it inserts otherwise updates
    // $setOnInsert, will only create field if it is an Insert operation
    userCollection
        .updateOne(query, { $setOnInsert: regsterUserData }, options)
        .then((mongoRespond) => {
            if (mongoRespond.acknowledged) {
                res.status(200).json({ message: "success" });
            }
        })
        .catch((err) => {
            res.status(404).json({ message: err.message });
        });
});

userRouter.post("/login", (req, res) => {
    userCollection
        .updateOne(
            { uid: req.user!.uid },
            {
                $currentDate: { lastLogin: true as any },
            }
        )
        .then((mongoResponse) => {
            // Check if request went through
            if (mongoResponse.acknowledged) {
                res.status(200).json({ message: "success" });
            }
        })
        .catch((err) => {
            res.status(404).json({ message: err.message });
        });
});

userRouter.post("/edit", (req, res) => {
    // Expect req.body.fields to be of type UserData
    let updatedFields = {};

    if (req.body.fields == undefined) {
        updatedFields = {
            $currentDate: { updatedOn: true as any }, //Tell ts to ignore this boolean since Mongo docs allows this
        };
    } else if (
        req.body.fields.uid != undefined ||
        req.body.fields.createdOn != undefined ||
        req.body.fields.updatedOn != undefined ||
        req.body.fields._id != undefined
    ) {
        return res.status(400).json({ message: "Bad Request" });
    } else {
        updatedFields = {
            $currentDate: { updatedOn: true as any }, //Tell typescript to ignore this boolean since Mongo docs allows this
            $set: req.body.fields,
        };
    }

    userCollection
        .updateOne({ uid: req.user!.uid }, updatedFields)
        .then((mongoResponse) => {
            // Check if request went through
            if (mongoResponse.acknowledged) {
                res.status(200).json({ message: "success" });
            }
        })
        .catch((err) => {
            res.status(404).json({ message: err.message });
        });
});
