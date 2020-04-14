import React, { useState} from "react";
import {
  Modal,
  ModalBackground,
  ModalCardTitle,
  ModalCard,
  ModalCardHeader,
  ModalCardFooter,
  ModalCardBody,
  Button,
  Field,
  Label,
  Control,
  Input,
  TextArea,
  Icon
} from "bloomer";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Dropdown } from "bloomer/lib/components/Dropdown/Dropdown";
import { DropdownTrigger } from "bloomer/lib/components/Dropdown/DropdownTrigger";
import { BlackIcon } from "../helpers/black_icon";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { DropdownMenu } from "bloomer/lib/components/Dropdown/Menu/DropdownMenu";
import { DropdownContent } from "bloomer/lib/components/Dropdown/Menu/DropdownContent";
import { DropdownItem } from "bloomer/lib/components/Dropdown/Menu/DropdownItem";

export const AddModal = ({ isActive, onModalClose }) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [titleText, setTitleText] = useState("");
  const [descriptionText, setDescriptionText] = useState("")
  const [addressText, setAddressText] = useState("")
  const [dropdownSelect, setDropdownSelect] = useState("Species");

  return (
    <Modal isActive={isActive}>
      <ModalBackground />
      <ModalCard>
      <ModalCardHeader>
            <ModalCardTitle>New Sighting</ModalCardTitle>
        </ModalCardHeader>
        <ModalCardBody>
        <Label>Species</Label>
            <Dropdown isActive>
                <DropdownTrigger>
                    <Button isOutlined aria-haspopup="true" aria-controls="dropdown-menu">
                        <span>{dropdownSelect}</span>
                        <BlackIcon icon={faChevronDown}/>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownContent>
                        <DropdownItem href="#" 
                        onClick={e => setDropdownSelect("Bird")}
                        >
                        Bird
                        </DropdownItem>
                        <DropdownItem href="#"
                        onClick={e => setDropdownSelect("Reptile")}
                        >
                        Reptile
                        </DropdownItem>
                    </DropdownContent>
                </DropdownMenu>
            </Dropdown>
            <Field>
              <Label>Description</Label>
              <Control>
                <TextArea placeholder={'Describe the event'}
                  value={descriptionText}
                  onChange={event => setDescriptionText(event.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Label>Address</Label>
              <Control>
                <Input type="text" placeholder="Input an Accurate Address"
                  value={addressText}
                  onChange={event => setAddressText(event.target.value)}
                />
              </Control>
            </Field>
            <Field>
              <Label>Time & Date</Label>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker inputVariant="outlined" value={selectedDate} onChange={handleDateChange} />
              </MuiPickersUtilsProvider>            
            </Field>
        </ModalCardBody>
        <ModalCardFooter>
            <Button isColor='success'>Save</Button>
            <Button isColor='warning' onClick={onModalClose}>Cancel</Button>
        </ModalCardFooter>
      </ModalCard>
    </Modal>
  );
};
