import React, { useState } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { GetServerSideProps } from "next";
import { connect } from "react-redux";
import { requireAuth, ssrBlueprintsIndex } from "../../src/utils";
import { RootState } from "../../src/store/store";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

interface BlueprintsIndexProps {
  initialReduxState?: RootState;
  isLoading?: boolean;
  error?: string;
  blueprints: {
    id: string,
    name: string,
    createdOn: string,
    updatedOn?: string,
    createdBy?: {
      username: string,
      displayName: string
    },
    updatedBy?: {
      username: string,
      displayName: string
    },

  }[];
  page: number;
  totalPages: number;
  itemsPerPage: number;
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "25px",
    padding: "16px",
    borderRadius: "5px",
    position: "relative"
  },
  title: {
    position: "relative"
  },
  button: {
    position: "absolute",
    right: "0",
    top: "6px"
  }
}));

function BlueprintsIndex(props: BlueprintsIndexProps) {
  const classes = useStyles();
  const tableHeaders = [{
    label: "ID",
    key: "id"
  }, {
    label: "Name",
    key: "name"
  }, {
    label: "Created On",
    key: "createdOn"
  }, {
    label: "Updated On",
    key: "updatedOn"
  }, {
    label: "Created By",
    key: "createdBy",
    format: (data) => data.displayName
  }];
  const tableColumns = [{
    key: "id"
  }, {
    key: "name"
  }, {
    key: "createdOn"
  }, {
    key: "updatedOn"
  }, {
    key: "createdBy",
    format: (data) => data ? data.displayName : "Unknown"
  }];
  // TODO: This is where you left off. The Table needs to be finished
  // and improved.
  return (
    <>
      <Head>
        <title>Everest | Blueprints</title>
      </Head>
      {!props.error && (
        <Container maxWidth="lg" className={classes.container}>
          <Typography variant="h4" className={classes.title} component="div">
            Blueprints
            <Button color="primary" variant="outlined" size="small" className={classes.button}>
              Create Blueprint
            </Button>
          </Typography>
          <Divider />
          {!props.isLoading ? (
            <>
            {props.blueprints.length ? (
              <TableContainer>
                <Table stickyHeader aria-label="blueprints-table">
                  <TableHead>
                    <TableRow>
                      {tableHeaders.map(header => (
                        <TableCell key={header.key}>
                          {header.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.blueprints.map((blueprint, index) => (
                      <TableRow hover tabIndex={-1} key={index}>
                        {tableColumns.map((column, index) => {
                          const value = blueprint[column.key];
                          return (
                            <TableCell key={index}>
                              {column.format ? column.format(value) : value}
                            </TableCell>
                        )})}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div>No Blueprints Exist</div>
            )}
            </>
          ) : (
            <div>Loading</div>
          )}
        </Container>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = ssrBlueprintsIndex;

const ConnectedBlueprintsIndex = connect((state: RootState) => ({
  isLoading: state.blueprints.isLoading,
  error: state.blueprints.error,
  blueprints: state.blueprints.blueprints,
  page: state.blueprints.page,
  totalPages: state.blueprints.totalPages,
  itemsPerPage: state.blueprints.itemsPerPage
}), {

})(BlueprintsIndex);

export default requireAuth(ConnectedBlueprintsIndex);
