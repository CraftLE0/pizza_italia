import { useEffect, useState } from "react";

function Home() {
    const [pizzas, setPizzas] = useState([]);

    const url = "http://localhost:5155/api/pizza";

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setPizzas(data))
            .catch(console.log);
    }, []);

    const addToCart = (pizza) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existing = cart.find(
            x => x.id === pizza.id
        );

        if (existing) {
            existing.count += 1;
        } else {
            cart.push({...pizza, count: 1});
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Додано в кошик: " + pizza.name);
    };

    return (
        <div className="container mt-4">

            <h1 className="mb-4"> Pizza Menu </h1>

            <div className="row">

                {pizzas
                    .filter(pizza => pizza.IsAvailable)
                    .map((pizza) => (
                    <div className="col-md-4 mb-3" key={pizza.id}>
                        <div className="card p-3">

                            <h4>{pizza.name}</h4>
                            <img src={pizza.picture} alt={pizza.name} className="img-fluid mb-3"/>
                            <h6>{pizza.description}</h6>
                            <p>{pizza.price} грн</p>

                            <button className="btn btn-primary" onClick={() => addToCart(pizza)}>Add to cart</button>

                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
}

export default Home;