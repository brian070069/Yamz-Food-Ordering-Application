import OrderSkeleton from "./OrderSkeleton";
import Order from "./Order";
import { useGetPreviousOrders } from "./useGetPreviousOrders";

const AllOrders = () => {
  const { orders, loading, error, errorMessage } = useGetPreviousOrders();
  const reversedOrders = [...orders].reverse();

  return (
    <div className="orders">
      <div className="orders">
        {loading ? (
          <OrderSkeleton cards={10} />
        ) : orders.length <= 0 ? (
          <h4>You have no meal history</h4>
        ) : (
          reversedOrders.map((order) => {
            return <Order key={order.order_id} {...order} />;
          })
        )}
      </div>
    </div>
  );
};

export default AllOrders;
