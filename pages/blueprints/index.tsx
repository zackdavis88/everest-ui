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
import { getBlueprints, resetBlueprints } from "../../src/store/actions/blueprints";
import Menu from "../../src/components/Menu/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { Theme } from "@material-ui/core/styles"
import Table from "../../src/components/Table/Table";
import SearchBar from "../../src/components/SearchBar/SearchBar";

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
  resetBlueprintsState: () => void;
  getBlueprints: (queryObject: any) => void;
};

function BlueprintsIndex(props: BlueprintsIndexProps) {
  const classes = useStyles(props);
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

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
    router.push(url);
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
      url.searchParams.append("filterName", searchInput);
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
          <SearchBar
            value={searchInput}
            onSubmit={onSubmit}
            onChange={(e) => setSearchInput(e.target.value)}
            disabled={props.isLoading}
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
  resetBlueprintsState: resetBlueprints,
  getBlueprints
})(BlueprintsIndex);

export default requireAuth(ConnectedBlueprintsIndex);
