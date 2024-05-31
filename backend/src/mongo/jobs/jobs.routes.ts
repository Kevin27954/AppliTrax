import { ObjectId } from "mongodb";
import { getCollection } from "../../mongo-util";
import express from "express";
import { JobDetail, UserApplication } from "../../types/types";
import { jobBoardRouter } from "../job-boards/job-board.routes";
import { pipeline } from "stream";

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
      res.status(200).json({ application: documentResult });
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

jobRouter.post("/new", (req, res) => {
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

jobRouter.put("/edit/:_id", (req, res) => {
  let query = {};

  try {
    query = {
      _id: new ObjectId(req.params._id),
    };
  } catch (err) {
    return res.status(400).json({ message: "Bad Request" });
  }

  let updatedFields = {};

  try {
    let data = req.body.fields;
    let body = {
      "jobDetail.title": data["jobDetail.title"],
      "jobDetail.location": data["jobDetail.location"],
      "jobDetail.jobtype": data["jobDetail.jobtype"],
      status: data["status"],
      notes: data["notes"],
      appliedOn: new Date(data["appliedOn"]),
    };

    console.log(body);

    updatedFields = {
      $currentDate: { updatedOn: true as any }, //Tell typescript to ignore this boolean since Mongo docs allows this
      $set: body,
    };
  } catch (error: any) {
    return res.status(400).json({ message: "Bad Request" });
  }

  // Add job Details fields to the updated fields too.
  applicationCollection
    .updateOne(query, updatedFields)
    .then((mongoResponse) => {
      // Check if request went through
      if (mongoResponse.acknowledged) {
        console.log(mongoResponse.matchedCount);
        res.status(200).json({ message: "success" });
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

jobRouter.get("/status/week", (req, res) => {
  const date = new Date();
  date.setDate(date.getDate() - 7);

  const pipeline = [
    {
      $match: {
        uid: req.user!.uid,
        appliedOn: date,
      },
    },
    {
      $addFields: {
        aggreate_date: {
          $dateToString: {
            date: {
              $toDate: "$appliedOn",
            },
            format: "%Y-%m-%d",
          },
        },
      },
    },
    {
      $group: {
        _id: "$aggreate_date",
        count: {
          $sum: 1,
        },
      },
    },
  ];

  applicationCollection
    .aggregate(pipeline)
    .toArray()
    .then((arr) => {
      console.log(arr);
    });
});
