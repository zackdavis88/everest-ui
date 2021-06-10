import React from "react";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const TableLoading = () => (
  <div id="table-loading-overlay">
    <Grid style={{height: "100%"}} container justify="center" alignItems="center">
      <Grid item>
        <CircularProgress color="primary" />
      </Grid>
    </Grid>
  </div>
);

export default TableLoading;
