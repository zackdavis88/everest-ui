import React, { useState } from "react";
import { SearchBarProps } from "./SearchBar.props";
import { useStyles } from "./SearchBar.styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const SearchBar = (props: SearchBarProps) => {
  const classes = useStyles();
  return (
    <form noValidate autoComplete="off" className={classes.searchContainer} onSubmit={props.onSubmit}>
      <Grid container direction="row">
        <Grid item xs={8} sm={6} md={4}>
          <TextField variant="outlined" type="search" size="small" color="primary" label="Name Search" placeholder="Enter a blueprint name" fullWidth disabled={props.disabled} value={props.value} onChange={props.onChange} />
        </Grid>
        <Grid item xs={3} sm={3} md={2}>
          <Button variant="contained" size="small" fullWidth color="primary" disabled={props.disabled} type="submit" disableRipple>
            Search
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchBar;
