const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true }); // currently allowing all origins
admin.initializeApp();

exports.getOutfit = onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Retrieve data from Realtime Database
      const snapshot = await admin.database().ref('/parentCategories').once('value');
      const data = snapshot.val();

      if (!data) {
        // Handle case where no data is found
        return res.status(404).json({
          data: 'No parent categories found'
        });
      }

      // Respond with a valid JSON object
      return res.status(200).json({
        data: `Parent Category 1: ${data[0].name}`
      });
    } catch (error) {
      // Handle error and respond with a JSON error message
      return res.status(500).json({
        error: 'Error retrieving data from Firebase',
        details: error.message
      });
    }
  });
});

