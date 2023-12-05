import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../../hooks/useFetch";
import { cartBaseUrl } from "../../../../services/BaseUrls";
import Header from "../../../Home/components/Header/Header";
import SingleOrderHeader from "./SingleOrderHeader";
import StaffOrderedFood from "./StaffOrderedFood";
import HomeLeftLinks from "../../../Home/components/mobile/HomeLeftLinks";
import OrderDetailsSkeleton from "../../../Mealhistory/OrderedFoodDetails/OrderDetailsSkeleton";
import axios from "axios";

const SingleOrder = () => {
  const { fetchedItems, isLoading } = useFetch(
    cartBaseUrl + "orderd-food/",
    false
  );

  const [order, setOrder] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (fetchedItems.length > 0) {
      const itemToDisplay = fetchedItems.find((item) => {
        return item.order_id === id;
      });
      console.log(itemToDisplay);
      setOrder(itemToDisplay);
      return;
    }
  }, [fetchedItems]);

  const updateDeliveringStatus = async (value) => {
    try {
      await axios.patch(cartBaseUrl + `order/${order?.order_id}/`, {
        state: value,
      });
      setOrder({ ...order, state: value });
    } catch (err) {}
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <OrderDetailsSkeleton />
      ) : (
        <div className="foods__orderedContainer">
          <SingleOrderHeader
            order={order}
            updateDeliveringStatus={updateDeliveringStatus}
          />
          <StaffOrderedFood props={{ orderedFood: order?.ordered_food }} />
        </div>
      )}
      <HomeLeftLinks />
    </div>
  );
};

export default SingleOrder;
