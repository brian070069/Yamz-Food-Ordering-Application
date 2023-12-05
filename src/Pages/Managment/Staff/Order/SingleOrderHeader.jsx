import React, { useEffect, useState } from "react";
import { HiArrowSmallLeft } from "react-icons/hi2";
import OrderingStatus from "../../../Mealhistory/OrderedFoodDetails/OrderingStatus";
import { PiCookingPot } from "react-icons/pi";
import { Rings } from "react-loader-spinner";
import { GoGoal } from "react-icons/go";
import { FcCancel } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const DeliveringStatuses = ["preparing", "start delivering", "delivered"];

const SingleOrderHeader = ({ order, updateDeliveringStatus }) => {
  const { order_id, created_at, delivered_at, total, trans_id, state, user } =
    order;
  const [formatedDate, setFormatedDate] = useState("");
  const [formatedDeliveryDate, setFormatedDeliveryDate] = useState("");
  const [formatedDeliveryTime, setFormatedDeliveryTime] = useState("");
  const [formatedTime, setFormatedTime] = useState("");
  const [showDeliveringStatus, setShowDeliveringStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //format time
    if (created_at) {
      let formatedDate = format(new Date(created_at), "yyyy/MM/dd");
      let formatedTime = format(new Date(created_at), "HH:mm");
      setFormatedDate(formatedDate);
      setFormatedTime(formatedTime);
    }
    if (delivered_at) {
      let formatedDate = format(new Date(delivered_at), "yyyy/MM/dd");
      let formatedTime = format(new Date(delivered_at), "HH:mm");
      setFormatedDeliveryDate(formatedDate);
      setFormatedDeliveryTime(formatedTime);
    }
  }, [created_at, delivered_at]);

  return (
    <div className="order__details">
      <div className="order__detailsHeader">
        <div className="order__idContainer row ">
          <button className="row" onClick={() => navigate(-1)}>
            <i>
              <HiArrowSmallLeft />
            </i>
          </button>
          <h4 className="orderId">
            Order Id:<span>{order_id?.toUpperCase() || order_id}</span>
          </h4>
        </div>
        <div className="date__transId row">
          <h4 style={{ color: "green", textTransform: "capitalize" }}>
            {user?.phone_number}
          </h4>
          <h4>
            Orderd on {formatedDate} {formatedTime} hrs
          </h4>
        </div>

        <div className="date__transId row">
          {state === "c" && (
            <h4>
              Delivered on {formatedDeliveryDate} {formatedDeliveryTime} hrs
            </h4>
          )}

          <h4
            style={{
              color: "green",
              textTransform: "capitalize",
              fontSize: 17,
            }}
          >
            {user?.first_name}
          </h4>
        </div>
        <div className="order__detailsStatusContainer row">
          <div className=" row">
            <span className="before">Amount:</span>
            <span className="order__TotalPrice">sh {total}</span>
          </div>
          {trans_id && (
            <div className="row">
              <span className="before">TransId:</span>
              <span className="order__TotalPrice">{trans_id}</span>
            </div>
          )}
        </div>
        <div className="delivery_statusContainer row">
          <div>
            <button
              className="canceled_deliveryBtn deliveringBtn"
              type="button"
              onClick={() => {
                setShowDeliveringStatus((prev) => !prev);
              }}
            >
              <span>
                {state === "p"
                  ? "Start Delivering"
                  : state === "d"
                  ? "Delivering"
                  : state === "c"
                  ? "Delivered"
                  : "cancelled"}
              </span>
            </button>
            {showDeliveringStatus && (
              <div className="pickDeliveryStatus">
                <div
                  onClick={() => {
                    setShowDeliveringStatus((prev) => !prev);
                    updateDeliveringStatus("d");
                  }}
                >
                  {DeliveringStatuses[1]}
                </div>
                <div
                  onClick={() => {
                    setShowDeliveringStatus((prev) => !prev);
                    updateDeliveringStatus("c");
                  }}
                >
                  {DeliveringStatuses[2]}
                </div>
              </div>
            )}
          </div>
          {state === "p" && (
            <OrderingStatus
              icon={<PiCookingPot size={22} />}
              label={"preparing"}
            />
          )}
          {state === "d" && (
            <OrderingStatus
              animation={
                <Rings
                  height="40"
                  width="40"
                  color="#4fa94d"
                  radius="6"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="rings-loading"
                />
              }
              label={"Delivering Started"}
            />
          )}
          {state === "complete" && (
            <OrderingStatus icon={<GoGoal size={21} />} label={"delivered"} />
          )}
          {state === "f" && (
            <OrderingStatus icon={<FcCancel size={21} />} label={"cancelled"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleOrderHeader;
