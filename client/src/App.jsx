import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import { Routes } from "react-router";
import { Route } from "react-router";
import Catalog from "./components/catalog/Catalog";
import Details from "./components/details/Details";
import GameCreate from "./components/game-create/GameCreate";
import Register from "./components/register/Register";
import { useState } from "react";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import Edit from "./components/edit/Edit";

function App() {
  const [user, setUser] = useState(null);

  const registerHandler = async (email, password) => {
    const newUser = { email, password };

    const response = await fetch("http://localhost:3030/users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const result = await response.json();

    setUser(result);
  };

  const loginHandler = (email, password) => {
    if (!user) {
      throw new Error("Invalid email or password");
    }

    setUser(user);
  };

  const logoutHandler = () => {
    setUser(null);
  };

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/games" element={<Catalog />}></Route>
        <Route
          path="games/:gameId/details"
          element={<Details user={user} />}
        ></Route>
        <Route path="games/:gameId/edit" element={<Edit />}></Route>
        <Route path="/games/create" element={<GameCreate />}></Route>
        <Route
          path="/register"
          element={<Register onRegister={registerHandler} />}
        ></Route>
        <Route
          path="/login"
          element={<Login user={user} onLogin={loginHandler} />}
        ></Route>
        <Route
          path="/logout"
          element={<Logout onLogout={logoutHandler} />}
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
