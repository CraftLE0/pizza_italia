import { useState } from "react";

const API = "http://localhost:5155/api/auth";

function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        bankCard: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // LOGIN
    const login = async () => {
        try {
            const res = await fetch(`${API}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password
                })
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg);
            }

            const user = await res.json();

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            alert("Login success");
            console.log(user);

        } catch (err) {
            alert(err.message);
        }
    };

    // REGISTER
    const register = async () => {
        try {
            const res = await fetch(
                `${API}/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify(form)
                }
            );

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg);
            }

            alert("Register success");
            setIsLogin(true);

        } catch (err) {
            alert(err.message);
        }
    };

    const handleSubmit = () => {
        if (isLogin) login();
        else register();
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>

            <h2 className="mb-3 text-center">
                {isLogin ? "Login" : "Register"}
            </h2>

            {!isLogin && (
                <input
                    className="form-control mb-2"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                />
            )}

            <input
                className="form-control mb-2"
                name="email"
                placeholder="Email"
                onChange={handleChange}
            />

            <input
                className="form-control mb-2"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
            />

            {!isLogin && (
                <input
                    className="form-control mb-2"
                    name="bankCard"
                    placeholder="Card number"
                    onChange={handleChange}
                />
            )}

            <button
                className="btn btn-primary w-100"
                onClick={handleSubmit}
            >
                {isLogin ? "Login" : "Register"}
            </button>

            <button
                className="btn btn-link w-100 mt-2"
                onClick={() =>
                    setIsLogin(!isLogin)
                }
            >
                {isLogin
                    ? "Create account"
                    : "Already have account?"}
            </button>
        </div>
    );
}

export default Auth;