import { exportToCloudinary } from "../../../scripts/mongo_export_to_cloudinary";

export default async function handler(req, res) {
  try {
    const cloudinaryResponse = await exportToCloudinary();

    res.status(200).json({ cloudinaryResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
