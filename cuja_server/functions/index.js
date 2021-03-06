const functions = require('firebase-functions')
const admin = require('firebase-admin')
const key = require('./creds-cuja.json')
const { google } = require('googleapis')
admin.initializeApp()


// GET MODULES
// Important to this function: folderId of Modules Folder have to specified. 
// The Authorization is linked to a Service Account, that have to have access to the Modules Folder.
const scopes = 'https://www.googleapis.com/auth/drive.readonly'
let folderId = '10IpDBYua_9S3uxpfuJWIDVivPeL4Me0s'
// Token creation with Service Account
const jwt = new google.auth.JWT(key.client_email, null, key.private_key, scopes)

const drive = google.drive({
    version: 'v3',
    auth: jwt
});

exports.getFolderList = functions.https.onCall((data, context) => {
    // console.log('Request coming in: ', req)
    // searching for files, that have the specified folderId as parent - if there is no folderId present in the request, we search for modules
    let driveReq = {}
    if(data.folderId.length) {
        driveReq = {q: `'${data.folderId}' in parents`, fields: 'files(id, name, mimeType, webViewLink)'}
    } else {
        driveReq = {q: `'${folderId}' in parents`, fields: 'files(id, name, mimeType, webViewLink)'}
    }
    // console.log('We search with: ', driveReq)
    // searching in drive - return promise 
    return drive.files.list(driveReq).then(response => {
        files = response.data.files
        // console.log('Files from API: ',files)
        return {
            msg: 'List incoming...',
            files
        }
    }).catch(err => console.log('Error in Google API call', err))
})

exports.getDoc = functions.https.onCall((data, context) => {
    // console.log('Request coming in: ', req)
    // searching for files, that have the specified folderId as parent
    const q = {
        fileId: data.id,
        mimeType: 'text/html'
    }
    // searching in drive - return promise 
    return drive.files.export(q).then(response => {
        // console.log('Response from Gapi: ', response)
        html = response.data
        // console.log('Files from API: ',files)
        return {
            msg: 'Doc incoming...',
            html
        }
    }).catch(err => console.log('Error in Google API call', err))
})