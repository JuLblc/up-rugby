import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import multer from "multer";
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiOptions,
} from "cloudinary";

const upload = multer({ dest: "/tmp" });

const handler = nc<NextApiRequest, NextApiResponse>();

const { CLOUDINARY_KEY, CLOUDINARY_NAME, CLOUDINARY_SECRET } = process.env;

if (!CLOUDINARY_KEY || !CLOUDINARY_SECRET || !CLOUDINARY_NAME) {
  throw new Error("Cloudinary credentials are not provided.");
}

cloudinary.config({
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
  cloud_name: CLOUDINARY_NAME,
});

type File = {
  originalname: string;
  path: string;
};

const uploads = (
  file: File,
  folder: UploadApiOptions["folder"],
  resource_type: UploadApiOptions["resource_type"]
): Promise<any> => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file.path,
      {
        folder,
        public_id: file.originalname,
        resource_type,
      },
      function (error: Error, result: UploadApiResponse) {
        if (resource_type === "raw") {
          resolve(result.secure_url);
        }
        if (resource_type === "image") {
          const imgInfo = {
            height: result.height,
            url: result.secure_url,
            width: result.width,
          };

          resolve(imgInfo);
        }
      }
    );
  });
};

handler.post(upload.array("file"), async (req, res) => {
  const { folder, resource_type } = req.query;

  const uploader = async (file: File) => {
    return await uploads(
      file,
      folder as UploadApiOptions["folder"],
      resource_type as UploadApiOptions["resource_type"]
    );
  };

  const { files } = req;

  if (resource_type === "raw") {
    const secureUrls: string[] = [];

    for (const file of files as File[]) {
      const secureUrl = await uploader(file);

      secureUrls.push(secureUrl);
    }

    res.status(200).json({ secureUrls });
  }

  if (resource_type === "image") {
    const imgInfo = await uploader(files[0]);

    res.status(200).json(imgInfo);
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
