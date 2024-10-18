const { onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
admin.initializeApp();

const filterByWeather = (low, high, clothes, parentCategoryName, parentCategories) => {
  const items = clothes.filter(item => item.parentCategory === parentCategoryName);
  const calculateOverlap = (itemLow, itemHigh, targetLow, targetHigh) => {
    const overlapStart = Math.max(itemLow, targetLow);
    const overlapEnd = Math.min(itemHigh, targetHigh);
    return Math.max(0, overlapEnd - overlapStart);
  };

  // Get temperature ranges for each category
  const categoryTempRanges = {};

  const categories = parentCategories.filter((obj) => obj.name === parentCategoryName)[0].categories;

  categories.forEach(category => {
    categoryTempRanges[category.name.toLowerCase()] = {
      lowestTemp: category.lowestTemp,
      highestTemp: category.highestTemp
    };
  });

  // Map footwear items with their overlaps
  const availableItems = items
    .map(item => {
      const tempRange = categoryTempRanges[item.category.toLowerCase()];
      if (!tempRange) return null;
      if (item.parentCategory === "Footwear") {
        return {
          item: item, // Keep the full object
          overlap: calculateOverlap(
            tempRange.lowestTemp,
            tempRange.highestTemp,
            low,
            high
          )
        };
      }
      else {
        // handle warmth level
        const warmthLevel = item.warmthLevel;
        const interval = (tempRange.highestTemp - tempRange.lowestTemp) / 4;
        const middleTemp = tempRange.lowestTemp + interval * (5 - warmthLevel);
        return {
          item: item, // Keep the full object
          overlap: calculateOverlap(
            middleTemp - interval,
            middleTemp + interval,
            low,
            high
          )
        };
      }
    })
    .filter(item => item !== null && item.overlap > 0);

  // Sort by overlap
  availableItems.sort((a, b) => b.overlap - a.overlap);

  return availableItems;
}

exports.getOutfit = onCall(async (request) => {
  try {
    // Retrieve the weather from the client request
    const { location, current_temperature, high_temperature, low_temperature, weather_condition, chance_of_rain } = request.data.weatherData;

    // get user's closet
    const uid = request.data.uid;
    console.log("Current User: ", uid);
    if (!uid) {
      return { data: 'No uid found' };
    }

    const clothesSnapshot = await admin.database().ref(`/Users/${uid}/closet`).once('value');
    const closet = clothesSnapshot.val();
    console.log("Closet: ", closet);
    const clothes = Object.values(closet);

    if (!clothes) {
      return { data: 'No clothes found' };
    }

    console.log("clothes:", clothes);

    // Retrieve categories
    const categorySnapshot = await admin.database().ref('/parentCategories').once('value');
    const parentCategories = categorySnapshot.val();

    if (!parentCategories) {
      return { data: 'No parent categories found' };
    }

    const shirtThreshold = 65;
    let filteredTops;
    if (low_temperature < shirtThreshold) {
      filteredTops = clothes.filter(item => item.parentCategory == "Top"); // all the tops
      filteredTops.sort((a, b) => b.preference - a.preference);
      filteredTops = filteredTops.map(item => ({ "item": { ...item } }));
    } else {
      filteredTops = filterByWeather(low_temperature, high_temperature, clothes, "Top", parentCategories);
    }

    const filteredBottoms = filterByWeather(low_temperature, high_temperature, clothes, "Bottom", parentCategories);
    const filteredFootwear = filterByWeather(low_temperature, high_temperature, clothes, "Footwear", parentCategories);
    const filteredOuterwear = filterByWeather(low_temperature, high_temperature, clothes, "Outerwear", parentCategories);

    // get final outfit
    const getRandomOutfit = (filteredTops, filteredBottoms, filteredFootwear, filteredOuterwear) => {
      const getRandomFromTop3 = (items) => {
        if (!items || items.length === 0) return null;

        // Get up to first 3 items
        const top3 = items.slice(0, Math.min(3, items.length));
        // Get random index within available items
        const randomIndex = Math.floor(Math.random() * top3.length);
        return top3[randomIndex].item;
      };

      return {
        top: getRandomFromTop3(filteredTops),
        bottom: getRandomFromTop3(filteredBottoms),
        footwear: getRandomFromTop3(filteredFootwear),
        outerwear: getRandomFromTop3(filteredOuterwear)
      };
    };

    const { top, bottom, outerwear, footwear } = getRandomOutfit(filteredTops, filteredBottoms, filteredFootwear, filteredOuterwear);

    // Respond with a valid JSON object
    return {
      top: top.imageURL ? top.imageURL : '',
      bottom: bottom.imageURL ? bottom.imageURL : '',
      outerwear: outerwear.imageURL ? outerwear.imageURL : '',
      footwear: footwear.imageURL ? footwear.imageURL : '',
    };
  } catch (error) {
    // throw new functions.https.HttpsError('internal', 'Error retrieving data from Firebase', error.message);
    console.log(error);
  }
});
