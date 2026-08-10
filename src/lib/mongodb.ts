import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb+srv://dishaadmin:disha12345@dishaa-cluster.mql8esp.mongodb.net/dishaadb?appName=DISHAA-Cluster';

export async function getMongoClient(): Promise<MongoClient> {
  const client = new MongoClient(uri, {
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
  });
  return await client.connect();
}

export default getMongoClient;
