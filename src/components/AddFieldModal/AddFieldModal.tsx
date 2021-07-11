import React, { useState, useEffect } from "react";
import DialogModal from "../DialogModal/DialogModal";
import { useWidth } from "../../utils";
import { AddFieldModalProps } from "./AddFieldModal.props";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

const AddFieldModal = (props: AddFieldModalProps) => {
  const breakpoint = useWidth();
  const [nameInput, setNameInput] = useState("");
  const [selectedType, setSelectedType] = useState("");
  
  useEffect(() => {
    return () => {
      setNameInput("");
      setSelectedType("");
    }; // reset state value when the modal unmounts (closes).
  }, []);

  const handleClose = () => {
    setNameInput(""); // just resetting name here. Not resetting type provides a good UX in my opinion...for now.
    props.handleClose();
  };

  let fieldTypes = [
    "String",
    "Boolean",
    "Number",
    "Date",
    "Object"
  ];

  if(!props.parent || props.parent && props.parent.type !== "ARRAY")
    fieldTypes = fieldTypes.concat("Array");

  const nameInputProps = {
    label: "Field Name",
    value: nameInput,
    onChange: (event: any) => setNameInput(event.target.value),
    variant: "filled" as "filled",
    fullWidth: true,
    required: true,
    inputProps: { maxLength: 100 }
  };

  return (
    <DialogModal
      title="Add Blueprint Field"
      isOpen={props.isOpen}
      handleClose={handleClose}
      onSubmit={(event: any) => {
        event.preventDefault();
        handleClose();
        props.onSubmit(nameInput, selectedType);
      }}
      maxWidth="sm"
      id="add-field-modal"
      fullscreen={breakpoint === "xs"}
      submitDisabled={!selectedType || !nameInput}
      autoFocus={false}
      isForm={true}
    >
      <TextField {...nameInputProps} autoFocus/>
      <FormControl variant="filled" fullWidth>
        <InputLabel id="add-field-select-label">Field Type</InputLabel>
        <Select
          labelId="add-field-select-label"
          id="add-field-select"
          value={selectedType}
          onChange={(event: any) => setSelectedType(event.target.value)}
        >
          {fieldTypes.map((type, index) => (
            <MenuItem key={index} value={type.toUpperCase()}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </DialogModal>
  );
};

export default AddFieldModal;