import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI;

let client: any;
let clientPromise: any;

if (!uri) {
  throw new Error("Add Mongo URI to env file");
}

client = new MongoClient(uri);
clientPromise = client.connect();

export default clientPromise;
