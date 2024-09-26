//  import { StrictMode } from "react";
//  import React from 'react';

import { createRoot } from "react-dom/client";
import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import SignInPage from "./pages/authentication/login";
import UserListPage from "./pages/users/Users";
import AllReports from "./pages/reports/reports";
import BanksAll from "./pages/banks/banks";
import PayrollAll from "./pages/payrolls/payrolls";
import BankReports from "./pages/reports/BankReports";
import Reports from "./pages/reports/reports"
import { Navigate } from 'react-router-dom';
import Defaults from "./pages/defaulters/defaults";

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

//@--  Asegurando la session
const user = localStorage.getItem('badgeSession');

root.render(
  // <StrictMode>
  <Flowbite theme={{ theme }}>
    <BrowserRouter>
      <Routes>
        <Route path="/SignIn" element={<SignInPage />} index />

        <Route
          path="/"
          element={user ? <UserListPage /> : <Navigate to="/SignIn" />}
        />

  
        <Route
          path="/users"
          element={user ? <UserListPage /> : <Navigate to="/SignIn" />}
          index
        />

        <Route
          path="/reports"
          element={user ? <AllReports /> : <Navigate to="/SignIn" />}
          index
        />
        <Route
          path="/banks"
          element={user ? <BanksAll /> : <Navigate to="/SignIn" />}
          index
        />

        <Route
          path="/payrolls"
          element={user ? <PayrollAll /> : <Navigate to="/SignIn" />}
        />

        <Route
          path="/reports"
          element={user ? <Reports /> : <Navigate to="/SignIn" />}
        />

        <Route
          path="/defaults"
          element={user ? <Defaults /> : <Navigate to="/SignIn" />}
        />

        <Route
          path="/bankReports"
          element={user ? <BankReports /> : <Navigate to="/SignIn" />}
        />
      </Routes>

    </BrowserRouter>
  </Flowbite>
  // </StrictMode>
);
