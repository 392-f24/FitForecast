import {firebase} from "../utilities/firebase";
import { getStorage, ref, getDownloadURL} from "firebase/storage";

const storage = getStorage(firebase);

export const generateURL = (path) => {
    return getDownloadURL(ref(storage, path));
}
