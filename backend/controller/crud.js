const User = require("../model/User");
const fs = require('fs');
const cloudinary = require("cloudinary").v2; // Import Cloudinary library
require("dotenv").config({ path: "./config/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});





module.exports = {
  editProfile: async (req, res) => {
    const videoBuffer = req.file.buffer;
try {
const lol = cloudinary.uploader.upload_stream(
  { resource_type: "video" , format: "webm"},
  (error, result) => {
    if (error) {
      console.error("Error uploading:", error);
    } else {
      console.log("Upload result:", result);
      const secureUrl = result.secure_url; // Access the secure URL here
      console.log("Secure URL:", secureUrl);
    }
  }
 ); // Pass the videoBuffer directly to the upload stream
 lol.write(videoBuffer); // Write the video buffer to the uploader stream
  lol.end()   
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Upload failed' });
}
    // Convert .mov to .mp4 using ffmpeg
    // const ffmpeg = require('fluent-ffmpeg');
    // const tempMovPath = '/path/to/temp.mov'; // Set the temporary file path
    // const tempMp4Path = '/path/to/temp.mp4'; // Set the destination .mp4 file path

    // require('fs').writeFileSync(tempMovPath, videoBuffer);

    // ffmpeg(tempMovPath)
    //   .output(tempMp4Path)
    //   .on('end', async () => {
    //     // At this point, temp.mp4 is ready for further processing or storage
    //     // You can save temp.mp4 to your storage solution (e.g., Cloudinary)
    //     const lol = await cloudinary(tempMp4Path)
    //     console.log(lol)
    //     res.status(200).json({ message: 'Conversion successful' });
    //   })
    //   .run();
    //   console.log('after FFmpeg process');

  // this is the one you need to uncomment }

// editProfile:  async (req,res) => {
//   const videoBuffer = req.file.buffer;
//   const outputPath = path.join(__dirname, 'compressed-video.mp4'); // Adjust the output path

//   fs.writeFileSync('input-video.mp4', videoBuffer);

//     ffmpeg('input-video.mp4')
//     .outputOptions(['-c:v libx264', '-crf 23', '-preset medium']) // Adjust compression options
//     .output(outputPath)
//     .on('end', async () => {
//       try {
//         const cloudinaryUploadResult = await cloudinary(outputPath);
//         conosole.log(cloudinaryUploadResult)
//         // Handle compression and upload completed
//         res.json({ message: 'Video compressed and uploaded to Cloudinary', data: cloudinaryUploadResult });
//       } catch (error) {
//         console.error('Error uploading compressed video to Cloudinary:', error);
//         res.status(500).json({ error: 'Error uploading video' });
//       }
//     })
//     .on('error', (err) => {
//       // Handle compression error
//       console.error('Error compressing video:', err);
//       res.status(500).json({ error: 'Error compressing video' });
//     })
//     .run();
//         // try{
//         //      if(req.body.obj.profilePic !== undefined){
//         //         const updateUser = await User.findOneAndUpdate(
//         //             {_id: req.body.id},
//         //             {
//         //                 $set: { img: await cloudinary(req.body.obj.profilePic), bio: req.body.obj.bio, userName: req.body.obj.username, websiteLink: req.body.obj.websiteLink},
//         //             }
//         //         )
//         //     } else {
//         //         const updateUser = await User.findOneAndUpdate(
//         //             {_id: req.body.id},
//         //             {
//         //                 $set: { bio: req.body.obj.bio, userName: req.body.obj.username, websiteLink: req.body.obj.websiteLink},
//         //             }
//         //         )
//         //     }
//         //     if (!updateUser) {
//         //         return res.status(404).json({ error: 'User not found' });
//         //     }
//         //     return res.status(200).json(updateUser);
//         // } catch(err){
//         //     console.error(err)
//         //     return res.status(500).json({ error: 'Internal Server Error' });
//         // }
    },
}