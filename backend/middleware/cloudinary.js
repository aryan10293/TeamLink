const cloudinary = require("cloudinary").v2;
require("dotenv").config({ path: "./config/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "video", // Set resource_type to "video"
};

const uploadVideo = (video) => {
  // video => base64 or buffer
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(video, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

module.exports = {
  uploadVideo,
  uploadMultipleVideos: (videos) => {
    return new Promise((resolve, reject) => {
      const uploads = videos.map((base) => uploadVideo(base));
      Promise.all(uploads)
        .then((values) => resolve(values))
        .catch((err) => reject(err));
    });
  },
};
