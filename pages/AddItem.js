import React from "react";
import {
  MdCloudUpload,
  MdFastfood,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { motion } from "framer-motion";
import { categories } from "../utils/data";
import Loader from "../components/Loader";
import Image from "next/image";
import { storage } from "../firebase.config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { saveItem } from "../utils/firebaseFunctions";
import { useSetRecoilState } from "recoil";
import { foodItemsAtom } from "../atoms/initialState";
import { getAllFoodItems } from "../utils/firebaseFunctions";
import { useEffect } from "react";

const AddItem = () => {
  const setFoodItems = useSetRecoilState(foodItemsAtom);

  const [title, setTitle] = React.useState("");
  const [calories, setCalories] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState(null);
  const [fields, setFields] = React.useState(false);
  const [alertStatus, setAlertStatus] = React.useState("danger");
  const [msg, setMsg] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageAsset, setImageAsset] = React.useState(null);

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];

    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error uploading image");
        setAlertStatus("danger");
        setTimeout(() => {
          setIsLoading(false);
          setFields(false);
        }, 42000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageAsset(url);
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  const saveDetails = () => {
    setIsLoading(true);

    try {
      if (!title || !calories || !imageAsset || !price || !category) {
        throw new Error("Please fill all the fields");
      } else {
        const data = {
          id: `${Date.now()}`,
          title,
          imageURL: imageAsset,
          calories,
          price,
          category,
          qty: 1,
        };
        saveItem(data);

        setIsLoading(false);
        setFields(true);
        setMsg("Data uploaded successfully");
        setAlertStatus("success");
        clearData();
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg(error.message);
      setAlertStatus("danger");
      setTimeout(() => {
        setIsLoading(false);
        setFields(false);
      }, 4000);
    }
    fetchData();
  };

  const clearData = () => {
    setTitle("");
    setCalories("");
    setPrice("");
    setImageAsset(null);
    setCategory("Select Category");
  };

  const fetchData = async () => {
    await getAllFoodItems().then((items) => {
      setFoodItems(items);
    });
  };

  return (
    <div className="w-full py-15 h-[100vh]  flex items-start justify-center">
      <div className="w-[90%]  max-h-[85%]  overflow-y-scroll md:w-[75%] rounded-xl gap-10 p-8 bg-primary flex flex-col items-center border-solid  border-2 justify-center">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-base font-semibold ${
              alertStatus === "danger"
                ? "bg-red400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="bg-transparent font-bold w-full h-full outline-none border-none placeholder:text-gray-400 text-textColor"
          ></input>
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other">Select Category</option>
            {categories &&
              categories.map((category) => (
                <option
                  key={category.id}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={category.urlParamName}
                >
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div
          className="group flex justify-center items-center flex-col border-2 border-dotted
         border-gray-300 p-2 rounded-lg w-full h-225 md:h-420 cursor-pointer"
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col cursor-pointer items-center justify-center">
                    <div className="w-full h-full flex flex-col  items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Upload Image
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="h-0 w-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <Image
                      src={imageAsset}
                      alt="uploaded image"
                      width="100%"
                      height="100%"
                    />
                    <button
                      type="button"
                      className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-3xl" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none
              placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-3xl" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none border-none
              placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
