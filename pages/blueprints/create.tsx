import React, { useState, forwardRef } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { requireAuth, getAuthToken } from "../../src/utils";
import { RootState } from "../../src/store/store";
import { GetServerSideProps } from "next";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  menuIcon: {
    "&.fa-plus": {
      width: "12px"
    }
  },
  addFieldButton: {
    margin: "16px 0 0 0"
  }
}));

const CreateBlueprintPage = (props) => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Everest | Create Blueprint</title>
      </Head>
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" className={classes.title} component="div">
          Create Blueprint
        </Typography>
        <Divider />
        <Button color="primary" variant="outlined" size="small" className={classes.addFieldButton} onClick={() => setModalOpen(true)} startIcon={<FontAwesomeIcon icon={faPlus} fixedWidth className={classes.menuIcon} />}>
          Add a New Field
        </Button>
      </Container>
    </>
  );
};

const ConnectedCreateBlueprintPage = connect((state: RootState) => ({

}), {

})(CreateBlueprintPage);

export const getServerSideProps: GetServerSideProps = getAuthToken;

export default requireAuth(ConnectedCreateBlueprintPage);
