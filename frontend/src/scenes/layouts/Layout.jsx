import React, { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar"; // Corrected path
import Sidebar from "../../components/Sidebar"; // Corrected path
import { useGetUserQuery } from "../../state/api"; // Corrected path

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data: user } = useGetUserQuery(userId); // Fetch user data
  console.log("data:",user)
  return (
    <Box display="flex" width="100%" height="100%">
      {/* Sidebar */}
      <Sidebar
        user={user || { name: "Loading...", occupation: "Loading..." }} // Pass user data
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isNonMobile={isNonMobile}
      />
      {/* Main Content */}
      <Box flexGrow={1}>
        <Navbar
          user={user || { name: "Loading...", occupation: "Loading..." }}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {/* Welcome Message */}
        <Box p="1rem">
          <Typography variant="h5">
            Welcome, {user?.name || "Loading..."}!
          </Typography>
        </Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;