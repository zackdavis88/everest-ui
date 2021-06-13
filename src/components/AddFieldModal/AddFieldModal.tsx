import React, { useState, useEffect } from "react";
import DialogModal from "../DialogModal/DialogModal";
import { useWidth } from "../../utils";
import { AddFieldModalProps } from "./AddFieldModal.props";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const AddFieldModal = (props: AddFieldModalProps) => {
  const breakpoint = useWidth();
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    return () => setSelectedType(""); // reset state value when the modal unmounts (closes).
  }, []);

  const fieldTypes = [
    "String",
    "Boolean",
    "Number",
    "Date",
    "Array",
    "Object"
  ];

  return (
    <DialogModal
      title="Add Blueprint Field"
      isOpen={props.isOpen}
      handleClose={props.handleClose}
      onSubmit={() => {
        props.handleClose();
        props.onSubmit(selectedType);
      }}
      maxWidth="sm"
      id="add-field-modal"
      fullscreen={breakpoint === "xs"}
      submitDisabled={!selectedType}
      autoFocus={false}
    >
      <FormControl variant="filled" fullWidth>
        <InputLabel id="add-field-select-label">Field Type</InputLabel>
        <Select
          autoFocus
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