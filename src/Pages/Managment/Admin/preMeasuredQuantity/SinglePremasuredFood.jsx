import axios from "axios";
import React, { useEffect, useState } from "react";
import { charts } from "../../../../services/BaseUrls";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const SinglePremasuredFood = ({ data }) => {
  const { item, getScannedFood, scannedData } = data;
  const [food, setFood] = useState([]);
  const [measuredQty, setMeasuredQty] = useState("");
  const [measuredPtn, setMeasuredPtn] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addPremeasuredQuantity = async (
    foodName,
    measuredQuantity,
    expectedPortions
  ) => {
    const data = {
      food: foodName,
      measuredFood: measuredQuantity,
      expectedQuantity: expectedPortions,
    };
    try {
      if (!measuredPtn) {
        toast.error("portions can't be empty", {
          position: "top-center",
          theme: "dark",
        });
      } else if (!measuredQty) {
        toast.error("measured quantity can't be empty", {
          position: "top-center",
          theme: "dark",
        });
      } else {
        setIsLoading(true);
        const url =
          food.length > 0 ? charts + `${food[0]?.dailyrecord_id}/` : charts;

        if (food.length > 0) {
          await axios.patch(url, data);
        } else {
          await axios.post(url, data);
          const scannedFood = getScannedFood(item.food_name);
          setFood([scannedFood]);
          setMeasuredQty(scannedFood?.measuredFood || "");
          setMeasuredPtn(scannedFood?.expectedQuantity || "");
        }

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      if (!error.response) {
        toast.error("failed to contact server", {
          theme: "dark",
          position: "top-center",
        });
      } else if (error.request.status === 401) {
        localStorage.clear();
        navigate("/login", { replace: true });
      } else {
        toast.error("an error occured please try again", {
          theme: "dark",
          position: "top-center",
        });
      }
    }
  };

  useEffect(() => {
    if (scannedData.length > 0) {
      const scannedFood = getScannedFood(item.food_name);
      if (scannedFood) {
        setFood([scannedFood]);
        setMeasuredQty(scannedFood?.measuredFood || "");
        setMeasuredPtn(scannedFood?.expectedQuantity || "");
      }
    }
  }, [scannedData]);

  return (
    <div className="enterPreMeasured__Quantity">
      <h3>{item.food_name}</h3>
      <div className="preMeasuredFood__input">
        <input
          type="text"
          value={measuredQty}
          onChange={(e) => {
            setMeasuredQty(e.target.value);
          }}
        />
      </div>
      <div className="preMeasuredFood__input">
        <input
          type="text"
          value={measuredPtn}
          onChange={(e) => {
            setMeasuredPtn(e.target.value);
          }}
        />
      </div>
      <div className="preMeasuredFood__btn row">
        {isLoading ? (
          <TailSpin
            height="20"
            width="20"
            color="red"
            ariaLabel="tail-spin-loading"
            radius="0.5"
            wrapperStyle={{ paddingRight: "40px" }}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <button
            type="button"
            onClick={() => {
              addPremeasuredQuantity(item.food_name, measuredQty, measuredPtn);
            }}
          >
            {food && food.length > 0 ? "update" : "add"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SinglePremasuredFood;
