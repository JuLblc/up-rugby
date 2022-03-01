import axios from 'axios'

export const postUpload = async (formData, folder, resource_type) => {
  return await axios.post('/api/uploads', formData, {
    params: {
      folder,
      resource_type
    }
  })
}
