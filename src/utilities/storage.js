import {firebase} from "../utilities/firebase";
import { getStorage, ref, getDownloadURL} from "firebase/storage";

const storage = getStorage(firebase);

export const readImage = () => {
    const shirtRef = ref(storage, 'images/whiteshirt.png');
    console.log (shirtRef.name);
}

export const generateURL = (path) => {
    return getDownloadURL(ref(storage, path));
}
