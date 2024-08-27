import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import Grid from "@mui/material/Grid";

const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Title />
        <Header />

        <Grid container height={"calc(100vh - 4rem)"}>
          <Grid
            item
            sm={4}
            mid={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
          >
            First
          </Grid>

          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            // lg={6}
            height={"100%"}
          >
            <WrappedComponent {...props} />
          </Grid>

          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: 2,
              bgcolor: "rgba(0, 0, 0, 0.85)",
            }}
          >
            Third
          </Grid>
        </Grid>

        <WrappedComponent {...props} />
      </>
    );
  };
};

export default AppLayout;
