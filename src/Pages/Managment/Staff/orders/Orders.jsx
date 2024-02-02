import React, { useEffect, useState } from "react";
import { useFetch } from "../../../../hooks/useFetch";
import { cartBaseUrl } from "../../../../services/BaseUrls";
import Header from "../../../Home/components/Header/Header";
import OrderSkeleton from "../../../Mealhistory/Orders/OrderSkeleton";
import { useNavigate } from "react-router-dom";
import AdminUserHeader from "../../Admin/Admins/users/AdminUserHeader";

const Orders = () => {
  const { fetchedItems, isLoading } = useFetch(
    cartBaseUrl + "orderd-food/",
    false
  );
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const navigate = useNavigate();

  const navigateToOrder = (id) => {
    if (fetchedItems.orders.length > 0) {
      navigate(`/staff/order/${id}`);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserPhoneNumber(value);
  };

  return (
    <div className="admin__container">
      <Header />
      <div className="staff__ordersContainer">
        {isLoading ? (
          <OrderSkeleton cards={20} />
        ) : (
          <div className="staff__order">
            <AdminUserHeader
              handleInputChange={handleInputChange}
              userPhoneNumber={userPhoneNumber}
            />
            {fetchedItems?.orders?.length > 0
              ? fetchedItems.orders
                  .sort((a, b) => {
                    if (a.state === "d") return -1;
                    if (a.state === "c") return 1;
                  })
                  .filter((order) => {
                    return userPhoneNumber === ""
                      ? fetchedItems
                      : order.user.phone_number.includes(userPhoneNumber);
                  })
                  .map((order) => {
                    return (
                      <div
                        onClick={() => {
                          navigateToOrder(order?.order_id);
                        }}
                        className="staff__orders"
                        key={order.order_id}
                      >
                        <div className="row">
                          <h4 className="staff__ordersPhoneNumber">
                            {order?.user?.phone_number}
                          </h4>
                          <h4 className="staff__ordersState">
                            <span>
                              {order.state === "p" ? (
                                "start"
                              ) : order.state === "d" ? (
                                <span style={{ color: "yellow" }}>
                                  on Delivery
                                </span>
                              ) : order.state === "c" ? (
                                <span style={{ color: "red" }}>Delivered</span>
                              ) : (
                                "cancelled"
                              )}
                            </span>
                          </h4>
                        </div>
                      </div>
                    );
                  })
              : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
