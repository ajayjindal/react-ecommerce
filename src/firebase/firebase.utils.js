import { initializeApp } from "firebase/app";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
} from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries
import firebaseConfig from "./firbase.cred";

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);
export const auth = getAuth(fireApp);
export const firestore = getFirestore(fireApp);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = doc(firestore, "users", userAuth.uid);
    const snapShot = await getDoc(userRef);
    if (!snapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log(error.message);
        }
    }
    return userRef;
};
export const convertCollectionsSnapshotToMap = (collections) => {
    let transformedCollection = collections.docs.map((doc) => {
        const { title, items } = doc.data();
        return {
            routerName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items,
        };
    });
    return transformedCollection.reduce((acc, collection) => {
        acc[collection.title.toLowerCase()] = collection;
        return acc;
    }, {});
};

// temp util for adding data blobs one time
export const addCollectionAndItems = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(firestore, collectionKey);
    const batch = writeBatch(firestore);
    objectsToAdd.forEach((obj) => {
        const newDocRef = doc(collectionRef);
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
};
