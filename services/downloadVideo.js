const { google } = require('googleapis'); 
const fs = require('fs');

const downloadVideoFile = async (authClient, fileId,res) => {
    const drive = google.drive({ version: 'v3', auth: authClient });
  
    // Give a destination to stream downloaded data into it.
    const destFile = fs.createWriteStream('downloaded-LargeVideo.mp4'); //Name your downloaded video.
  
    return new Promise((resolve, reject) => {
      drive.files.get(
        { fileId: fileId, alt: 'media' },
        { responseType: 'stream' },
        (err, response) => {
          if (err) {
            reject(err);
            return;
          }
          console.log('Download Started...');
          let bytesDownloaded = 0;
          const totalBytes = response.headers['content-length'];
        //   res.setHeader('Content-Length', totalBytes);
          console.log('response.status-->',response.status);

          //Handeling chuck of data
          response.data
          .on('data', (chunk) => {
            bytesDownloaded += chunk.length;
           
            // Log the progress in percentage
            const progress = (bytesDownloaded / totalBytes) * 100;
            console.log(`Download Progress: ${progress.toFixed(2)}%`);
          })
            .on('end', () => {
              // Video file download completed
              console.log('Done downloading file.');
              destFile.end();
              resolve(response);
            })
            .on('error', (err) => {
              // Error during download
              reject(err);
            })
            .pipe(destFile);
        }
      );
    });
  };

  module.exports = downloadVideoFile;