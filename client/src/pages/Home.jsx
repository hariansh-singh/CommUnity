import { Box, keyframes, Typography } from "@mui/material";
import React from "react";
import logo from "../assets/full_logo_gray.png";
import AppLayout from "../components/layout/AppLayout";

function Home() {
  const fadeInOut = keyframes`
    0%, 100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  `;

  return (
    <Box
      height={"100%"}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        bgcolor: "#444446",
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="CommUnity Logo"
        sx={{
          height: "200px", // Adjust as needed
          display: { xs: "none", sm: "block" },
          mb: -10,
          opacity: 0.5,
        }}
      />

      <Typography
        color={"white"}
        p={"2rem"}
        variant="h5"
        textAlign={"center"}
        sx={{
          mb: 8,
          animation: `${fadeInOut} 3s infinite`,
        }}
      >
        Select a user to chat
      </Typography>
    </Box>
  );
}

export default AppLayout()(Home);
