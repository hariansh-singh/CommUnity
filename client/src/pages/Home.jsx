import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";

function Home() {
  return (
    <Box bgcolor={"rgba(0,0,0,0.1)"} height={"100%"}>
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>
        Select a user to chat
      </Typography>
    </Box>
  );
}

export default AppLayout()(Home);
