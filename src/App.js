import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import NavBar1 from "./components/NavBar1";
import NavBar2 from "./components/NavBar2";
import ViewCards from "./components/ViewCards";
import NewCard from "./components/NewCard";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import EditUser from "./components/EditUser";
import EditCard from "./components/EditCard";

import UserContext from "./UserContext";

function App() {
  const [user, setUser] = useState(null);

  function getNavBar() {
    if (user === null) {
      return <NavBar1 />;
    } else {
      return <NavBar2 />;
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <BrowserRouter>
          {getNavBar()}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/editUser" element={<EditUser />} />
            <Route path="/viewCards" element={<ViewCards />} />
            <Route path="/newCard" element={<NewCard />} />
            <Route path="/editCard" element={<EditCard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserContext.Provider>
  );
}

export default App;
