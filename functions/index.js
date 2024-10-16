const { onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();

exports.getOutfit = onCall(async (request) => {
  try {
    // Retrieve the weather from the client request
    const weatherData = request.data.weatherData;
    const location = weatherData.location;
    const current = weatherData.currentTemperature;
    const high = weatherData.highTemperature;
    const low = weatherData.lowTemperature;
    const condition = weatherData.weatherCondition;
    const chance = weatherData.chanceOfRain;

    // Retrieve data from Realtime Database
    const snapshot = await admin.database().ref('/parentCategories').once('value');
    const parentCategories = snapshot.val();

    if (!parentCategories) {
      return { data: 'No parent categories found' };
    }

    // Respond with a valid JSON object
    return {
      data: {
        database: `Parent Category 1: ${parentCategories[0].name}`,
        weather: {
          location: weatherData.location,
          current: weatherData.currentTemperature,
          high: weatherData.highTemperature,
          low: weatherData.lowTemperature,
          condition: weatherData.weatherCondition,
          chance: weatherData.chanceOfRain,
        }
      }
    };
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Error retrieving data from Firebase', error.message);
  }
});
