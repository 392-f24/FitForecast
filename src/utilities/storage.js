import { storage } from "../utilities/firebase";
import { getStorage, ref, getDownloadURL, uploadBytes} from "firebase/storage";

//const storage = getStorage(firebase);

export const generateURL = (id) => {
    return getDownloadURL(ref(storage, `${id}.png`));
}

export const uploadFile = async(id, file) => {
    const storageRef = ref(storage, id);
    return uploadBytes(storageRef, file);
}
