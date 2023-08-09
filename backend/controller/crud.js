const User = require("../model/User");
const cloudinary = require('../middleware/cloudinary');
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath('/usr/local/bin/ffmpeg'); ; // Replace with the actual path





module.exports = {
  editProfile: async (req, res) => {
    const videoBuffer = req.file.buffer;
    const outputPath = path.join(__dirname, 'compressed-video.mp4'); // Adjust the output path
    
    fs.writeFileSync('compressed-video.mp4', videoBuffer);
console.log('Before FFmpeg process');
    ffmpeg('compressed-video.mp4')
      .outputOptions(['-c:v libx264', '-crf 23', '-preset medium']) // Adjust compression options
      .output(outputPath)
      .on('end', async () => {
        console.log('during FFmpeg process');
        try {
          const cloudinaryUploadResult = await cloudinary(outputPath);
          console.log('lol')
          console.log(cloudinaryUploadResult); // Fixed typo here
          // Handle compression and upload completed
          res.json({ message: 'Video compressed and uploaded to Cloudinary', data: cloudinaryUploadResult });
        } catch (error) {
          console.error('Error uploading compressed video to Cloudinary:', error);
          res.status(500).json({ error: 'Error uploading video' });
        }
      })
      .on('error', (err) => {
        // Handle compression error
        console.error('Error compressing video:', err);
        res.status(500).json({ error: 'Error compressing video' });
      })
      .run();
      console.log('after FFmpeg process');
  }
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
//     },
}