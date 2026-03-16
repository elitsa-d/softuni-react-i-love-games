import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import { Routes } from "react-router";
import { Route } from "react-router";
import Catalog from "./components/catalog/Catalog";
import Details from "./components/details/Details";
import GameCreate from "./components/game-create/GameCreate";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/games" element={<Catalog />}></Route>
        <Route path="games/:gameId/details" element={<Details />}></Route>
        <Route path="/games/create" element={<GameCreate />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
