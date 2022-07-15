import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbLfK4Efn-PcNp56_eLxm241KehtkffEg",
  authDomain: "food-delivery-b2071.firebaseapp.com",
  databaseURL:
    "https://food-delivery-b2071-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "food-delivery-b2071",
  storageBucket: "food-delivery-b2071.appspot.com",
  messagingSenderId: "229018989701",
  appId: "1:229018989701:web:9fdba150549bc8770665ec",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
