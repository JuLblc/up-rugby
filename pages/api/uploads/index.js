import nc from 'next-connect'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'

const upload = multer({ dest: '/tmp' })

const handler = nc()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

handler.post(upload.single('file'), async (req, res) => {
  console.log(req.file)
  if (req.file) {
    cloudinary.uploader
      .upload(req.file.path, {
        public_id: req.file.originalname,
        folder: '/uprugby-uploads',
        resource_type: 'raw'
      })
      .then(uploadedFile => res.status(200).json({ uploadedFile }))
      .catch(err => console.log(err))
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler
