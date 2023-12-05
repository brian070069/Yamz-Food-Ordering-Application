import TransactionsHeader from "./TransactionsHeader";
import AllTransactions from "./AllTransactions";
import { useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import SearchForTransaction from "./SearchForTransaction";
import { mpesaBaseUrl } from "../../../../services/BaseUrls";

const Transactions = () => {
  const [isfetchingSingleTransaction, setIsFetchingSingleTransaction] =
    useState(false);
  const [singleTransactionHasError, setSingleTransactionHasError] =
    useState(false);
  const { fetchedItems, isLoading, setFetchedItems } = useFetch(
    mpesaBaseUrl + "transactions/",
    true
  );

  return (
    <div className="customerCareTransactions">
      <div className="searchTransactionsHeader__container">
        <SearchForTransaction
          data={{
            setIsFetchingSingleTransaction,
            setSingleTransactionHasError,
            setFetchedItems,
            isfetchingSingleTransaction,
          }}
        />
        <TransactionsHeader />
      </div>
      <AllTransactions
        transactionsData={{
          previousTransactions: fetchedItems,
          isLoading,
          isfetchingSingleTransaction,
          singleTransactionHasError,
        }}
      />
    </div>
  );
};

export default Transactions;
