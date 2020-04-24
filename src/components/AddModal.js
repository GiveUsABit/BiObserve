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
import { useAuth0 } from "../react-auth0-spa";
import Geocode from "react-geocode"


export const AddModal = ({ isActive, onModalClose }) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [descriptionText, setDescriptionText] = useState("")
  const [addressText, setAddressText] = useState("")
  const [dropdownSelect, setDropdownSelect] = useState("Species");
  const [dropdownActive, setDropdownActive] = useState(false);
  const { getTokenSilently } = useAuth0();
  Geocode.setApiKey("AIzaSyC_7ny4fdtQvuASHh2rPFDXVnZ8sv8N95I");
  Geocode.setLanguage("en");
  
  const getCoordinates = async ({addressText}) => {
    const data = await Geocode.fromAddress({addressText})
    const { lat, lng } = data.results[0].geometry.location;
    return [lat, lng]
  }
  const submitPost = async () => {

    const [latitude, longitude] = await getCoordinates(addressText)
    const postBody = {
      address: addressText,
      description: descriptionText,
      species: dropdownSelect,
      time: selectedDate,
      latitude,
      longitude
    }
    const token = await getTokenSilently();
    const body = await (await fetch('https://biobserve.herokuapp.com/v1/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({query: `
      mutation($address: String, $description: String, $species: String, $time: timestamptz, $latitude: Float, $longitude: Float ) {
        insert_posts(objects: [{address: $address, description: $description, species: $species, time: $time, latitude: $latitude, longitude: $longitude}]) {
          affected_rows
          returning {
            address
            description
            species
            time
            latitude
            longitude
          }
        }
      }
      `, variables: {...postBody}}),
      })).json();
      if (body.errors) {
        console.error(body.errors[0].message)
      } else {
        console.log(body.data);
      }
      onModalClose(true)
  }
  
  const submitHandler = e => submitPost()

  return (
    <Modal isActive={isActive}>
      <ModalBackground />
      <ModalCard>
      <ModalCardHeader>
            <ModalCardTitle>New Sighting</ModalCardTitle>
        </ModalCardHeader>
        <ModalCardBody>
        <Label>Species</Label>
            <Dropdown isActive = {dropdownActive}>
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
                          setDropdownActive(false)
                        }}
                        >
                        Flora
                        </DropdownItem>
                        <DropdownItem href="#"
                        onClick={e => {
                          setDropdownSelect("Fauna")
                          setDropdownActive(false)
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
            <Button isColor='success'
            onClick={submitHandler}
            >Save</Button>
            <Button isColor='warning' onClick={onModalClose}>Cancel</Button>
        </ModalCardFooter>
      </ModalCard>
    </Modal>
  );
};
