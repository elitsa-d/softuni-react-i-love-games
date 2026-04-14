import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import { Routes } from "react-router";
import { Route } from "react-router";
import Catalog from "./components/catalog/Catalog";
import Details from "./components/details/Details";
import GameCreate from "./components/game-create/GameCreate";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import Edit from "./components/edit/Edit";
import { useContext } from "react";
import UserContext from "./contexts/UserContext";

function App() {
  const { user, logoutHandler } = useContext(UserContext);
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
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login user={user} />}></Route>
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
