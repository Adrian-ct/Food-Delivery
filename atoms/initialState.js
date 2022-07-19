import { atom } from "recoil";

const foodItemsAtom = atom({
  key: "foodItems",
  default: [],
});

export { foodItemsAtom };
