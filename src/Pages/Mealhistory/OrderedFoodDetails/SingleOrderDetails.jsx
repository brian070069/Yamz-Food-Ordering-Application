import { useEffect, useState } from "react";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { Rings } from "react-loader-spinner";
import { PiCookingPot } from "react-icons/pi";
import { FcCancel } from "react-icons/fc";
import { GoGoal } from "react-icons/go";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import OrderingStatus from "./OrderingStatus";
import axios from "axios";
import { cartBaseUrl } from "../../../services/BaseUrls";

const SingleOrderDetails = ({ props, setOrderDetails }) => {
  let { created_at, status, delivered_at, total, order_id, trans_id } = props;
  const [formatedDate, setFormatedDate] = useState("");
  const [formatedDeliveryDate, setFormatedDeliveryDate] = useState("");
  const [formatedDeliveryTime, setFormatedDeliveryTime] = useState("");
  const [formatedTime, setFormatedTime] = useState("");
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

  const cancelDelivery = async () => {
    try {
      console.log(order_id);
      await axios.patch(
        cartBaseUrl + `order/${"d043be9d-7e5c-411f-b6df-d6a5095059ae"}/`,
        {
          is_canceled: "true",
        }
      );
      setOrderDetails({ ...order, status: "c" });
    } catch (err) {
      console.log(err);
    }
  };
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
          <h4>
            Placed on {formatedDate} {formatedTime} hrs
          </h4>
        </div>
        {status === "c" && (
          <div className="date__transId row">
            <h4>
              Delivered on {formatedDeliveryDate} {formatedDeliveryTime} hrs
            </h4>
          </div>
        )}

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
        <div
          className="delivery_statusContainer row"
          style={{ justifyContent: status === "c" && "flex-end" }}
        >
          {status === "p" && (
            <button
              className="canceled_deliveryBtn"
              type="button"
              onClick={cancelDelivery}
            >
              <span>cancel order</span>
            </button>
          )}
          {status === "p" && (
            <OrderingStatus
              icon={<PiCookingPot size={22} />}
              label={"preparing"}
            />
          )}
          {status === "d" && (
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
          {status === "c" && (
            <OrderingStatus icon={<GoGoal size={21} />} label={"delivered"} />
          )}
          {status === "f" && (
            <OrderingStatus icon={<FcCancel size={21} />} label={"cancelled"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleOrderDetails;
