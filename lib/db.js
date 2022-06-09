import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.7ueiz.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
  );
  return client;
}

// export async function getAllDocuments(client, collection, sort) {
export async function getAllDocuments(client, collection) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find()
    // .sort({ _id: -1 }) // sort in descending order (last is first)
    // .sort(sort)
    .toArray();

  return documents;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}
