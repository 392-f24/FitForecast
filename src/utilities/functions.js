import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase";

export const getSuggestedOutfit = async () => {
    const getOutfit = httpsCallable(functions, 'getOutfit');
    try {
        const result = await getOutfit();
        return result.data;
    } catch (error) {
        console.error("Error calling getOutfit function:", error);
        throw error;
    }
};