import express from "express";
import { ObjectId } from "mongodb";
import { getCollection } from "../../mongo-util";
import { JobBoardDoc } from "../../types/types";

const jobBoardRouter = express.Router();
const jobBoardCollection = getCollection("job_boards");

jobBoardRouter.get("/get", (req, res) => {
  let query = {
    uid: req.user!.uid,
  };

  const result = jobBoardCollection.find(query);
  result.toArray().then((arr) => {
    res.status(200).json({ jobBoards: arr });
  });
});

jobBoardRouter.put("/update", (req, res) => {
  const query = { _id: new ObjectId(req.body.jobboard._id) };
  const updatedField = {
    $set: {
      url: req.body.jobboard.url,
    },
  };

  jobBoardCollection
    .updateOne(query, updatedField)
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

jobBoardRouter.post("/new", (req, res) => {
  const newJobBoardUrl = {
    _id: new ObjectId(),
    url: req.body.jobboard.url,
    uid: req.user!.uid,
    createdOn: new Date(),
    updatedOn: new Date(),
  };

  jobBoardCollection.insertOne(newJobBoardUrl).then((mongoResponse) => {
    // Check if request went through
    if (mongoResponse.acknowledged) {
      res.status(200).json({ message: "success", new_url: newJobBoardUrl });
    }
  });
});

jobBoardRouter.delete("/remove", (req, res) => {
  const query = {
    _id: new ObjectId(req.body.jobboard._id),
    uid: req.user?.uid,
  };

  jobBoardCollection.deleteOne(query).then((mongoResponse) => {
    if (mongoResponse.acknowledged) {
      res.status(200).json({ message: "success" });
    }
  });
});

export { jobBoardRouter };
