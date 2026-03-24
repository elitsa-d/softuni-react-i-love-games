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

function App() {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [user, setUser] = useState(null);

  const registerHandler = (email, password) => {
    if (registeredUsers.some((user) => user.email === email)) {
      throw new Error("Email is taken");
    }

    setRegisteredUsers((state) => [...state, { email, password }]);
  };

  const loginHandler = (email, password) => {
    const user = registeredUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      throw new Error("Invalid username or password");
    }

    setUser(user);
  };

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/games" element={<Catalog />}></Route>
        <Route path="games/:gameId/details" element={<Details />}></Route>
        <Route path="/games/create" element={<GameCreate />}></Route>
        <Route
          path="/register"
          element={<Register user={user} onRegister={registerHandler} />}
        ></Route>
        <Route
          path="/login"
          element={<Login user={user} onLogin={loginHandler} />}
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
