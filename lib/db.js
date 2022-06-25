import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.7ueiz.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
  );
  return client;
}

export async function getSpecificListOfDocuments(client, collection, query) {
  const db = client.db();
  console.log('query is: ', query);

  try {
    const documents = await db
      .collection(collection)
      .find({ userId: query })
      .toArray();

    return documents;
  } catch (error) {
    console.log(error);
  }
}

export async function getCouriersList(client, collection) {
  const db = client.db();

  try {
    const documents = await db
      .collection(collection)
      .find({ isCourier: true })
      .toArray();

    return documents;
  } catch (error) {
    console.log(error);
  }
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

export async function insertArray(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertMany(document);

  return result;
}

export async function updateDocument(client, collection, filter, data) {
  const db = client.db();
  const ObjectID = require('mongodb').ObjectID;

  const result = await db.collection(collection).updateOne(
    { _id: ObjectID(filter) },
    // ObjectID is deprecated ?!
    // { _id: String(filter) },
    {
      $set: {
        name: data.name,
        number: data.number,
        category: data.category,
        description: data.description,
        price: data.price,
      },
    }
  );

  return result;
}
export async function updateOrderStatus(client, collection, filter, data) {
  const db = client.db();
  const ObjectID = require('mongodb').ObjectID;

  console.log(data);

  const result = await db.collection(collection).updateOne(
    { _id: ObjectID(filter) },
    {
      $set: {
        courierName: data.courierName,
        courierId: data.courierId,
        status: data.status,
      },
    }
  );

  return result;
}

export async function deleteDocument(client, collection, document) {
  console.log('document: ', { _id: document });
  const db = client.db();

  try {
    const response = await db
      .collection(collection)
      .findOneAndDelete({ name: document });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
