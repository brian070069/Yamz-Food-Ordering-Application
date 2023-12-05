import Header from "../components/Header";
import OrderDetailsHeader from "./SingleOrderDetails";
import OrderFoodList from "./OrderFoodList";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import OrderDetailsSkeleton from "./OrderDetailsSkeleton";
import { cartBaseUrl } from "../../../services/BaseUrls";
import HomeLeftLinks from "../../Home/components/mobile/HomeLeftLinks";

const OrderDetails = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErroMessage] = useState("");

  const getPreviousOrders = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.get(cartBaseUrl + "order/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const findSingleOrder = response.data.find((order) => {
        return order.order_id === id;
      });

      if (!findSingleOrder) {
        navigate("*");
        return;
      }
      setLoading(false);
      setError(false);
      setOrderDetails(findSingleOrder);
    } catch (err) {
      setError(true);
      setLoading(false);
      if (!err.response) {
        setErroMessage("unable to contact the server");
        return;
      }
    }
  };

  const getOrders = useCallback(getPreviousOrders, [orderDetails]);

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="order__detailsContainer">
      <Header />
      {loading ? (
        <OrderDetailsSkeleton />
      ) : (
        <div className="foods__orderedContainer">
          <OrderDetailsHeader
            props={orderDetails}
            setOrderDetails={setOrderDetails}
          />
          <OrderFoodList props={orderDetails} />
        </div>
      )}
      <HomeLeftLinks />
    </div>
  );
};

export default OrderDetails;
