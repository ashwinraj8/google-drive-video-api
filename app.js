const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const authorize = require('./services/auth');
const downloadVideoFile = require('./services/downloadVideo');
const uploadVideoWithProgress = require('./services/uploadVideoWithProgress');

app.use(cors());
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//This function performs video download and upload.
app.post('/download-and-upload', async (req, res) => {
    try {
        const authClient = await authorize();

        //Place the target file Id here.
        const fileId = '';

        const [downloadResponse, uploadResponse] = await Promise.all([
            await downloadVideoFile(authClient, fileId, res),
            await uploadVideoWithProgress(authClient),
        ])

        res.status(200).json({
            downloadedFileId: fileId,
            uploadedFileId: uploadResponse,
            message: 'File download and upload successful',
            downloadTime: new Date().toString(),
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error during upload and download' });
    }
})

// ------***-----Additional handlers for test purpose-----***---------------
app.post('/upload-video-to-drive', async (req, res) => {
    try {
        const authClient = await authorize();
        const uploadedVideoId = await uploadVideoWithProgress(authClient);  // returns an id of string type.
        res.status(200).json({ fileId: uploadedVideoId });
    } catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({ error: 'Error uploading video to Google Drive' });
    }
});

app.post('/downlaod-video-file', async (req, res) => {

    try {
        const authClient = await authorize(); // Authenticate with Google Drive
        const fileId = '';

        const response = await downloadVideoFile(authClient, fileId, res);

        response.data.on('error', (err) => {
            console.error('Error downloading video file:', err);
            res.status(500).json({ error: 'Error downloading video file from Google Drive' });
        });
        res.status(200).set('Content-Type', 'video/mp4');
        res.status(200).json({
            message: 'File download successful',
            fileId: fileId,
            downloadTime: new Date().toString(),
        });
        // Pipe the downloaded data directly to the HTTP response
        // response.data.pipe(res);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error during file download' });
    }
});




