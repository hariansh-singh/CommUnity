import { Add as AddIcon} from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React from "react";

function UserItem({ user, handler, handlerIsLoading }) {
  const { name, _id, avatar } = user;

  return (
    <ListItem>
      <Stack>
        <Avatar />

        <Typography>{name}</Typography>

        <IconButton>
            <AddIcon />
        </IconButton>
      </Stack>
    </ListItem>
  );
}

export default memo(UserItem);
