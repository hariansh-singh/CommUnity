import Grid from "@mui/material/Grid";
import React from "react";
import { useParams } from "react-router-dom";
import { sampleChats } from "../../constants/sampleData";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";
import { useMyChatsQuery } from "../../redux/api/api";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    console.log(data);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chat", _id, groupChat);
    };

    return (
      <>
        <Title />
        <Header />

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{
              display: { xs: "none", sm: "block" },
              padding: 1,
              bgcolor: "#3C3C3C", // Subtle gradient background
            }}
            height={"100%"}
          >
            <ChatList
              chats={sampleChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={7}
            height={"100%"}
            sx={{
              borderLeft: "1px solid rgba(0, 0, 0, 0.9)", // Thin left border
            }}
          >
            <WrappedComponent {...props} />
          </Grid>

          <Grid
            item
            md={3}
            lg={2}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: 2,
              bgcolor: "rgba(0, 0, 0, 0.85)",
              borderLeft: "1px solid rgba(0, 0, 0, 0.12)", // Thin left border
            }}
          >
            <Profile />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
