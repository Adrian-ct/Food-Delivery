import MainContainer from "../components/MainContainer";
import { useSetRecoilState } from "recoil";
import { foodItemsAtom } from "../atoms/initialState";
import { getAllFoodItems } from "../utils/firebaseFunctions";
import { useEffect } from "react";
export default function Home() {
  const setFoodItems = useSetRecoilState(foodItemsAtom);
  const fetchData = async () => {
    await getAllFoodItems().then((items) => {
      setFoodItems(items);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="w-screen h-screen overflow-y-scroll flex flex-col bg-primary">
      <main className="mt-16 md:mt-20 px-4 md:px-13 lg:px-16 py-4 w-full">
        <MainContainer />
      </main>
    </div>
  );
}
