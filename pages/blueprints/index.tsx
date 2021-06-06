import React, { useState, useEffect } from "react";
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
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import { formatDate } from "../../src/utils";
import { resetBlueprints } from "../../src/store/actions/blueprints";
import Menu from "../../src/components/Menu/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faEllipsisV, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import { Grid, Hidden, IconButton, useTheme } from "@material-ui/core";
import { TablePaginationActionsProps } from "@material-ui/core/TablePagination/TablePaginationActions";
import { getBlueprints } from "../../src/store/actions/blueprints";
import { useRouter } from "next/router";
import { Theme } from "@material-ui/core/styles"
import { fade } from "@material-ui/core/styles/colorManipulator";
import CircularProgress from "@material-ui/core/CircularProgress";

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const classes = useStyles();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <>
      <Hidden smUp>
        <div style={{display: "flex", flex: "1 0 100%"}}></div>
      </Hidden>
      <div style={{display: "flex"}}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <FontAwesomeIcon icon={faStepForward} fixedWidth size="xs" className={classes.paginationIcon} /> : <FontAwesomeIcon icon={faStepBackward} fixedWidth size="xs" className={classes.paginationIcon}/>}
        </IconButton>

        <IconButton 
          onClick={handleBackButtonClick} 
          disabled={page === 0} 
          aria-label="previous page">
          {theme.direction === 'rtl' ? <FontAwesomeIcon icon={faChevronRight} fixedWidth size="xs" className={classes.paginationIcon} /> : <FontAwesomeIcon icon={faChevronLeft} fixedWidth size="xs" className={classes.paginationIcon}/>}
        </IconButton>

        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <FontAwesomeIcon icon={faChevronLeft} fixedWidth size="xs" className={classes.paginationIcon}/> : <FontAwesomeIcon icon={faChevronRight} fixedWidth size="xs" className={classes.paginationIcon}/>}
        </IconButton>

        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FontAwesomeIcon icon={faStepBackward} fixedWidth size="xs" className={classes.paginationIcon}/> : <FontAwesomeIcon icon={faStepForward} fixedWidth size="xs" className={classes.paginationIcon}/>}
        </IconButton>
      </div>
      </>
  );
}

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
    }
  }[];
  page: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  resetBlueprintsState: () => void;
  getBlueprints: (queryObject: any) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
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
    top: "6px",
    padding: "3px 9px"
  },
  tableContainer: {
    position: "relative",
    "& .MuiTableHead-root .MuiTableCell-root": {
      fontWeight: "bold"
    },
    "& .MuiTableCell-root": {
      whiteSpace: "nowrap",
      textOverflow: "ellipsis"
    },
    "& .MuiTablePagination-toolbar": {
      flexWrap: "wrap",
      "& > .MuiTablePagination-spacer": {
        flex: "none"
      }
    },
    "& .fa-ellipsis-v": {
      width: "8px"
    },
    "& #table-loading-overlay": {
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: 100,
      backgroundColor: fade(theme.palette.common.white, 0.4)
    },
    [theme.breakpoints.down(theme.breakpoints.values.md)]: {
      "& .hidden-md": {
        display: "none"
      }
    },
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      "& .hidden-sm": {
        display: "none"
      }
    }
  },
  paginationIcon: {
    "&.fa-fw": {
      width: "1.25em"
    }
  }
}));

function BlueprintsIndex(props: BlueprintsIndexProps) {
  const classes = useStyles(props);
  const router = useRouter();

  useEffect(() => {
    if(!props.blueprints)
      props.getBlueprints(router.query);
    return () => props.resetBlueprintsState();
  }, []);

  const generateActionMenuProps = (blueprint) => ({
    id: `${blueprint.id}-actions`,
    menuName: "",
    startIcon: <FontAwesomeIcon icon={faEllipsisV} fixedWidth size="xs" />,
    menuItems: [{
      name: "Details",
      url: `/blueprints/${blueprint.id}`
    }],
    useIconButton: true,
    placement: "left"
  });

  const handlePaginationChange = (key: string, value: any) => {
    const url = new URL(window.location.pathname, window.location.origin);
    url.searchParams.append("page", props.page.toString());
    url.searchParams.append("itemsPerPage", props.itemsPerPage.toString());
    url.searchParams.set(key, value);
    router.push(url);
    return props.getBlueprints({
      itemsPerPage: url.searchParams.get("itemsPerPage"), 
      page: url.searchParams.get("page")
    });
  };
  
  const tableHeaders = [{
    label: "Actions",
    key: "actions"
  }, {
    label: "ID",
    key: "id",
    hidden: "md"
  }, {
    label: "Name",
    key: "name"
  }, {
    label: "Created On",
    key: "createdOn"
  }, {
    label: "Created By",
    key: "createdBy",
    hidden: "md"
  }, {
    label: "Updated On",
    key: "updatedOn",
    hidden: "sm"
  }, {
    label: "Updated By",
    key: "updatedBy",
    hidden: "md"
  }];

  const tableColumns = [{
    key: "actions",
    format: (data) => <Menu {...generateActionMenuProps(data)} />
  }, {
    key: "id",
    hidden: "md"
  }, {
    key: "name"
  }, {
    key: "createdOn",
    format: formatDate
  }, {
    key: "createdBy",
    format: (data) => data ? data.displayName : "",
    hidden: "md"
  }, {
    key: "updatedOn",
    format: (date) => date ? formatDate(date) : "",
    hidden: "sm"
  }, {
    key: "updatedBy",
    format: (data) => data ? data.displayName : "",
    hidden: "md"
  }];

  const TableLoading = () => (
    <div id="table-loading-overlay">
      <Grid style={{height: "100%"}} container justify="center" alignItems="center">
        <Grid item>
          <CircularProgress color="primary" />
        </Grid>
      </Grid>
    </div>
  );

  const hiddenClass = (hiddenString?: string) => {
    if(!hiddenString)
      return ""
    
    return `hidden-${hiddenString}`;
  };
  
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
          <TableContainer className={classes.tableContainer} >
            {props.isLoading || !props.blueprints ? <TableLoading /> : null}
            <Table stickyHeader aria-label="blueprints-table">
              <TableHead>
                <TableRow>
                  {tableHeaders.map(header => (
                    <TableCell key={header.key} className={hiddenClass(header.hidden)}>
                      {header.label}
                    </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {props.blueprints && props.blueprints.map((blueprint, index) => (
                  <TableRow hover tabIndex={-1} key={index}>
                    {tableColumns.map((column, index) => {
                      const value = blueprint[column.key];
                      return column.key === "actions" ? (
                        <TableCell key={index} className={hiddenClass(column.hidden)}>
                          {column.format ? column.format(blueprint) : value}
                        </TableCell>
                      ) : (
                        <TableCell key={index} className={hiddenClass(column.hidden)}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                    )})}
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    rowsPerPage={props.itemsPerPage}
                    onChangeRowsPerPage={(event) => handlePaginationChange("itemsPerPage", event.target.value)}
                    page={props.page - 1}
                    ActionsComponent={TablePaginationActions}
                    count={props.totalItems}
                    onChangePage={(event, page) => handlePaginationChange("page", page+1)}
                    labelRowsPerPage={"Items per page:"}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
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
  itemsPerPage: state.blueprints.itemsPerPage,
  totalItems: state.blueprints.totalItems
}), {
  resetBlueprintsState: resetBlueprints,
  getBlueprints
})(BlueprintsIndex);

export default requireAuth(ConnectedBlueprintsIndex);
