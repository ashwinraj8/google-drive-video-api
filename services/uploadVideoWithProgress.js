const { google } = require('googleapis');
const fs = require('fs');

async function uploadVideoWithProgress(authClient) {
    return new Promise(async (resolve, reject) => {
        console.log('Upload started...');

        const drive = google.drive({ version: 'v3', auth: authClient });

        const videoFilePath = 'downloaded-LargeVideo.mp4'; 
        const videoFileName = 'downloaded-LargeVideo.mp4';

        //Place the parent folder Id.
        const parentFolderId = '';

        const media = {
            mimeType: 'video/mp4',
            body: fs.createReadStream(videoFilePath),
        };

        try {
            const response = await drive.files.create({
                resource: {
                    name: videoFileName,
                    parents: [parentFolderId],
                },
                media: media,
                fields: 'id',
            });

            const fileId = response.data.id;
            console.log('fileId------>',fileId);
            console.log('Video upload started...');

            const fileSize = fs.statSync(videoFilePath).size;
            const chunkSize = 2 * 1024 * 1024; // 2 MB Chunk size.
            let uploadedDataBytes = 0;

            //Creating a stream for uploading with a limit of 2 MB chink size.
            const fileStream = fs.createReadStream(videoFilePath, { highWaterMark: chunkSize });
            
            //Handeling uploading data chunk.
            fileStream.on('data', (chunk) => {
                uploadedDataBytes += chunk.length;
                const progress = (uploadedDataBytes / fileSize) * 100;
                console.log(`Upload Progress: ${progress.toFixed(2)}%`);
            });

            fileStream.on('end', () => {
                console.log('Upload completed!');
                resolve(fileId);
            });

            fileStream.on('error', (err) => {
                reject(err);
            });
        } catch (err) {
            reject(err);
        }
    });
}

module.exports = uploadVideoWithProgress;
