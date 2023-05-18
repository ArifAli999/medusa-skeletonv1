export default function fetchOrders() {
    let orderCount = 0;
    let orders = [];

    try {
        fetch(`http://localhost:9000/store/customers/me/orders`, {
            credentials: "include",
        })
            .then((response) => response.json())
            .then(({ orders, limit, offset, count }) => {

                orderCount = count;
                orders = orders;

            });
        return { orderCount, orders };
    }
    catch (error) {
        console.log(error);
    }
}