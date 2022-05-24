import axios from 'axios'

export const getVimeoVideo = async vimeoId => {
  try {
    return await axios.get(`https://api.vimeo.com/videos/${vimeoId}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_VIMEO_TOKEN}`
      }
    })
  } catch (err) {
    console.log(err)
    return false
  }
}
