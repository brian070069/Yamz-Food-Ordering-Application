import { format } from "date-fns";
import { Link } from "react-router-dom";

const Order = ({ total, status, created_at, order_id }) => {
  //format data
  if (status === "p") {
    status = "preparing";
  } else if (status === "c") {
    status = "Completed";
  } else if (status === "d") {
    status = "Delivering";
  } else {
    status = "cancelled";
  }
  const formatedOrderId = order_id.toUpperCase().slice(0, 8);
  const formatedDate = format(new Date(created_at), "yyyy/MM/dd");
  const formatTime = format(new Date(created_at), "HH:mm");

  return (
    <Link to={`/mealhistory/${order_id}`}>
      <div className="order">
        <div className="order__upper row">
          <div className="order__id">#{formatedOrderId}</div>
          <span
            className={`order__status ${
              status === "Completed" ? "completed" : ""
            }`}
          >
            {status}
          </span>
        </div>
        <div className="order__lower row">
          <div className="order__date row">
            <span className="date">{formatedDate}</span>
            <span className="time">{formatTime} hrs</span>
          </div>
          <div>
            <div className="order__price">sh {total}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Order;
