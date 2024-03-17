import { MongoClient, ServerApiVersion } from "mongodb";
import { config } from "dotenv";

config();

const uri = `mongodb+srv://kevinl33078:${process.env.MONGOPASSWORD}@appli-trax-dev.zbdql1b.mongodb.net/?retryWrites=true&w=majority&appName=appli-trax-dev`;

export const mongoClient = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export async function start_mongo() {
    try {
        await mongoClient.connect();
        await mongoClient.db("admin").command({ ping: 1 });

        const serverStatus = await mongoClient.db("admin").command({ serverStatus: 1 });
        console.log("Current number of connections:", serverStatus.connections);

        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } catch (error) {
        console.log("Mongo Error", error);
        mongoClient.close();
    }
}

export function closeConnection() {
    console.log("Closing Connection");
    mongoClient.close(); // Close MongodDB Connection when Process ends
    process.exit(); // Exit with default success-code '0'.
}
