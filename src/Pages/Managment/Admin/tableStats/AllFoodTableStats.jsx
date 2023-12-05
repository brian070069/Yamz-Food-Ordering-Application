import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TableStatsHeader from "./TableStatsHeader";
import TableSalesFilter from "./TableSalesFilter";
import TableStatsLoader from "./TableStatsLoader";
import TableStatusError from "./TableStatusError";
import Sales from "./Sales";
import { charts } from "../../../../services/BaseUrls";
import Header from "../../../Home/components/Header/Header";

const AllFoodTableStats = () => {
  const [previousRecords, setPreviousRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const getPreviousRecords = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(charts);
      setIsLoading(false);
      const salesData = response.data;
      if (salesData) {
        const formatedData = salesData.filter((data) => {
          const formatedDate = new Date(data.date);
          const newData = { ...data, date: formatedDate };

          const currentYear = startDate.getFullYear();
          const currentMonth = startDate.getMonth();
          const currentDay = startDate.getDate();

          const parsedYear = newData.date.getFullYear();
          const parsedMonth = newData.date.getMonth();
          const parsedDay = newData.date.getDate();
          return (
            parsedYear === currentYear &&
            parsedMonth === currentMonth &&
            parsedDay === currentDay
          );
        });
        setPreviousRecords(formatedData);
      }
    } catch (error) {
      setIsLoading(false);
      if (!error.response) {
        toast.error("failed to contact server", {
          position: "top-center",
          theme: "dark",
        });
      } else {
        toast.error("unknown error occured please try again", {
          position: "top-center",
          theme: "dark",
        });
      }
    }
  };

  useEffect(() => {
    getPreviousRecords();
  }, [startDate]);

  return (
    <div className="tableDaily__statisticsContainer">
      <Header />
      <TableSalesFilter data={{ startDate, setStartDate }} />
      <TableStatsHeader />
      {isLoading ? (
        <TableStatsLoader />
      ) : previousRecords.length <= 0 ? (
        <TableStatusError />
      ) : (
        <Sales previousRecords={previousRecords} />
      )}
    </div>
  );
};

export default AllFoodTableStats;
