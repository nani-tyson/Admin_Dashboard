import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./utils/theme";  
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./scenes/layouts/Layout";
import Dashboard from "./scenes/dashboard/Dashboard";  
import Products from "./scenes/products/Products";
import Customers from "./scenes/customers/Customers";
import Transactions from "./scenes/transactions/Transactions";
import Geography from "./scenes/geography/Geography";
import Overview from "./scenes/sales/Overview"; // Import the Sales component
import Daily from "./scenes/daily/Daily";
import Monthly from "./scenes/monthly/Monthly";
import Breakdown from "./scenes/breakdown/Breakdown";
import Admin from "./scenes/admin/Admin";  
import Performance from "./scenes/performance/Performance";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="overview" element={<Overview />} /> {/* Add the Sales route */}
              <Route path="daily" element={<Daily />} />
              <Route path="monthly" element={<Monthly />} />
              <Route path="breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
              
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;