import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://dishaadmin:disha12345@dishaa-cluster.mql8esp.mongodb.net/dishaadb?appName=DISHAA-Cluster';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      connectTimeoutMS: 10000,
      serverSelectionTimeoutMS: 10000,
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, {
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
  });
  clientPromise = client.connect();
}

export async function getMongoClient(): Promise<MongoClient> {
  return await clientPromise;
}

export default getMongoClient;
