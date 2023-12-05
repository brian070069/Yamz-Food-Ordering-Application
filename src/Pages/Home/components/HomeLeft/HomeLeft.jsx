import React from "react";
import AllItems from "./AllItems";
import { useFetch } from "../../../../hooks/useFetch";
import AvailableFoodsSkeleton from "./AvailableFoodSkeleton";
import HomeLeftLinks from "../mobile/HomeLeftLinks";
import HomeLeftHeader from "./HomeLeftHeader";
import FoodFilters from "./FoodFilter";
import { cartBaseUrl } from "../../../../services/BaseUrls";

const HomeLeft = () => {
  const { fetchedItems, isLoading } = useFetch(cartBaseUrl + "food/", false);
  return (
    <div className="homeLeft__container">
      <HomeLeftHeader />
      <FoodFilters />
      {isLoading ? (
        <AvailableFoodsSkeleton cards={20} />
      ) : (
        <AllItems data={{ fetchedItems }} />
      )}
      <HomeLeftLinks />
    </div>
  );
};

export default HomeLeft;
