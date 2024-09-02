import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, keyframes, Typography } from "@mui/material";


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
      <Typography
        color={"white"}
        p={"2rem"}
        variant="h5"
        textAlign={"center"}
        sx={{
          animation: `${fadeInOut} 3s infinite`,
        }}
      >
        Select a user to chat
      </Typography>
    </Box>
  );
}

export default AppLayout()(Home);
