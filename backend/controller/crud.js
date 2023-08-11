const User = require("../model/User");
const fs = require('fs');
const { v4: uuidv4 } = require('uuid')
const path = require('path');
const { exec } = require('child_process');
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

const uniqueFilename = `${uuidv4()}.mp4`; // Generate a unique filename
const outputVideoPath = path.join(__dirname, 'compressed', uniqueFilename);

// Perform video compression using FFmpeg
const ffmpegCommand = `ffmpeg -i - -c:v libx264 -crf 23 -c:a aac -b:a 128k ${outputVideoPath}`;

const ffmpegProcess = exec(ffmpegCommand, (error, stdout, stderr) => {
    if (error) {
        console.error('Error executing FFmpeg command:', error);
        console.error('FFmpeg stderr:', stderr);
        res.status(500).json({ error: 'Error compressing video' });
        return;
    }

    console.log('FFmpeg stdout:', stdout); // Log the standard output
    console.log('FFmpeg stderr:', stderr); // Log the standard error

    ffmpegProcess.on('exit', (code, signal) => {
        console.log('Exit code:', code);

        if (code === 0) {
            console.log('Video compressed successfully. Compressed file:', outputVideoPath);
            res.json({ message: 'Video uploaded and compressed successfully' });
        } else {
            console.error('Error compressing video');
            console.error('Exit code:', code);
            console.error('FFmpeg stderr:', stderr); // Log the stderr output
            res.status(500).json({ error: 'Error compressing video' });
        }
    });

    ffmpegProcess.stdin.write(videoBuffer);
    ffmpegProcess.stdin.end();
});



    
        // try {
        // const lol = cloudinary.uploader.upload_stream(
        // { resource_type: "video" , format: "webm"},
        // (error, result) => {
        //     if (error) {
        //     console.error("Error uploading:", error);
        //     } else {
        //     console.log("Upload result:", result);
        //     const secureUrl = result.secure_url; 
        //     console.log("Secure URL:", secureUrl);
        //     }
        // }
        // ); 
        // lol.write(videoBuffer); 
        // lol.end()   
        // } catch (error) {
        // console.error(error);
        // res.status(500).json({ message: 'Upload failed' });
        // }
    },
}