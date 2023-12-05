import SingleTranscation from "./SingleTranscation";
import Loader from "./Loader";

const AllTransactions = ({ transactionsData }) => {
  const { previousTransactions, isLoading, isfetchingSingleTransaction } =
    transactionsData;

  return (
    <div className="customerCareTransaction__container">
      {isLoading || isfetchingSingleTransaction ? (
        <Loader />
      ) : (
        previousTransactions?.length > 0 &&
        previousTransactions.map((transaction) => {
          return (
            <SingleTranscation
              key={transaction?.trans_id}
              transaction={transaction}
            />
          );
        })
      )}
    </div>
  );
};

export default AllTransactions;
