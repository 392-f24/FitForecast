import { getDatabase, ref, onValue, set, remove} from "firebase/database";
import {firebase} from "../utilities/firebase";

const db = getDatabase(firebase);

export const readData = (path='/') => {
    const dbRef = ref(db, path);
    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
    });
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

