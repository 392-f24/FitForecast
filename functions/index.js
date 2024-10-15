/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// The Cloud Functions for Firebase SDK to setup triggers and logging.
const {onRequest} = require("firebase-functions/v2/https");
const {logger} = require("firebase-functions");

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require("firebase-admin");
admin.initializeApp();

exports.hello = onRequest(async (request, response) => {

  // retrieve data
  const snapshot = await admin.database().ref('/parentCategories').once('value');
  const data = snapshot.val();
  response.send(`Hi, this is firebase! Parent Categories: ${data[0].name}`);

  // function logic


  // return

  
  // logger.info("Hello logs!", {structuredData: true});
  // response.send("Hello World!");
});