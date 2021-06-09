import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faStepBackward, faStepForward } from "@fortawesome/free-solid-svg-icons";
import useTheme from "@material-ui/core/styles/useTheme";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { TablePaginationActionsProps } from "@material-ui/core/TablePagination/TablePaginationActions";
import { useStyles } from "./Table.styles";

const TablePaginationActions = (props: TablePaginationActionsProps) => {
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
        <div className={classes.mobileSpacer}></div>
      </Hidden>
      <div className={classes.actionsContainer}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
          disableRipple
        >
          {theme.direction === 'rtl' ? <FontAwesomeIcon icon={faStepForward} fixedWidth size="xs" className={classes.paginationIcon} /> : <FontAwesomeIcon icon={faStepBackward} fixedWidth size="xs" className={classes.paginationIcon}/>}
        </IconButton>
        <IconButton 
          onClick={handleBackButtonClick} 
          disabled={page === 0} 
          disableRipple
          aria-label="previous page">
          {theme.direction === 'rtl' ? <FontAwesomeIcon icon={faChevronRight} fixedWidth size="xs" className={classes.paginationIcon} /> : <FontAwesomeIcon icon={faChevronLeft} fixedWidth size="xs" className={classes.paginationIcon}/>}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disableRipple
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <FontAwesomeIcon icon={faChevronLeft} fixedWidth size="xs" className={classes.paginationIcon}/> : <FontAwesomeIcon icon={faChevronRight} fixedWidth size="xs" className={classes.paginationIcon}/>}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disableRipple
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FontAwesomeIcon icon={faStepBackward} fixedWidth size="xs" className={classes.paginationIcon}/> : <FontAwesomeIcon icon={faStepForward} fixedWidth size="xs" className={classes.paginationIcon}/>}
        </IconButton>
      </div>
    </>
  );
};

export default TablePaginationActions;