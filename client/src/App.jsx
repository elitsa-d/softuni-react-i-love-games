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
import UserContext from "./contexts/UserContext,js";
import useRequest from "./hooks/useRequest";

function App() {
  const [user, setUser] = useState(null);
  const { request } = useRequest();

  const registerHandler = async (email, password) => {
    const newUser = { email, password };

    const result = await request("/users/register", "POST", newUser);

    setUser(result);
  };

  const loginHandler = async (email, password) => {
    const result = await request("/users/login", "POST", { email, password });
    setUser(result);
  };

  const logoutHandler = () => {
    setUser(null);
  };

  const userContextValues = {
    user,
    isAuthenticated: !!user?.accessToken,
    registerHandler,
    loginHandler,
    logoutHandler,
  };

  return (
    <UserContext.Provider value={userContextValues}>
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
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login user={user} />}></Route>
        <Route
          path="/logout"
          element={<Logout onLogout={logoutHandler} />}
        ></Route>
      </Routes>
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
