import React, { useState, Fragment } from "react";
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownContent
} from "bloomer";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { BlackIcon } from "../helpers/black_icon";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

export const EventModal = ({ isActive, onModalClose, data }) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [descriptionText, setDescriptionText] = useState(data.description)
  const [addressText, setAddressText] = useState(data.address)
  const [dropdownSelect, setDropdownSelect] = useState(data.species);
 

  return (
    <Modal isActive={isActive}>
      <ModalBackground />
      <ModalCard>
      <ModalCardHeader>
            <ModalCardTitle>{data.title}</ModalCardTitle>
            <Button isColor='danger'>Delete</Button>
        </ModalCardHeader>
        <ModalCardBody>
        <Label>Species</Label>
            <Dropdown >
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
            <Button isColor='warning' onClick={onModalClose}>Cancel</Button>
            <Button isColor='success' onClick={onModalClose}>Save</Button>
        </ModalCardFooter>
      </ModalCard>
    </Modal>
  );
};
