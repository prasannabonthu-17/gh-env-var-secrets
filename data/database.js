import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME;

if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable. Set it in your environment or GitHub secrets.');
}

if (!dbName) {
  throw new Error('Missing MONGODB_DB_NAME environment variable.');
}

const client = new MongoClient(uri);

console.log('Trying to connect to db');

await client.connect();
await client.db(dbName).command({ ping: 1 });
console.log('Connected successfully to server');

const database = client.db(dbName);

export default database;
