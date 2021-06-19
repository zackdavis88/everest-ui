import React, { useState } from "react";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { requireAuth, getAuthToken, useWidth } from "../../src/utils";
import { RootState } from "../../src/store/store";
import { GetServerSideProps } from "next";
import AddFieldModal from "../../src/components/AddFieldModal/AddFieldModal";
import Box from "@material-ui/core/Box";
import { faPlus, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {fade} from "@material-ui/core/styles/colorManipulator";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: "25px",
    padding: "0 16px 16px 16px",
    borderRadius: "5px",
    position: "relative"
  },
  title: {
    position: "sticky",
    top: 0,
    padding: "16px 0 0 0",
    backgroundColor: theme.palette.background.default,
    zIndex: 100,
    [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
      fontSize: "1.55rem",
      lineHeight: 1.66
    }
  },
  toggleActionsButton: {
    position: "absolute",
    right: "0",
    top: "22px",
    padding: "3px 9px"
  },
  blueprintNameField: {
    margin: "16px 0 0 0"
  },
  fieldsEmptyContainer: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.info.main,
    padding: "20px",
    borderRadius: "5px",
    margin: "16px 0 0 0"
  },
  actionsMenu: {
    padding: "16px",
    backgroundColor: fade(theme.palette.common.black, .12),
    borderRadius: "0 0 5px 5px",
    "& button": {
      padding: "8px 22px",
      "& .MuiButton-label": {
        fontSize: "0.9375rem"
      },
      "& .MuiButton-startIcon": {
        marginLeft: "-4px",
        marginRight: "8px"
      }
    },
    "& svg.fa-fw": {
      width: "12px"
    }
  }
}));

interface CreateBlueprintProps{
  initialReduxState?: RootState;
};

const CreateBlueprint = (props: CreateBlueprintProps) => {
  const classes = useStyles();
  const currentBreakpoint = useWidth();
  const [modalOpen, setModalOpen] = useState(false);
  const [showActions, setShowActions] = useState(true);
  const [blueprintName, setBlueprintName] = useState("");
  const [blueprintFields, setBlueprintFields] = useState([]);
  const blueprintNameProps = {
    label: "Blueprint Name",
    value: blueprintName,
    onChange: (event: any) => setBlueprintName(event.target.value),
    className: classes.blueprintNameField,
    variant: "filled" as "filled"
  };
  const getButtonSize = () => (
    currentBreakpoint === "xl" ||
    currentBreakpoint === "lg" ? "large" : "small"
  );
  return (
    <>
      <Head>
        <title>Everest | Create Blueprint</title>
      </Head>
      <Container maxWidth="lg" className={classes.container}>
        <Typography variant="h4" className={classes.title} component="div">
          Create Blueprint
          <Button color="primary" variant="outlined" size="small" className={classes.toggleActionsButton} onClick={() => setShowActions(!showActions)}>
            {`${showActions ? "Hide" : "Show"} Actions`}
          </Button>
          <Divider />
          <Collapse in={showActions}>
            <Box boxShadow={0} className={classes.actionsMenu}>
              <Grid container spacing={1}>
                <Grid item lg={3} md={3} sm={4} xs={12}>
                  <Button size={getButtonSize()} variant="contained" color="primary" fullWidth startIcon={<FontAwesomeIcon icon={faSave} fixedWidth size="xs" />}>
                    Save
                  </Button>
                </Grid>
                <Grid item lg={3} md={3} sm={4} xs={12}>
                  <Button size={getButtonSize()} variant="outlined" color="primary" fullWidth startIcon={<FontAwesomeIcon icon={faTimes} fixedWidth size="xs" />}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item lg={3} md={3} sm={4} xs={12}>
                  <Button size={getButtonSize()} variant="outlined" fullWidth color="primary" startIcon={<FontAwesomeIcon icon={faPlus} fixedWidth size="xs" />}>
                    Add Field
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </Typography>
        <TextField {...blueprintNameProps} />
        {blueprintFields.length ? (
          <div>Fields go here.</div>
        ) : (
          <Box boxShadow={0} className={classes.fieldsEmptyContainer}>
            <Typography variant="subtitle1" component="div">
              This blueprint is currently empty.
            </Typography>
          </Box>
        )}
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      </Container>
      <AddFieldModal
        isOpen={modalOpen}
        handleClose={() => setModalOpen(false)}
        onSubmit={(nameInput: string, fieldType: string) => {console.log(nameInput);console.log(fieldType)}}
      />
    </>
  );
};

const ConnectedCreateBlueprint = connect((state: RootState) => ({

}), {

})(CreateBlueprint);

export const getServerSideProps: GetServerSideProps = getAuthToken;

export default requireAuth(ConnectedCreateBlueprint);
