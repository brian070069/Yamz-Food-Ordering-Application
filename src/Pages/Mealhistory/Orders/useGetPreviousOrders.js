import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { OrderContext } from "../../../context/OrderContext";
import axios from "axios";
import { cartBaseUrl } from "../../../services/BaseUrls";

export const useGetPreviousOrders = () => {
  const token = localStorage.getItem("token");
  const { orders, setOrders } = useContext(OrderContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    const getPreviousOrders = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get(cartBaseUrl + "order/", {
          cancelToken: cancelTokenSource.token,
          headers: { Authorization: `Bearer ${token}` },
        });
        setLoading(false);
        setError(false);
        setOrders(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          return;
        }

        setError(true);
        setLoading(false);
        if (!err.response) {
          setErrorMessage("Unable to contact the server.");
        } else if (err.request.status === 401) {
          // navigate("/login", { replace: true });
          setOrders([]);
        } else if (err.request.status === 404) {
          setError(false);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      }
    };

    getPreviousOrders();

    // Cleanup function
    return () => {
      try {
        // Cancel ongoing request
        cancelTokenSource.cancel("Request canceled by cleanup");
      } catch (err) {
        console.error("Error cancelling request:", err);
      }
    };
  }, []);

  return { orders, loading, error, errorMessage };
};
