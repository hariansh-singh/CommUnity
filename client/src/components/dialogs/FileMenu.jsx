import { Menu } from "@mui/material";
import React from "react";

const FileMenu = ({ anchorE1 }) => {
  return (
    <Menu anchorEl={anchorE1} open={false}>
      <div
        style={{
          width: "10rem",
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet ratione
        obcaecati numquam modi perspiciatis quae molestias distinctio asperiores
        animi, corrupti debitis suscipit atque aliquid, tenetur in quia qui
        minus aliquam!
      </div>
    </Menu>
  );
};

export default FileMenu;
