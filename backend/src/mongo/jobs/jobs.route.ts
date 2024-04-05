import { ObjectId } from "mongodb";
import { getCollection } from "../../mongo-util";
import express from "express";
import { JobDetail, UserApplication } from "../../types/types";

export const jobRouter = express.Router();
const applicationCollection = getCollection("application");

jobRouter.get("/get/:jobId", (req, res) => {
    let query = {};
    try {
        query = {
            "jobDetail._id": new ObjectId(req.params.jobId),
        };
    } catch (error) {
        return res.status(400).json({ message: "Bad Request" });
    }

    applicationCollection
        .findOne(query)
        .then((documentResult) => {
            res.status(200).json(documentResult);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
});

jobRouter.get("/all", (req, res) => {
    const query = {
        uid: req.user!.uid,
    };
    // Might consider aggregation to group it into multiple sections
    let cursor = applicationCollection.find(query);

    cursor.toArray().then((arr) => {
        res.status(200).json({ applications: arr });
    });
});

jobRouter.put("/new", (req, res) => {
    const jobDetail: JobDetail = {
        _id: new ObjectId(),
        title: req.body.title,
        location: req.body.location,
        company: req.body.company,
        jobtype: req.body.jobtype,
    };

    const userApplication: UserApplication = {
        _id: new ObjectId(),
        uid: req.user!.uid,
        jobDetail: jobDetail,
        status: "applied",
        notes: "",
        appliedOn: req.body.appliedOn || new Date(),
        createdOn: new Date(),
        updatedOn: new Date(),
    };

    applicationCollection
        .insertOne(userApplication)
        .then((mongoRespond) => {
            if (mongoRespond.acknowledged) {
                res.status(200).json({ message: "success" });
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
});

jobRouter.post("/edit/:jobId", (req, res) => {
    let query = {};

    try {
        query = {
            "jobDetail._id": new ObjectId(req.params.jobId),
        };
    } catch (err) {
        return res.status(400).json({ message: "Bad Request" });
    }

    let updatedFields = {};

    if (req.body.fields == undefined) {
        updatedFields = {
            $currentDate: { updatedOn: true as any }, //Tell ts to ignore this boolean since Mongo docs allows this
        };
    } else if (
        req.body.fields.uid != undefined ||
        req.body.fields.createdOn != undefined ||
        req.body.fields.updatedOn != undefined ||
        req.body.fields._id != undefined ||
        req.body.fields["jobDetail._id"] != undefined
    ) {
        return res.status(400).json({ message: "Bad Request" });
    } else {
        updatedFields = {
            $currentDate: { updatedOn: true as any }, //Tell typescript to ignore this boolean since Mongo docs allows this
            $set: req.body.fields,
        };
    }

    // Add job Details fields to the updated fields too.
    applicationCollection
        .updateOne(query, updatedFields)
        .then((mongoResponse) => {
            // Check if request went through
            if (mongoResponse.acknowledged) {
                res.status(200).json({ message: "success" });
            }
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
});
