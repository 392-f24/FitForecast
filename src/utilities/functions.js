import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

export const getSuggestedOutfit = async (weatherData, uid) => {
    const getOutfit = httpsCallable(functions, 'getOutfit');
    try {
        const result = await getOutfit({ weatherData: weatherData, uid: uid });
        return result;
    } catch (error) {
        console.error("Error calling getOutfit function:", error);
        throw error;
    }
};