import { ref, get, set, remove, onValue } from "firebase/database";
import { database } from "../utilities/firebase";

export const getClothesData = (uid, callback) => {
    const dataRef = ref(database, `Users/${uid}/closet`);

    const unsuscribe = onValue(dataRef, async (snapshot) => {
        const data = snapshot.val(); // closet
        if (!data) {
            console.log('No data found, empty closet');
            callback([]);
            return;
        }
        // the imageURL now is genreated when uploading the image, thus the code below is no longer needed
        // Replace image path with real URLs for each clothing item
        // const updatedData = await Promise.all(
        //     Object.entries(data).map(async ([id, clothing]) => {
        //         try {
        //             return { ...clothing, imageURL: await generateURL(id) };
        //         } catch (error) {
        //             console.error("Error fetching image URL for clothing:", clothing.imageURL, error);
        //             return clothing;  // Return the original clothing in case of error
        //         }
        //     }))
        // console.log(updatedData);
        const clothes = Object.values(data);
        callback(clothes);
    });

    return unsuscribe;
}

export const getCategories = async () => {
    const dataRef = ref(database, 'parentCategories');
    return get(dataRef)
        .then((snapshot) => {
            const data = snapshot.val();
            if (!data) {
                console.log('No data found');
                return { categoriesOrdered: [], categoriesDict: {} };
            }

            const entries = data.flatMap((parentCategory) =>
                parentCategory.categories.map((category) => [category.name, parentCategory.name])
            );

            const categoriesDict = Object.fromEntries(entries);
            const categoriesOrdered = entries.map((arr) => arr[0]);
            return { categoriesOrdered, categoriesDict };
        })
        .catch((error) => {
            console.error('Error fetching categories:', error);
            return { categoriesOrdered: [], categoriesDict: {} };
        });
};
export const writeData = async (uid, clothingId, data) => {
    const dbRef = ref(database, `Users/${uid}/closet/${clothingId}`);
    await set(dbRef, data);
    console.log('data written');
}

export const deleteData = (uid, clothingId) => {
    const dbRef = ref(database, `Users/${uid}/closet/${clothingId}`);
    remove(dbRef);
    console.log('data deleted');
}

export const copyUserData = (uid1, uid2) => {
    const dbRef = ref(database, `Users/${uid1}/closet`);
    get(dbRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log(data);
                set(ref(database, `Users/${uid2}/closet`), data);
                console.log('data copied');
            } else {
                console.log('No data found');
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
}