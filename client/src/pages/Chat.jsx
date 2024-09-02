import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FileMenu from "../components/dialogs/FileMenu";
import AppLayout from "../components/layout/AppLayout";
import MessageComponenet from "../components/shared/MessageComponenet";
import { InputBox } from "../components/styles/StyledComponents";
import { grayColor, orange } from "../constants/color";
import { sampleMessage } from "../constants/sampleData";

const user = {
  _id: "rgerfibg",
  name: "Hariansh Singh",
};

function Chat() {
  const containerRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    function handleEscKey(event) {
      if (event.key === "Escape") {
        navigate("/");
      }
    }

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [navigate]);

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
          backgroundImage: "url('/src/assets/bg_chat.jpg')", // Add your background image path here
          backgroundSize: "cover", // Ensure the image covers the whole container
          backgroundPosition: "center", // Center the background image
          backgroundRepeat: "no-repeat", // Prevent background repetition
          opacity: 0.88, // Set the background image opacity
        }}
      >
        {sampleMessage.map((i) => (
          <MessageComponenet key={i._id} message={i} user={user} />
        ))}
      </Stack>

      <form
        style={{
          height: "10%",
        }}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
          bgcolor="#3C3C3C"
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
              rotate: "30deg",
            }}
          >
            <AttachFileIcon sx={{ color: "white" }} />
          </IconButton>

          <InputBox
            placeholder="Type Message Here..."
            sx={{
              color: "white",
              marginLeft: "3rem",
              borderRadius: "4px",
              bgcolor: "#3C3C3C",
              "&::placeholder": {
                color: "white", // Placeholder color
              },
            }}
          />

          <IconButton
            type="submit"
            sx={{
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>

      <FileMenu />
    </>
  );
}

export default AppLayout()(Chat);
