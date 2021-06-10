import React, { useEffect, useState } from "react";
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
import { formatDate } from "../../src/utils";
import { getBlueprints, resetBlueprints, deleteBlueprint } from "../../src/store/actions/blueprints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { Theme } from "@material-ui/core/styles"
import Table from "../../src/components/Table/Table";
import SearchBar from "../../src/components/SearchBar/SearchBar";
import { showNotification } from "../../src/store/actions/notification";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from '@material-ui/core/Tooltip';
import DeleteBlueprintModal from "../../src/components/DeleteModal/DeleteModal";

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
  }
}));

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
  itemsPerPage: number;
  totalItems: number;
  resetBlueprints: () => void;
  getBlueprints: (queryObject: any) => void;
  deleteBlueprint: (id: string, confirmInput: string) => void;
  showNotification: (message: string, type?: string) => void;
};

function BlueprintsIndex(props: BlueprintsIndexProps) {
  const classes = useStyles(props);
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(router.query.filterName || "");
  const [modalData, setModalData] = useState({isOpen: false, blueprint: {id: "", name: ""}});

  useEffect(() => {
    if(!props.blueprints)
      props.getBlueprints(router.query);
    return () => props.resetBlueprints();
  }, []);

  useEffect(() => {
    if(props.error)
      props.showNotification(props.error, "error");
  }, [props.error]);

  const onPaginationChange = (key: string) => (event: any, page: number) => {
    const query = {...router.query};
    const url = new URL(window.location.pathname, window.location.origin);
    url.searchParams.append("page", props.page.toString());
    url.searchParams.append("itemsPerPage", props.itemsPerPage.toString());
    if(query.filterName)
      url.searchParams.append("filterName", query.filterName.toString());
    if(typeof page === "number" && key === "page")
      url.searchParams.set(key, (page + 1).toString());
    else {
      url.searchParams.set(key, event.target.value)
    }
    router.push(url, undefined, {shallow: true});
    return props.getBlueprints({
      itemsPerPage: url.searchParams.get("itemsPerPage"), 
      page: url.searchParams.get("page"),
      filterName: url.searchParams.get("filterName")
    });
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    const query = router.query;
    const url = new URL(window.location.pathname, window.location.origin);
    if(searchInput)
      url.searchParams.append("filterName", searchInput.toString());
    if(query.itemsPerPage)
      url.searchParams.append("itemsPerPage", query.itemsPerPage.toString())
    if(query.page)
      url.searchParams.append("page", query.page.toString())
    router.push(url, undefined, {shallow: true});
    return props.getBlueprints({
      itemsPerPage: url.searchParams.get("itemsPerPage"), 
      page: url.searchParams.get("page"),
      filterName: url.searchParams.get("filterName")
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
    format: (data) => {
      return (
        <>
          <Tooltip title="View / Edit" placement="top" aira-label="view or edit blueprint">
            <IconButton size="small" onClick={() => router.push(`/blueprints/${data.id}`)}>
              <FontAwesomeIcon icon={faEdit} size="sm" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top" aria-label="delete blueprint">
            <IconButton size="small" style={{margin: "0 0 0 16px"}} onClick={() => setModalData({isOpen: true, blueprint: data})}>
              <FontAwesomeIcon icon={faTrash} size="sm" />
            </IconButton>
          </Tooltip>
        </>
      )
    }
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

  return (
    <>
      <Head>
        <title>Everest | Blueprints</title>
      </Head>
      {!props.error && (
        <Container maxWidth="lg" className={classes.container}>
          <Typography variant="h4" className={classes.title} component="div">
            Blueprints
            <Button color="primary" variant="outlined" size="small" className={classes.button} onClick={() => router.push("/blueprints/create")}>
              Create Blueprint
            </Button>
          </Typography>
          <Divider />
          <SearchBar
            value={searchInput.toString()}
            onSubmit={onSubmit}
            disabled={props.isLoading || !props.blueprints}
            onChange={(e) => {
              e.preventDefault();
              if(e.nativeEvent instanceof InputEvent)
                return setSearchInput(e.target.value);

              // if we hit this block of code, then a user clicked the search clear button.
              setSearchInput("");
              const query = router.query;
              const url = new URL(window.location.pathname, window.location.origin);
              if(query.itemsPerPage)
                url.searchParams.append("itemsPerPage", query.itemsPerPage.toString())
              if(query.page)
                url.searchParams.append("page", query.page.toString())
              router.push(url);
              return props.getBlueprints({
                itemsPerPage: url.searchParams.get("itemsPerPage"), 
                page: url.searchParams.get("page"),
                filterName: url.searchParams.get("filterName")
              });
            }}
          />
          <Table
            isLoading={props.isLoading}
            items={props.blueprints}
            itemsPerPage={props.itemsPerPage}
            page={props.page}
            totalItems={props.totalItems}
            headers={tableHeaders}
            columns={tableColumns}
            onPaginationChange={onPaginationChange}
          />
        </Container>
      )}
      <DeleteBlueprintModal
        isOpen={modalData.isOpen}
        handleClose={(refresh: boolean) => {
          setModalData({isOpen: false, blueprint: {id: "", name: ""}})
          if(refresh)
            props.getBlueprints(router.query);
        }}
        deleteResource={props.deleteBlueprint}
        resource={modalData.blueprint}
        showNotification={props.showNotification}
        resourceType={"Blueprint"}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = ssrBlueprintsIndex;

const ConnectedBlueprintsIndex = connect((state: RootState) => ({
  isLoading: state.blueprints.isLoading,
  error: state.blueprints.error,
  blueprints: state.blueprints.blueprints,
  page: state.blueprints.page,
  itemsPerPage: state.blueprints.itemsPerPage,
  totalItems: state.blueprints.totalItems
}), {
  resetBlueprints,
  getBlueprints,
  deleteBlueprint,
  showNotification
})(BlueprintsIndex);

export default requireAuth(ConnectedBlueprintsIndex);
