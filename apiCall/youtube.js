import axios from "axios";

export const getYoutubeVideo = async (youtubeId) => {
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&part=contentDetails&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;

  return await axios.get(url);
};
