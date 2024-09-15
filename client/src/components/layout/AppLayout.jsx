import { Drawer, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useErrors, useSocketEvents } from "../../hooks/hook";
import { useMyChatsQuery } from "../../redux/api/api";
import { setIsMobileMenu } from "../../redux/reducers/misc";
import { GetSocket } from "../../socket";
import Title from "../shared/Title";
import ChatList from "../specific/ChatList";
import Profile from "../specific/Profile";
import Header from "./Header";
import { NEW_MESSAGE_ALERT, NEW_REQUEST } from "../../constants/events";
import { incrementNotificationCount } from "../../redux/reducers/chat";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    const params = useParams();
    const chatId = params.chatId;
    const dispatch = useDispatch();

    const socket = GetSocket();

    const { isMobileMenu } = useSelector((state) => state.misc);
    const { user } = useSelector((state) => state.auth);

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    useErrors([{ isError, error }]);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
      console.log("Delete Chat", _id, groupChat);
    };

    const handleMobileClose = () => dispatch(setIsMobileMenu(false));

    const newMessageAlertHandler = useCallback(() => {}, []);

    const newRequestHandler = useCallback(() => {
      dispatch(incrementNotificationCount());
    }, [dispatch]);

    const eventHandler = {
      [NEW_MESSAGE_ALERT]: newMessageAlertHandler,
      [NEW_REQUEST]: newRequestHandler,
    };

    useSocketEvents(socket, eventHandler);

    return (
      <>
        <Title />
        <Header />

        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobileMenu} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}

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
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data?.chats}
                chatId={chatId}
                handleDeleteChat={handleDeleteChat}
              />
            )}
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
            <WrappedComponent {...props} chatId={chatId} user={user} />
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
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
