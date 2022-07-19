import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

//Saving new item
export const saveItem = async (item) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), item, {
    merge: true,
  });
};

//Fetch all items
export const getAllFoodItems = async () => {
  const items = await getDocs(
    query(collection(firestore, "foodItems"), orderBy("id", "desc"))
  );
  return items.docs.map((doc) => doc.data());
};
