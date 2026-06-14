import { useEffect, useState } from "react";

function Cart() {
  const order = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "/auth";
        return;
    }
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }
    const payload = {
        userId: user.id,
        items: cart.map(item => ({pizzaId: item.id, count: item.count}))
    };
    try {
        const res = await fetch("http://localhost:5155/api/order", {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload)});
        if (!res.ok) {
            const msg = await res.text();
            throw new Error(msg);
        }
        const data = await res.json();
        console.log("Order created:", data);
        localStorage.removeItem("cart");
        setCart([]);
        alert("Order created successfully");
    } catch (err) {
        console.log(err);
        alert("Order failed");
    }
  };
    const [cart, setCart] = useState([]);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        const saved = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(saved);
    };

    const saveCart = (data) => {
        setCart(data);
        localStorage.setItem("cart", JSON.stringify(data));
    };

    const increase = (id) => {
        const updated =
            cart.map(item => item.id === id ? { ...item, count: item.count + 1}: item);
            saveCart(updated);
      };

    const decrease = (id) => {
        const updated =
            cart
                .map(item => item.id === id? {...item, count: item.count - 1}: item)
                .filter(x => x.count > 0);

        saveCart(updated);
    };

    
    const remove = (id) => {saveCart(cart.filter(x => x.id !== id));};
    const getTotal = () => cart.reduce((sum, item) => sum + item.price * item.count, 0);

    return (
        <div className="container mt-4">
            <h1>Cart</h1>
            {cart.length === 0 ? (<p>Кошик порожній</p>) : (
              <div>
                    {cart.map(item => (
                        <div key={item.id}className="card p-3 mb-3">
                            <h4>{item.name}</h4>
                            <p>{item.price}грн ×{item.count}</p>
                            <p>Сума: {" "} {item.price *item.count} грн</p>
                            <div>
                                <button className="btn btn-success me-2" onClick={() => increase(item.id)}>+</button>
                                <button className="btn btn-warning me-2"onClick={() =>decrease(item.id)}>−</button>
                                <button className="btn btn-danger"onClick={() => remove(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                    <hr />
                    <h2>Загальна сума:{" "}{getTotal()}грн</h2>
                    <button className="btn btn-primary" onClick={order}>Order</button>
                </div>
            )}
        </div>
    );
}

export default Cart;