import React from "react";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableLoading from "./TableLoading";
import TablePaginationActions from "./TablePaginationActions";
import { useStyles } from "./Table.styles";
import { TableProps } from "./Table.props";
import TableEmpty from "./TableEmpty";

const IndexTable = (props: TableProps) => {
  const classes = useStyles();

  const hiddenClass = (hiddenString?: string) => {
    if(!hiddenString)
      return ""
    
    return `hidden-${hiddenString}`;
  };

  return (
    <TableContainer className={classes.tableContainer} >
      {props.isLoading || !props.items ? <TableLoading /> : null}
      {props.items && props.items.length ? (
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {props.headers.map(header => (
                <TableCell key={header.key} className={hiddenClass(header.hidden)}>
                  {header.label}
                </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items && props.items.map((blueprint, index) => (
              <TableRow hover tabIndex={-1} key={index}>
                {props.columns.map((column, index) => {
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
                onChangeRowsPerPage={props.onPaginationChange("itemsPerPage")}
                page={props.page - 1}
                ActionsComponent={TablePaginationActions}
                count={props.totalItems}
                onChangePage={props.onPaginationChange("page")}
                labelRowsPerPage={"Items per page:"}
              />
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <TableEmpty />
      )}
    </TableContainer>
  );
};

export default IndexTable;
