/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

// // Importing the necessary functions
// import { onRequest } from "firebase-functions/v2/https";
// import { logger } from "firebase-functions/logger";

// // Define your HTTP function
// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

// ESM
// Import necessary modules
import { onRequest } from "firebase-functions/v2/https";
import { initializeApp } from "firebase-admin/app"; // Import the initializeApp function
import * as logger from "firebase-functions/logger"; // Destructure logger from the imported package

// Initialize Firebase Admin SDK
initializeApp();

// Define the Cloud Function
export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
