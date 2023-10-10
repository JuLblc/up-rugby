import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";

async function duplicateCOllectionsToNewDB() {
  const envPath = path.resolve(__dirname, "..", ".env.local");

  dotenv.config({ path: envPath });
  const { IMPORT_MONGODB_URI, MONGODB_URI } = process.env;

  if (!MONGODB_URI || !IMPORT_MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }

  const sourceClient = new MongoClient(MONGODB_URI);
  const destinationClient = new MongoClient(IMPORT_MONGODB_URI);

  try {
    await sourceClient.connect();
    const sourceDB = sourceClient.db();

    await destinationClient.connect();

    const collections = await sourceDB.listCollections().toArray();

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      const sourceCollection = sourceDB.collection(collectionName);
      const destinationCollection = destinationClient
        .db()
        .collection(collectionName);

      const documents = await sourceCollection.find().toArray();

      await destinationCollection.insertMany(documents);
      console.log(`Collection '${collectionName}' exportée avec succès.`);
    }

    console.log("Exportation terminée.");
  } catch (error) {
    console.error("Erreur lors de l'exportation des collections :", error);
  } finally {
    sourceClient.close();
    destinationClient.close();
  }
}

duplicateCOllectionsToNewDB();
