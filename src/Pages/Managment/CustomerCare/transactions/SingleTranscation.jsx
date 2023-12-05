import React from "react";
import { RxCross2 } from "react-icons/rx";
import { TbBounceRight } from "react-icons/tb";

const SingleTranscation = ({ transaction }) => {
  return (
    <div className="userTransactions ">
      <div className="userTransactionPhoneNumber">
        <h4>
          {transaction?.phone_number ? transaction?.phone_number : "........"}
        </h4>
      </div>
      <div className="userTransactionTransId">
        <h4> {transaction?.trans_id}</h4>
      </div>
      <div className="userTransactionOrderId">
        <h4>{transaction?.order_id}</h4>
      </div>
      <div className="userTransactionAmount">
        <h4> {transaction?.amount}</h4>
      </div>
      <div
        className={`userTransactionFinished ${
          !transaction?.is_finished && "userTransactionFailed"
        }`}
      >
        <i>
          {transaction?.is_finished ? (
            <TbBounceRight size={17} />
          ) : (
            <RxCross2 size={17} />
          )}
        </i>
      </div>
      <div
        className={`userTransactionSuccesful ${
          !transaction?.is_successful && "userTransactionFailed"
        }`}
      >
        <i>
          {transaction?.is_successful ? (
            <TbBounceRight size={17} />
          ) : (
            <RxCross2 size={17} />
          )}
        </i>
      </div>
    </div>
  );
};

export default SingleTranscation;
