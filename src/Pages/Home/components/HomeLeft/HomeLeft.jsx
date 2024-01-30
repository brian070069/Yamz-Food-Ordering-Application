import React from "react";
import AllItems from "./AllItems";
import { useFetch } from "../../../../hooks/useFetch";
import AvailableFoodsSkeleton from "./AvailableFoodSkeleton";
import HomeLeftLinks from "../mobile/HomeLeftLinks";
import HomeLeftHeader from "./HomeLeftHeader";
import FoodFilters from "./FoodFilter";
import { triggerFetch } from "../../../../hooks/useFetch";
import { cartBaseUrl } from "../../../../services/BaseUrls";
import axios from "axios";

const HomeLeft = () => {
  const { fetchedItems, hasError, getData, isLoading } = useFetch(
    cartBaseUrl + "food/",
    false
  );

  return (
    <div className="homeLeft__container">
      <HomeLeftHeader />
      <FoodFilters />
      {isLoading ? (
        <AvailableFoodsSkeleton />
      ) : hasError ? (
        <div className="fetchItems__error">
          <h4 className>Failed to Fetch Data</h4>
          <button onClick={getData}>Try again</button>
        </div>
      ) : (
        <AllItems data={{ fetchedItems }} />
      )}
      <HomeLeftLinks />
    </div>
  );
};

export default HomeLeft;
