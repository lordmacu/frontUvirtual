// ** React Import
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// ** Custom Components
import Sidebar from "@components/sidebar"

import Select from "react-select"

// ** Utils
import { getImageUser } from "@utils"
import Flatpickr from "react-flatpickr"
import "@styles/react/libs/flatpickr/flatpickr.scss"

// ** Third Party Components
import classnames from "classnames"
import {
  Button,
  FormGroup,
  Label,
  Form,
  Input,
  Col,
  Row
} from "reactstrap"
import { useForm } from "react-hook-form"

// ** Store & Actions
import {
  addItem,
  udpateItem,
  getAllCountriesSelect,
  getAllCitiesSelect,
  selectedCountryAdd,
  selectedCityLocal,
  selectedCityAdd,
  deleteSelectedCity,
  deleteSelectedCountry
} from "../store/action"

 const SidebarNewItems = ({ open, toggleSidebar }) => {
  // ** States
  const dispatch = useDispatch()

  const store = useSelector((state) => state.providers)

  const baseUrl = "http://localhost:3000/api/"

  const [name, setName] = useState("")

  const [id, setId] = useState(0)
  
  const [contactForm, setContactForm] = useState(null)
  const [address, setAddress] = useState(null)
  const [country, setCountry] = useState("1")
  const [city, setCity] = useState("1")
  const [phone, setPhone] = useState(null)
  const [email, setEmail] = useState(null)
  const [web, setWeb] = useState(null)

  const { register, errors, handleSubmit, control, trigger } = useForm({
    defaultValues: { dob: new Date() }
  })
  //Country

  const optionCitySelected = []

  const setCityHandle = (country) => {
      if (country) {
        const cities = store.cities
        cities.map((city) => {
          if (city.value === country.value) {
            optionCitySelected.push(city)
          }
        })
        dispatch(selectedCityLocal(optionCitySelected))
      }

  }

  const setCountrySelect = (e) => { 
    dispatch(selectedCountryAdd(e)) 
    setCountry(e)
    setCityHandle(e)
  }

  const handleChangeCountry = (e) => {
    setCountrySelect(e)
  }

  const handleChangeCity = (e) => {
    dispatch(selectedCityAdd(e)) 
    setCity(e)
  }

  //City
  useEffect(() => {
    if (!!store.rowData._id) {
      setId(store.rowData._id)
      setName(store.rowData.name)
      setContactForm(store.rowData.contactForm)
      setAddress(store.rowData.address)
      setCity(store.rowData.city)
      setPhone(store.rowData.phone)
      setEmail(store.rowData.email)
      setWeb(store.rowData.web)

      if (!!store.rowData.country) {

        const countries = store.countries
        countries.map((country) => {
            if (country.label === store.rowData.country.name) {
            const e = { value: store.rowData.country.codeCountry, label: store.rowData.country.name, _id: store.rowData.country._id }
            setCountrySelect(e)
            } 
        })
        
        const statusLocal = store.rowData.country
        statusLocal.label = statusLocal.name
        setCountry(statusLocal)
      }
      if (!!store.rowData.city) {
        
        const statusLocalCity = store.rowData.city
        statusLocalCity.label = statusLocalCity.name
        setCity(statusLocalCity)
      }
    } else {
      setName('')
      setContactForm('')
      setAddress('')
      setCity('')
      setPhone('')
      setEmail('')
      setWeb('')
      setCity('')
      setCountry('')
      dispatch(getAllCountriesSelect())
      dispatch(getAllCitiesSelect())
      dispatch(deleteSelectedCity())
      dispatch(deleteSelectedCountry())
      setId(0)
    }
  }, [dispatch, store.isEdit])

  // ** Store Vars

  const titlePanel = (val) => {
    if (id === 0) {
      return "Agregar proveedor"
    } else {
      return "Editar proveedor"
    }
  }

  const checkDisabled = () => {
    const disabled = false

    return disabled
  }

  // ** Vars

  // ** Function to handle form submit
  const onSubmit = (values, e) => {
    values["country"] = country._id
    values["city"] = city._id
    values["status"] = true
    values["idPlatform"] = store.rowData.idPlatform
    values["id"] = id
    //console.log(values)

   toggleSidebar()

    if (id === 0) {
      //console.log('Guardar')
      dispatch(addItem(values))
    } else {
      dispatch(udpateItem(values))
    }
  }

  return (
    <Sidebar
      size="lg"
      open={open}
      title={titlePanel()}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
    >
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Row>
          <Col>
            <FormGroup>
              <Label for="full-name">
                Nombre <span className="text-danger">*</span>
              </Label>
              <Input
                name="name"
                id="name"
                defaultValue={name}
                //onChange= { handleInputChange }
                placeholder="Ingresar el nombre"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["name"] })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup className="mb-2">
              <Label for="contactForm">Persona de contacto</Label>
              <Input
                name="contactForm"
                id="contactForm"
                //onChange= { handleInputChange }
                defaultValue={contactForm}
                placeholder="Ingresar la persona de contacto"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["contactForm"] })}
              />
            </FormGroup>
          </Col>{" "}
        </Row>

        <FormGroup>
          <Label for="address">
            Dirección <span className="text-danger">*</span>
          </Label>
          <Input
            name="address"
            id="address"
            type="textarea"
            autoComplete={0}
            //onChange= { handleInputChange }
            defaultValue={address}
            placeholder="Ingresar la dirección"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["address"] })}
          />
        </FormGroup>

        <Row>
          <Col>
          <FormGroup>
              <Label for="country">País: <span className="text-danger">*</span></Label>
              <Select
                name="country"
                id="country"
                isClearable
                value={country}
                options={store.countries}
                onChange={handleChangeCountry}
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["country"] })}
              />
            </FormGroup>
            
          </Col>
          <Col>
          <FormGroup>
              <Label for="city">Ciudad: <span className="text-danger">*</span></Label>
              <Select
                name="city"
                id="city"
                isClearable
                value={city}
                options={(store.selectedCityLocal) ? store.selectedCityLocal : store.cities}
                onChange={handleChangeCity}
                isDisabled = {!(store.selectedCountry)}
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["city"] })}
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label for="phone">
            Teléfono <span className="text-danger">*</span>
          </Label>
          <Input
            name="phone"
            id="phone"
            autoComplete={0}
            defaultValue={phone}
            //onChange= { handleInputChange }
            type="tel"
            placeholder="Ingresar el teléfono"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["phone"] })}
          />
        </FormGroup>

        <Row>
          <Col xs="12" lg="6" md="6">
            <FormGroup>
              <Label for="email">
                Email
              </Label>
              <Input
                name="email"
                id="email"
                autoComplete={0}
                defaultValue={email}
                //onChange= { handleInputChange }
                type="email"
                placeholder="Ingresar el email"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["email"] })}
              />
            </FormGroup>
          </Col>
          <Col xs="12" lg="6" md="6">
            <FormGroup>
              <Label for="web">Website: </Label>

              <Input
                name="web"
                id="web"
                autoComplete={0}
                defaultValue={web}
                //onChange= { handleInputChange }
                type="web"
                placeholder="Ingresar el website"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["web"] })}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button
              type="submit"
              className="mr-1"
              color="primary"
              disabled={checkDisabled()}
            >
              Guardar
            </Button>
            <Button
              type="reset"
              color="secondary"
              outline
              onClick={toggleSidebar}
            >
              Cancelar
            </Button>
          </Col>
        </Row>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewItems
