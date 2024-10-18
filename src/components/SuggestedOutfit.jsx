import React, { useState } from "react";
import ClothesCard from "./ClothesCard";
import { getSuggestedOutfit } from "../utilities/functions";
import { useEffect } from "react";
import { auth } from "../utilities/firebase";

const SuggestedOutfit = ({ weatherData, weatherError }) => {
  const currentUser = auth.currentUser;
  const uid = currentUser.uid;

  const [isLoading, setIsLoading] = useState(true);

  const [outfit, setOutfit] = useState({
    bottom: "",
    footwear: "",
    top: "",
    outerwear: "",
  });

  const fetchOutfit = async () => {
    setIsLoading(true);
    if (weatherData && !weatherError) {
      try {
        const result = await getSuggestedOutfit(weatherData, uid);
        setIsLoading(false);
        return result;
      } catch (error) {
        console.error("Error fetching suggested outfit:", error);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchOutfit().then((result) => {
      if (result) {
        setOutfit(result.data);
        setIsLoading(false);
      }
    });
  }, [weatherData]);

  const suggestNewOutfit = () => {
    fetchOutfit().then((result) => {
      if (result) {
        setOutfit(result.data);
        setIsLoading(false);
      }
    });
  };

  if (isLoading) {
    return <p>Loading outfit...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-left">Today's Outfit</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="w-full aspect-square">
          <ClothesCard url={outfit.bottom} />
        </div>
        <div className="w-full aspect-square">
          <ClothesCard url={outfit.top} />
        </div>
        <div className="w-full aspect-square">
          <ClothesCard url={outfit.footwear} />
        </div>
        <div className="w-full aspect-square">
          <ClothesCard url={outfit.outerwear} />
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={suggestNewOutfit}
          className="inline-flex px-4 py-3 justify-center items-center gap-3 rounded-xl bg-neutral-800 w-fit text-white"
        >
          <span className="material-symbols-rounded">autorenew</span>
          <p className="text-m font-semibold text-left">Suggest new outfit</p>
        </button>
      </div>
    </div>
  );
};

export default SuggestedOutfit;
