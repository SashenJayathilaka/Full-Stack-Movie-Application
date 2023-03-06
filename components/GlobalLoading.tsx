import { Paper, Toolbar, LinearProgress, Box } from "@mui/material";
import React from "react";
import Navbar from "./Navbar";

type Props = {
  isLoading: boolean;
};

function GlobalLoading({ isLoading }: Props) {
  return (
    <>
      <Paper
        sx={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: "none",
          transition: "all .3s ease",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          zIndex: 999,
          background: "#141414",
        }}
      >
        <Navbar />
        <br />
        <Toolbar />
        <LinearProgress />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <p className="font-bold text-5xl text-white animate-pulse">
            Movie<span className="text-red-500">App</span>
          </p>
        </Box>
      </Paper>
    </>
  );
}

export default GlobalLoading;
