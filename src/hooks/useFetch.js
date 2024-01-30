import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../libs/getToken";
import { Toast } from "../services/ToasterProvider";

export const triggerFetch = async (Url, requireHeaders) => {
  const token = getToken("token");
  if (requireHeaders) {
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(Url, headers);
    return response.data;
  } else {
    const response = await axios.get(Url);
    return response.data;
  }
};

export const useFetch = (url, hasHeaders) => {
  const [fetchedItems, setFetchedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigate = useNavigate();

  const cancelTokenSource = axios.CancelToken.source();

  const getData = async () => {
    const token = getToken("token");

    if (!token && hasHeaders) {
      localStorage.clear();
      navigate("/login", { replace: true });
      return;
    }

    try {
      setIsLoading(true);
      const data = await triggerFetch(url, hasHeaders);
      setHasError(false);
      setIsLoading(false);
      setFetchedItems(data);
    } catch (error) {
      if (axios.isCancel(error)) {
        return;
      }

      setIsLoading(false);
      setHasError(true);
      if (!error.response) {
        Toast.error("failed to contact server");
      } else if (error.request.status === 400) {
        Toast.error("request failed please try again");
      } else if (error.request.status === 401) {
        localStorage.clear();
        navigate("/login", { replace: true });
      } else {
        Toast.error("an error occured please try again");
      }
    }
  };

  useEffect(() => {
    getData();

    // Cleanup function
    return () => {
      try {
        // Cancel ongoing request
        cancelTokenSource.cancel("Request canceled by cleanup");
      } catch (error) {
        console.error("Error cancelling request:", error);
      }
    };
  }, []);

  return {
    fetchedItems,
    hasError,
    getData,
    setIsLoading,
    setHasError,
    isLoading,
    setFetchedItems,
  };
};
