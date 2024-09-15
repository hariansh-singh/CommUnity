import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightBlue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachments from "./RenderAttachments";

const MessageComponenet = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;

  const samesender = sender?._id === user?._id;

  const timeAgo = moment(createdAt).fromNow();

  return (
    <div
      style={{
        alignSelf: samesender ? "flex-end" : "flex-start",
        backgroundColor: samesender ? "#E3F9D7" : "black",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!samesender && (
        <Typography color={lightBlue} fontWeight={600} variant={"caption"}>
          {sender.name}
        </Typography>
      )}

      {content && (
        <Typography
          style={{
            color: !samesender ? "white" : "black",
          }}
        >
          {content}
        </Typography>
      )}

      {attachments.length > 0 &&
        attachments.map((i, index) => {
          const url = i.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >
                {RenderAttachments(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography
        style={{
          color: "#B0BEC5",
        }}
        variant="caption"
        color={"text.secondary"}
      >
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponenet);
