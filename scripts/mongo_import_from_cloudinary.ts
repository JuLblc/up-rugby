import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import fs from "fs";
import unzipper from "unzipper";
import { removePath } from "./utils";
import { ObjectIdLike } from "bson";

const loadEnvironmentConfig = () => {
  const envPath = path.resolve(__dirname, "..", ".env.local");

  dotenv.config({ path: envPath });
  const {
    BACKUP_SECURE_URL_VERSION,
    CLOUDINARY_KEY,
    CLOUDINARY_NAME,
    CLOUDINARY_SECRET,
    IMPORT_MONGODB_URI,
  } = process.env;

  if (
    !BACKUP_SECURE_URL_VERSION ||
    !IMPORT_MONGODB_URI ||
    !CLOUDINARY_KEY ||
    !CLOUDINARY_NAME ||
    !CLOUDINARY_SECRET
  ) {
    throw new Error("Define the environmental variable");
  }

  cloudinary.config({
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET,
    cloud_name: CLOUDINARY_NAME,
  });

  return { BACKUP_SECURE_URL_VERSION, CLOUDINARY_NAME, IMPORT_MONGODB_URI };
};

const downloadFile = async (url: string, outputPath: string) => {
  try {
    const response = await axios.get(url, { responseType: "stream" });

    const writer = fs.createWriteStream(outputPath);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
  } catch (error) {
    console.error("Une erreur s'est produite lors du téléchargement :", error);
  }
};

const unzipData = (zipFilePath: string, destinationFolder: string) => {
  fs.createReadStream(zipFilePath)
    .pipe(unzipper.Extract({ path: destinationFolder }))
    .on("close", () => {
      console.log("Files unzipped successfully");
    });
};

const importJSONCollectionToMongo = async (uri: string, folderName: string) => {
  const destinationClient = new MongoClient(uri);

  try {
    await destinationClient.connect();
    const destinationDB = destinationClient.db();

    const files = fs.readdirSync(folderName);

    for (const file of files) {
      if (path.extname(file) === ".json") {
        const collectionName = path.basename(file, path.extname(file));
        const filePath = path.join(folderName, file);
        const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

        const modifiedData = jsonData.map(
          (item: {
            _id:
              | string
              | number
              | Buffer
              | Uint8Array
              | ObjectId
              | ObjectIdLike
              | undefined;
            author:
              | string
              | number
              | Buffer
              | Uint8Array
              | ObjectId
              | ObjectIdLike
              | undefined;
          }) => {
            if (item._id) {
              item._id = new ObjectId(item._id);
            }
            if (item.author) {
              item.author = new ObjectId(item.author);
            }

            return item;
          }
        );

        const collection = destinationDB.collection(collectionName);

        const insertResult = await collection.insertMany(modifiedData);

        console.log(
          `Import réussi dans la collection "${collectionName}". ${insertResult.insertedCount} documents insérés.`
        );
      }
    }
  } catch (error) {
    console.error("Erreur lors de l'importation des collections :", error);
  } finally {
    destinationClient.close();
  }
};

export const importFromCloudinary = async () => {
  const folderName = "mongo-backup-2023-10-13-09-39";
  const fileNameZip = `${folderName}.zip`;
  const cloudinarySourceFolder = "up-rugby-mongo-backup";

  const { BACKUP_SECURE_URL_VERSION, CLOUDINARY_NAME, IMPORT_MONGODB_URI } =
    loadEnvironmentConfig();

  const secureUrl = `https://res.cloudinary.com/${CLOUDINARY_NAME}/raw/upload/${BACKUP_SECURE_URL_VERSION}/${cloudinarySourceFolder}/${fileNameZip}`;

  await downloadFile(secureUrl, fileNameZip);
  unzipData(fileNameZip, folderName);

  await importJSONCollectionToMongo(IMPORT_MONGODB_URI, folderName);

  removePath(fileNameZip);
  removePath(folderName);
};

importFromCloudinary();
