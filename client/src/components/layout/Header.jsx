import {
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import { server } from "../../constants/config";

const SearchDialog = lazy(() => import("../specific/Search"));
const NotificationsDialog = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setisSearch] = useState(false);
  const [isNewGroup, setisNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };

  const openSearch = () => {
    setisSearch((prev) => !prev);
  };

  const openNewGroup = () => {
    setisNewGroup((prev) => !prev);
  };

  const openNotification = () => {
    setIsNotification((prev) => !prev);
  };

  const navigateToGroup = () => navigate("/groups");

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });

      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleHeader = () => {
    navigate("/");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: "#2F2F2F" }}>
          <Toolbar>
            <Box
              onClick={handleHeader}
              position={"absolute"}
              component="img"
              src={logo}
              alt="CommUnity Logo"
              marginTop={"1rem"}
              marginLeft={"-2rem"}
              sx={{
                height: "200px", // Adjust as needed
                display: { xs: "none", sm: "block" },
              }}
            />

            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box>
              <IconBtn
                title="Search"
                icon={<SearchIcon />}
                onClick={openSearch}
              />

              <IconBtn
                title="New Group"
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title="Manage Groups"
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title="Notifications"
                icon={<NotificationsIcon />}
                onClick={openNotification}
              />

              <IconBtn
                title="Logout"
                icon={<LogoutIcon />}
                onClick={logoutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <SearchDialog />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationsDialog />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
}

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
