import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { triggerFetch } from "../../../../hooks/useFetch";
import { getToken } from "../../../../libs/getToken";
import { mpesaBaseUrl } from "../../../../services/BaseUrls";

const SearchForTransaction = ({ data }) => {
  const {
    setIsFetchingSingleTransaction,
    setSingleTransactionHasError,
    setFetchedItems,
    isfetchingSingleTransaction,
  } = data;
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const getSingleTransaction = async (url, hasHeaders) => {
    const token = getToken("token");

    if (!token) {
      navigate("/login", { replace: true });
    }
    try {
      setIsFetchingSingleTransaction(true);
      const data = await triggerFetch(url, hasHeaders);
      console.log(data);
      setFetchedItems([data]);
      setSingleTransactionHasError(false);
      setIsFetchingSingleTransaction(false);
      toast.success("transaction exist");
    } catch (error) {
      setIsFetchingSingleTransaction(false);
      setSingleTransactionHasError(true);
      if (!error.response) {
        toast.error("failed to contact server");
      } else if (error.request.status === 400) {
        toast.error("request failed please try again");
      } else if (error.request.status === 404) {
        toast.error(`transaction ${searchValue} does not exist`);
      } else if (error.request.status === 401) {
        navigate("/login", { replace: true });
      } else {
        toast.error("an error occured please try again");
      }
    }
  };
  return (
    <div className="searchTransaction row">
      <input
        type="text"
        placeholder="TransId..."
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />

      <button
        onClick={() => {
          getSingleTransaction(
            `${mpesaBaseUrl}searchtrans/${searchValue}/`,
            true
          );
        }}
        disabled={isfetchingSingleTransaction}
        className={`searchTransactin__btn ${
          isfetchingSingleTransaction && "disabled__btn"
        }`}
      >
        {isfetchingSingleTransaction ? "loading..." : "search"}
      </button>
    </div>
  );
};

export default SearchForTransaction;
