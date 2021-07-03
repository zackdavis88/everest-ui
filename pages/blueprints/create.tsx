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
import { requireAuth, getAuthToken } from "../../src/utils";
import { RootState } from "../../src/store/store";
import { GetServerSideProps } from "next";
import AddFieldModal from "../../src/components/AddFieldModal/AddFieldModal";
import Box from "@material-ui/core/Box";
import { faPlus, faSave, faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { createBlueprint } from "../../src/store/actions/blueprints";
import Collapse from "@material-ui/core/Collapse";
import Grid from "@material-ui/core/Grid";
import { v4 as uuidv4 } from 'uuid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: "0",
    padding: "0 16px 16px 16px",
    borderRadius: "5px",
    position: "relative",
    "& h6": {
      margin: "16px 0 0 0"
    }
  },
  title: {
    position: "sticky",
    top: "64px",
    padding: "41px 0 0 0",
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
    top: "47px",
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
  },
  accordionRoot: {
    margin: "16px 0 0 0",
    "&.MuiAccordion-root": {
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      }
    },
    "& > .MuiAccordionSummary-root": {
      backgroundColor: fade(theme.palette.common.black, .12),
      minHeight: 56,
      "& .MuiTypography-subtitle1": {
        maxWidth: "800px",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        fontWeight: "bold",
        [theme.breakpoints.down(theme.breakpoints.values.md)]: {
          maxWidth: "450px"
        },
        [theme.breakpoints.down(theme.breakpoints.values.sm)]: {
          maxWidth: "275px"
        }
      },
      "&.Mui-expanded": {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        "& > .MuiIconButton-root": {
          color: theme.palette.common.white
        }
      }
    },
    "& .MuiAccordionDetails-root": {
      backgroundColor: fade(theme.palette.common.black, .12),
      padding: "16px 12px",
      display: "block",
      "& > div:first-of-type": {
        "& > div:nth-of-type(2)": {
          margin: "16px 0 0 0"
        }
      },
      "& .string-options-container": {
        "& > div": {
          margin: "16px 0 0 0"
        },
        "& > div:nth-of-type(3)": {
          [theme.breakpoints.up(theme.breakpoints.values.sm)]:{
            padding: "0 8px 0 0"
          }
          
        },
        "& > div:nth-of-type(4)": {
          [theme.breakpoints.up(theme.breakpoints.values.sm)]:{
            padding: "0 0 0 8px"
          }
        }
      },
      "& .number-options-container": {
        "& > div": {
          margin: "16px 0 0 0"
        },
        "& > div:nth-of-type(2)": {
          [theme.breakpoints.up(theme.breakpoints.values.sm)]:{
            padding: "0 8px 0 0"
          }
          
        },
        "& > div:nth-of-type(3)": {
          [theme.breakpoints.up(theme.breakpoints.values.sm)]:{
            padding: "0 0 0 8px"
          }
        }
      }
    }
  }
}));

interface BlueprintField{
  name: string;
  type: string;
  isExpanded: boolean;
  isRequired?: boolean;
  isInteger?: boolean;
  regex?: string;
  min?: number | string;
  max?: number | string;
  arrayOf?: BlueprintField;
  fields?: BlueprintField[];
  error?: string;
};

interface CreateBlueprintProps{
  initialReduxState?: RootState;
  createBlueprint: (name: string) => void;
};

const CreateBlueprint = (props: CreateBlueprintProps) => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(false);
  const [showActions, setShowActions] = useState(true);
  const [blueprintName, setBlueprintName] = useState({value: "", error: ""});
  const [blueprintTree, setBlueprintTree] = useState([]); // the tree structure of the blueprint's fields.
  const [blueprintValueMap, setBlueprintValueMap] = useState({}); // the values of each tree node.
  
  const blueprintNameProps = {
    label: "Blueprint Name",
    value: blueprintName.value,
    onChange: (event: any) => setBlueprintName({value: event.target.value, error: ""}),
    className: classes.blueprintNameField,
    variant: "filled" as "filled",
    fullWidth: true,
    required: true,
    error: !!blueprintName.error,
    helperText: blueprintName.error
  };

  const updateFieldProperty = (uuid: string, keyName: string, value: any) => setBlueprintValueMap({
    ...blueprintValueMap,
    [uuid]: {
      ...blueprintValueMap[uuid],
      [keyName]: value
    }
  });

  const fieldNameProps = (uuid: string) => ({
    label: "Field Name",
    value: blueprintValueMap[uuid].name,
    variant: "filled" as "filled",
    fullWidth: true,
    required: true,
    error: !!blueprintValueMap[uuid].error,
    helperText: blueprintValueMap[uuid].error,
    onChange: (event: any) => updateFieldProperty(uuid, "name", event.target.value)
  });

  const onSave = async(event: any) => {
    const response: any = await props.createBlueprint(blueprintName.value);
    if(/^name /.test(response.error) && !/ field /.test(response.error))
      return setBlueprintName({...blueprintName, error: response.error});
  };

  const addNewField = (fieldName: string, fieldType: string) => {
    const uuid = uuidv4();
    // Lets default the accordion to collapsed...except for Arrays and Objects...since those are garunteed to need additional data.
    const isArrayOrObject = fieldType.toLowerCase() === "array" || fieldType.toLowerCase() === "object";
    let field: BlueprintField = {name: fieldName, type: fieldType, isRequired: false, isExpanded: isArrayOrObject ? true : false};
    switch(fieldType.toLowerCase()){
      case "string": field = {...field, regex: "", min: "", max: ""};
                     break;
      case "number": field = {...field, isInteger: false, min: "", max: ""};
                     break;
      case "array":  field = {...field, min: "", max: "", arrayOf: null};
                     break;
      case "object": field = {...field, fields: []};
                     break;
      default: break;
    }
    setBlueprintTree([...blueprintTree, {uuid}]);
    setBlueprintValueMap({
      ...blueprintValueMap,
      [uuid]: field
    });
  };

  const toggleAccordion = (uuid: string) => (event: any, isExpanded: boolean) => setBlueprintValueMap({
    ...blueprintValueMap,
    [uuid]: {
      ...blueprintValueMap[uuid],
      isExpanded: !blueprintValueMap[uuid].isExpanded
    }
  });

  const renderFieldOptions = (uuid) => {
    const fieldData = blueprintValueMap[uuid];
    const regexProps = {
      label: "Regex Pattern",
      value: fieldData.regex,
      variant: "filled" as "filled",
      fullWidth: true,
      onChange: (event: any) => updateFieldProperty(uuid, "regex", event.target.value),
      helperText: "Example: ^hello, world$"
    };
    const minProps = {
      value: fieldData.min,
      variant: "filled" as "filled",
      fullWidth: true,
      type: "number"
    };
    const maxProps = {
      value: fieldData.max,
      variant: "filled" as "filled",
      fullWidth: true,
      type: "number"
    };
    switch(fieldData.type){
      case "STRING":
        return (
          <>
            <Grid item xs={12} sm={6} md={5}>
              <TextField {...regexProps} />
            </Grid>
            <Grid item xs={false} sm={6} md={7}></Grid>
            <Grid item xs={12} sm={3}>
              <TextField {...minProps} label="Min Length" onChange={(event: any) => {
                const value = event.target.value;
                if(!isNaN(value) && value < 0)
                  return;
                updateFieldProperty(uuid, "min", event.target.value);
              }}/>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField {...maxProps} label="Max Length" onChange={(event: any) => {
                const value = event.target.value;
                if(!isNaN(value) && value < 0)
                  return;
                updateFieldProperty(uuid, "max", event.target.value);
              }}/>
            </Grid>
          </>
        );
      case "NUMBER":
        return (
          <>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={fieldData.isInteger}
                    onChange={(event: any) => updateFieldProperty(uuid, "isInteger", event.target.checked)}
                    name={`${uuid}-integer`}
                    color="primary"
                  />
                }
                label="Integer Values Only"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField {...minProps} label="Min Value" onChange={(event: any) => updateFieldProperty(uuid, "min", event.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField {...maxProps} label="Max Value" onChange={(event: any) => updateFieldProperty(uuid, "max", event.target.value)}/>
            </Grid>
          </>
        );
      default:
        return null;
    }
  };

  const renderFields = () => blueprintTree.map((field, index) => {
    const {uuid} = field;
    const fieldData = blueprintValueMap[uuid];
    const {isExpanded} = fieldData;
    return (
      <Accordion elevation={isExpanded ? 5 : 1} key={index} className={classes.accordionRoot} TransitionProps={{unmountOnExit: true}} expanded={isExpanded} onChange={toggleAccordion(uuid)}>
        <AccordionSummary aria-controls={`${field.uuid}-content`} id={`${field.uuid}-header`} expandIcon={<FontAwesomeIcon icon={faChevronDown} fixedWidth size="sm" />}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="subtitle1" component="div">{fieldData.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" component="div">{fieldData.type}</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={fieldData.isRequired}
                    onChange={(event: any) => updateFieldProperty(uuid, "isRequired", event.target.checked)}
                    name={`${uuid}-required`}
                    color="primary"
                  />
                }
                label="Required Field"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <TextField {...fieldNameProps(uuid)} />
            </Grid>
          </Grid>
          <Grid container className={`${fieldData.type.toLowerCase()}-options-container`}>
            {renderFieldOptions(uuid)}
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  });

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
                  <Button size="medium" variant="contained" color="primary" fullWidth startIcon={<FontAwesomeIcon icon={faSave} fixedWidth size="xs" />} onClick={onSave}>
                    Save
                  </Button>
                </Grid>
                <Grid item lg={3} md={3} sm={4} xs={12}>
                  <Button size="medium" variant="outlined" color="primary" fullWidth startIcon={<FontAwesomeIcon icon={faTimes} fixedWidth size="xs" />}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item lg={3} md={3} sm={4} xs={12}>
                  <Button size="medium" variant="outlined" fullWidth color="primary" startIcon={<FontAwesomeIcon icon={faPlus} fixedWidth size="xs" />} onClick={() => setModalOpen(true)}>
                    Add Field
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={6} md={5}>
            <TextField {...blueprintNameProps} />
          </Grid>
        </Grid>
        {blueprintTree.length ? (
          <>
            <Typography variant="h6" component="h6">Fields</Typography>
            <Divider />
            {renderFields()}
          </>
        ) : (
          <Box boxShadow={0} className={classes.fieldsEmptyContainer}>
            <Typography variant="subtitle1" component="div">
              This blueprint currently has no fields.
            </Typography>
          </Box>
        )}
      </Container>
      <AddFieldModal
        isOpen={modalOpen}
        handleClose={() => setModalOpen(false)}
        onSubmit={addNewField}
      />
    </>
  );
};

const ConnectedCreateBlueprint = connect((state: RootState) => ({
  // mapStateToProps
}), {
  createBlueprint
})(CreateBlueprint);

export const getServerSideProps: GetServerSideProps = getAuthToken;

export default requireAuth(ConnectedCreateBlueprint);
