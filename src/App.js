import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/index";
import Edit from "./pages/edit";
import List from "./pages/symbols";
import Chart from "./pages/chart";
import Auth from "./Auth";
import Layout from "./Layout";
import Login from "./pages/login";
import NotFound from "./pages/404";
import Add from "./pages/add/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchData } from "./fetchdata";
import Dashboard from "./pages/home/index";
import Users from "./pages/users/index";
import UserDetail from "./pages/userdetail/index";
import Symbols from "./pages/symbols";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Auth>
              <Layout />
            </Auth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="userdetail/:id" element={<UserDetail />} /> */}
          {/* <Route path="userss/:*" element={<NotFound />} /> */}
          <Route path="userss" element={<Users />}/>
            
          <Route path="userdetail/:id" element={<UserDetail />} />
          <Route path="add" element={<Add />} />
          <Route path="edit" element={<Edit />} />
          <Route path="symbols" element={<Symbols />} />
          <Route path="chart" element={<Chart />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
