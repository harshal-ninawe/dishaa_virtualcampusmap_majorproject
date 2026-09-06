import { MongoClient } from 'mongodb';

const uri =
  process.env.MONGODB_URI ||
  'mongodb+srv://dishaadmin:disha12345@dishaa-cluster.mql8esp.mongodb.net/dishaadb?appName=DISHAA-Cluster';

const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
};

let cachedClient: MongoClient | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  // Check if we have an active, connected cached client
  if (cachedClient) {
    try {
      // Ping admin database to verify active connection topology
      await cachedClient.db('admin').command({ ping: 1 });
      return cachedClient;
    } catch {
      console.warn('Vercel serverless socket closed. Re-establishing MongoDB connection...');
      try {
        await cachedClient.close();
      } catch (_) {}
      cachedClient = null;
    }
  }

  // Create fresh client and explicitly await connection completion
  const client = new MongoClient(uri, options);
  await client.connect();
  cachedClient = client;
  return cachedClient;
}

export default getMongoClient;
