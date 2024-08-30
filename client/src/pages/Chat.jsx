import React, { useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import { Stack } from "@mui/material";
import {  } from "../constants/color";

function Chat() {
  const containerRef = useRef(null);

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={"grayColor"}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
       ></Stack>
    </>
  );
}

export default AppLayout()(Chat);
