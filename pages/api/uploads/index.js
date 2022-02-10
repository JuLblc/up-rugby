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

const uploads = async (file, folder, resource_type) => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(
      file.path,
      {
        public_id: file.originalname,
        folder,
        resource_type
      },
      function (error, result) {
        if (resource_type === 'raw'){
          resolve(result.secure_url)
        }
        if (resource_type === 'image'){
          const imgInfo = {
            url:result.secure_url,
            width: result.width,
            height: result.height
          }
          resolve(imgInfo)
        }
      }
    )
  })
}

handler.post(upload.array('file'), async (req, res) => {
  const { folder, resource_type } = req.query
  const uploader = async file => await uploads(file, folder, resource_type)
  const files = req.files

  console.log('files: ', files)

  if (resource_type === 'raw') {
    const secureUrls = []
    for (const file of files) {
      const secureUrl = await uploader(file)
      secureUrls.push(secureUrl)
    }

    res.status(200).json({ secureUrls })
  }

  if (resource_type === 'image') {
    const imgInfo = await uploader(files[0])

    console.log('imgInfo: ', imgInfo)
    res.status(200).json(imgInfo)
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler
