const { google } = require('googleapis'); 
const apikeys = require('../apikey.json');

async function authorize() {
    const SCOPE = ['https://www.googleapis.com/auth/drive'];

    const jwtClient = new google.auth.JWT(
        apikeys.client_email,
        null,
        apikeys.private_key,
        SCOPE
    );

    await jwtClient.authorize();
    return jwtClient;
}

module.exports = authorize;
