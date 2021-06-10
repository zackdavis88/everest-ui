import React from "react";
import Box from "@material-ui/core/Box";
import { useStyles } from "./Table.styles";
import Typography from "@material-ui/core/Typography";

const TableEmpty = () => {
  const classes = useStyles();
  return (
    <Box boxShadow={3} className={classes.tableEmptyContainer}>
      <Typography variant="subtitle1" component="div">
        There are no items to display.
      </Typography>
    </Box>
  );
};

export default TableEmpty;
