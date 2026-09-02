import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

const hasValidMongoUri = /^mongodb(\+srv)?:\/\/.+\.[a-z0-9.-]+\.[a-z]{2,}.*$/i.test(uri || '');

if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable. Set it in your environment or GitHub secrets.');
}

if (!hasValidMongoUri) {
  throw new Error(
    'Invalid MONGODB_URI. Expected a MongoDB Atlas URI like: mongodb+srv://user:password@cluster0.oj4wbe4.mongodb.net/?retryWrites=true&w=majority'
  );
}

if (!dbName) {
  throw new Error('Missing MONGODB_DB_NAME environment variable.');
}

const client = new MongoClient(uri);

console.log('Trying to connect to db');

try {
  await client.connect();
  await client.db(dbName).command({ ping: 1 });
  console.log('Connected successfully to server');
} catch (error) {
  console.error('MongoDB connection failed. Check your MONGODB_URI and Atlas access settings.');
  console.error(error.message);
  throw error;
}

const database = client.db(dbName);

export default database;
