import React from "react";

const TransactionsHeader = () => {
  return (
    <section className="customerCareTransaction__header">
      <div>
        <h4>phone number</h4>
      </div>
      <div>
        <h4>transactionId</h4>
      </div>
      <div>
        <h4>orderId</h4>
      </div>
      <div>
        <h4>amount</h4>
      </div>
      <div>
        <h4>finished</h4>
      </div>
      <div>
        <h4> succesful</h4>
      </div>
    </section>
  );
};

export default TransactionsHeader;
