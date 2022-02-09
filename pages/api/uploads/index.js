import nc from "next-connect";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";

const upload = multer({ dest: "/tmp" });

const handler = nc();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const uploads = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file.path,
      {
        public_id: file.originalname,
        folder: "/uprugby-uploads",
        resource_type: "raw"
      },
      function (error, result) {
        resolve(result.secure_url);
      }
    );
  });
};

handler.post(upload.array("file"), async (req, res) => {
  const uploader = async (file) => await uploads(file); // uploads(file, folder, ressourceType)

  const secureUrls = [];
  const files = req.files;
  for (const file of files) {
    const secureUrl = await uploader(file);
    secureUrls.push(secureUrl);
  }

  res.status(200).json({ secureUrls });
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default handler;
