import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React from "react";

const TableSalesFilter = ({ data }) => {
  const { startDate, setStartDate } = data;

  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentDate = date.getDate();
  const currentYear = date.getFullYear();
  const formatedDate = `${currentMonth}/${currentDate}/${currentYear}`;

  return (
    <div className="adminTableSales__filter row">
      <div className="admintTableSales__date">
        <span>Today</span>
        {formatedDate}
      </div>
      <div className="datePicker__container row">
        <h5>pick date</h5>
        <DatePicker
          showIcon
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          wrapperClassName="datePicker"
        />
      </div>
    </div>
  );
};

export default TableSalesFilter;
