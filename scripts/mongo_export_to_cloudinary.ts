import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import archiver from "archiver";
import { v2 as cloudinary } from "cloudinary";
import { removePath } from "./utils";

const generateDateHour = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}-${hours}-${minutes}`;
};

const createFolder = (folderPath: string) => {
  fs.mkdir(folderPath, { recursive: true }, (err) => {
    if (err) {
      console.error(
        `Erreur lors de la création du dossier '${folderPath}' :`,
        err
      );
    } else {
      console.log(`Dossier '${folderPath}' créé avec succès.`);
    }
  });
};

const loadEnvironmentConfig = () => {
  const envPath = path.resolve(__dirname, "..", ".env.local");

  dotenv.config({ path: envPath });
  const { CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET, MONGODB_URI } =
    process.env;

  if (
    !MONGODB_URI ||
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

  return { MONGODB_URI };
};

const extractJSONCollectionFromMongo = async (folderPath: string) => {
  const { MONGODB_URI } = loadEnvironmentConfig();
  const sourceClient = new MongoClient(MONGODB_URI);

  try {
    await sourceClient.connect();
    const sourceDB = sourceClient.db();

    const collections = await sourceDB.listCollections().toArray();

    for (const collectionInfo of collections) {
      const collectionName = collectionInfo.name;
      const collectionData = await sourceDB
        .collection(collectionName)
        .find()
        .toArray();

      const jsonFileName = `${collectionName}.json`;
      const jsonFilePath = `${folderPath}/${jsonFileName}`;

      fs.writeFileSync(jsonFilePath, JSON.stringify(collectionData, null, 2));
      console.log(
        `Collection '${collectionName}' sauvegardée au format JSON dans '${jsonFilePath}'`
      );
    }
  } catch (error) {
    console.error("Erreur lors de l'exportation des collections :", error);
  } finally {
    sourceClient.close();
  }
};

const zipData = async (sourcePath: string, zipFilePath: string) => {
  const output = fs.createWriteStream(sourcePath);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });

  archive.on("error", (err: Error) => {
    console.error("Une erreur s'est produite lors de la compression :", err);
  });

  output.on("close", () => {
    console.log(
      "La compression est terminée. Le fichier ZIP a été créé avec succès."
    );
  });

  archive.pipe(output);

  archive.directory(zipFilePath, false);

  await archive.finalize();
};

const uploadToCloudinary = async ({
  fileNameZip,
  folder,
  publicId,
}: {
  fileNameZip: string;
  folder: string;
  publicId: string;
}) => {
  if (!fs.existsSync(fileNameZip) || fs.statSync(fileNameZip).size === 0) {
    throw new Error("Le fichier backup n'existe pas");
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    fileNameZip,
    {
      folder,
      public_id: publicId,
      resource_type: "raw",
    },
    (error, result) => {
      if (error) {
        console.error("Erreur lors de l'upload sur Cloudinary :", error);
      } else {
        console.log("Fichier uploadé avec succès :", result);
      }
    }
  );

  return cloudinaryResponse;
};

export const exportToCloudinary = async () => {
  const dateHour = generateDateHour();
  const folderName = `mongo-backup-${dateHour}`;
  const folderPath = path.join(process.cwd(), folderName);
  const fileNameZip = `${folderName}.zip`;
  const cloudinaryDestinationFolder = "up-rugby-mongo-backup";

  console.log({ folderPath });

  if (!fs.existsSync(folderPath)) {
    createFolder(folderPath);
  }

  await extractJSONCollectionFromMongo(folderPath);

  await zipData(fileNameZip, folderName);

  const cloudinaryResponse = await uploadToCloudinary({
    fileNameZip,
    folder: cloudinaryDestinationFolder,
    publicId: folderName,
  });

  removePath(fileNameZip);
  removePath(folderName);

  return cloudinaryResponse;
};
