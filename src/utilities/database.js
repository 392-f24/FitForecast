import { getDatabase, ref, get,set, remove} from "firebase/database";
import { generateURL } from "./storage";
import {firebase} from "../utilities/firebase";

const db = getDatabase(firebase);

export const getClothesData = async(userName='admin') => {
    const dataRef = ref(db, `Users/${userName}/closet`);
    const snapshot = await get(dataRef);
    const data = snapshot.val();
    if (!data) {
        console.log('No data found');
        return [];
    }

    // Replace image path with real URLs for each clothing item
    const updatedData = await Promise.all(
        data.map(async (clothing) => {
          try {
            return { ...clothing, imageURL: await generateURL(clothing.imageURL) };
          } catch (error) {
            console.error("Error fetching image URL for clothing:", clothing.imageURL, error);
            return clothing;  // Return the original clothing in case of error
          }
        }))
    console.log(updatedData);
    return updatedData;
}

export const getCategories = async() => {
    const dataRef = ref(db, 'parentCategories');
    const snapshot = await get(dataRef);
    const data = snapshot.val();
    if (!data) {
        console.log('No data found');
        return [];
    }
    console.log(data);
    return data;
}

export const writeData = (path, data) => {
    const dbRef = ref(db, path);
    set(dbRef, data);
    console.log('data written');
}

export const deleteData = (path) => {
    const dbRef = ref(db, path);
    remove(dbRef);
    console.log('data deleted');
}

