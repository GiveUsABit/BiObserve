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
import { useAuth0 } from "../react-auth0-spa";

export const EventModal = ({ isActive, onModalClose, data }) => {
  const [selectedDate, handleDateChange] = useState(data.time);
  const [descriptionText, setDescriptionText] = useState(data.description)
  const [addressText, setAddressText] = useState(data.address)
  const [dropdownSelect, setDropdownSelect] = useState(data.species);
  const [dropdownActive, setDropdownActive] = useState(false);
  const { getTokenSilently } = useAuth0();

  const deletePost = async () => {
    const token = await getTokenSilently();
    const body = await (await fetch('https://biobserve.herokuapp.com/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({query: `
      mutation($id: Int) {
        delete_posts(where: {id: {_eq: $id}}) {
          affected_rows
          returning {
            id
          }
        }
      }
      `, variables: {id: data.id}}),
      })).json();
      if (body.errors) {
        console.error(body.errors[0].message)
      } else {
        console.log(body.data);
      }
      onModalClose(true)
  }
 
  const updatePost = async () => {
    const token = await getTokenSilently();
    const body = await (await fetch('https://biobserve.herokuapp.com/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({query: `
      mutation ($id: Int, $changes: posts_set_input) {
        update_posts(where: {id: {_eq: $id}}, _set: $changes) {
          affected_rows
          returning {
            id
            address
            description
            species
            time
          }
        }
      }
      `, variables: {id: data.id, changes: {address: addressText, description: descriptionText, species: dropdownSelect, time: selectedDate}}}),
      })).json();
      if (body.errors) {
        console.error(body.errors[0].message)
      } else {
        console.log(body.data);
      }
      onModalClose(true)
  }
  const deleteHandler = e => deletePost()
  const updateHandler = e => updatePost()

  return (
    <Modal isActive={isActive}>
      <ModalBackground />
      <ModalCard>
      <ModalCardHeader>
            <ModalCardTitle>{data.title}</ModalCardTitle>
            <Button isColor='danger'
              onClick={deleteHandler}
            >Delete</Button>
        </ModalCardHeader>
        <ModalCardBody>
        <Label>Species</Label>
            <Dropdown isActive={dropdownActive} >
                <DropdownTrigger>
                    <Button isOutlined aria-haspopup="true" aria-controls="dropdown-menu"
                    onClick = {e => setDropdownActive(!dropdownActive)}
                    >
                        <span>{dropdownSelect}</span>
                        <BlackIcon icon={faChevronDown}/>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownContent>
                        <DropdownItem href="#" 
                        onClick={e => {
                          setDropdownSelect("Flora")
                          setDropdownActive(!dropdownActive)
                        }}
                        >
                        Flora
                        </DropdownItem>
                        <DropdownItem href="#"
                        onClick={e => {
                          setDropdownSelect("Fauna")
                          setDropdownActive(!dropdownActive)
                        }}
                        >
                        Fauna
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
            <Button isColor='success' onClick={updateHandler}>Save</Button>
            <Button isColor='warning' onClick={onModalClose}>Cancel</Button>
        </ModalCardFooter>
      </ModalCard>
    </Modal>
  );
};
