// ** React Import
import { useState, useEffect } from "react"
import InputPasswordToggle from "@components/input-password-toggle"
import { useDispatch, useSelector } from "react-redux"

// ** Custom Components
import Sidebar from "@components/sidebar"

import Select from "react-select"
import Uppy from "@uppy/core"
const XHRUpload = require("@uppy/xhr-upload")

import { DragDrop } from "@uppy/react"

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
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Col,
  Row
} from "reactstrap"
import { useForm, Controller } from "react-hook-form"

// ** Store & Actions
import {
  addItem,
  addImage,
  udpateItem,
  getAllTypes,
  getAllStatuses,
  getAllCountries,
  getAllFormats,
  getAllBookAgreements,
  getAllApplication,
  getAllProvidersBooks
} from "../store/action"

const SidebarNewItems = ({ open, toggleSidebar }) => {
  // ** States
  const dispatch = useDispatch()

  const store = useSelector((state) => state.books)

  const baseUrl = "http://localhost:3000/api/"

  const [name, setName] = useState("")

  const [sigla, setSigla] = useState("")

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [startDateDefault, setStartDateDefault] = useState(new Date())
  const [endDateDefault, setEndDateDefault] = useState(new Date())
  const [selectedCountry, setSelectedCountry] = useState("1")
  const [country, setCountry] = useState("1")
  const [format, setFormat] = useState("1")
  const [selectedFormat, setSelectedFormat] = useState("1")
   const [price, setPrice] = useState(null)
   const [title, setTitle] = useState(null)
  const [edition, setEdition] = useState(null)
  const [pages, setPages] = useState(null)
  const [publication, setPublication] = useState(null)
  const [version, setVersion] = useState(null)
  const [url, setUrl] = useState(null)


  const [agreements, setAgreements] = useState("1")
  const [selectedAgreements, setSelectedAgreements] = useState("1")


  const [provider, setProvider] = useState("1")
  const [selectedProvider, setSelectedProvider] = useState("1")

  const [application, setApplication] = useState("1")
  const [selectedApplications, setSelectedApplications] = useState("1")

  const [id, setId] = useState(0)

  const [contactForm, setContactForm] = useState(null)
  const [address, setAddress] = useState(null)
  const [city, setCity] = useState(null)
  const [phone, setPhone] = useState(null)
  const [email, setEmail] = useState(null)
  const [author, setAuthor] = useState(null)
  const [isbn, setIsbn] = useState(null)

  const { register, errors, handleSubmit, control, trigger } = useForm({
    defaultValues: { dob: new Date() }
  })

  const getCountry = (val) => {
    if (val.length > 3) {
      dispatch(
        getAllCountries({
          q: val
        })
      )
    }
  }

  const selectCountry = (val) => {
    getCountry(val)
  }

   const selectedItemApplication = (val) => {
    setSelectedApplications(val)
    setApplication(val)
  }

  const selectedItemCountry = (val) => {
    setSelectedApplications(val)
    setCountry(val)
  }

  
  const selecteditemProvider = (val) => {
    setSelectedProvider(val)
    setProvider(val)
  }

  const selectedAgreement = (val) => {
    setSelectedAgreements(val)
    setAgreements(val)
  }

  const selectedItemFormat = (val) => {
    setSelectedFormat(val)
    setFormat(val)
  }

    useEffect(() => {
      console.log("aquiii esta pasando algo ", store.formats)
  }, [dispatch, store.formats])
  
  useEffect(() => {
    dispatch(getAllFormats())
    dispatch(getAllBookAgreements())
    dispatch(getAllApplication())
    dispatch(getAllProvidersBooks())

    
    if (!!store.rowData._id) {
      setId(store.rowData._id)
      setTitle(store.rowData.title)
      setPrice(store.rowData.price)
      setEdition(store.rowData.edition)
      setPages(store.rowData.pages)
      setPublication(store.rowData.publication)
      setVersion(store.rowData.version)
      setUrl(store.rowData.web)
      setIsbn(store.rowData.isbn)
      setAuthor(store.rowData.author)


      if (!!store.rowData.format) {
        setFormat({
          value: store.rowData.format._id,
          label: store.rowData.format.name,
          id: store.rowData.format._id
        })
      }

       if (!!store.rowData.aplication) {
        setApplication({
          value: store.rowData.aplication._id,
          label: store.rowData.aplication.name,
          id: store.rowData.aplication._id
        })
      }
      
       if (!!store.rowData.bookAgreement) {
        setAgreements({
          value: store.rowData.bookAgreement._id,
          label: store.rowData.bookAgreement.name,
          id: store.rowData.bookAgreement._id
        })
      }

         if (!!store.rowData.providersBook) {
        setProvider({
          value: store.rowData.providersBook._id,
          label: store.rowData.providersBook.name,
          id: store.rowData.providersBook._id
        })
      }
 
 //    setProvider(store.rowData.providersBook)
      console.log("aquii esta el libro  ", store.rowData)

      
    } else {
      setId(0)
      setId(null)
      setTitle(null)
      setPrice(null)
      setEdition(null)
      setPages(null)
      setPublication(null)
      setVersion(null)
      setUrl(null)
      setIsbn(null)
      setFormat(null)
      setApplication(null)
      setAgreements(null)
      setProvider(null)
            setAuthor(store.rowData.author)

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
  const onSubmit = (values) => {
    values["format"] = format._id
    values["aplication"] = application._id
    values["bookAgreement"] = agreements._id
    values["providersBook"] = provider._id

    values["active"] = true

    toggleSidebar()

    if (!id) {
          values["id"] = 0

          console.log(values, "aquiii esta agregando")

      dispatch(addItem(values))
    } else {
          values["id"] = id

          console.log(values, "aquiii esta actualizando")

      dispatch(udpateItem(values))
    }
  }
  //// falta fecha genero  pais curriculum
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
                Proveedor <span className="text-danger">*</span>
              </Label>
              <Select
                isClearable
                value={provider}
                options={store.providers}
          
                onChange={selecteditemProvider}
                name="provider"
                id="provider"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["provider"] })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup className="mb-2">
              <Label for="author">
                Autor <span className="text-danger">*</span>
              </Label>
              <Input
                name="author"
                id="author"
                defaultValue={author}
                placeholder="Ingresar Autor"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["author"] })}
              />
            </FormGroup>
          </Col>{" "}
        </Row>

         <Row>
          <Col>
            <FormGroup className="mb-2">
              <Label for="title">
                Título <span className="text-danger">*</span>
              </Label>
              <Input
                name="title"
                id="title"
                defaultValue={title}
                placeholder="Ingresar título"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["title"] })}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
           <FormGroup>
          <Label for="price">
            Costo <span className="text-danger">*</span>
          </Label>
          <Input
            name="price"
            id="price"
            defaultValue={price}
            placeholder="Ingresar el costo"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["price"] })}
          />
        </FormGroup>
          </Col>
       </Row>

        <Row>
          <Col>
            <FormGroup>
              <Label for="edition">
                Edición: <span className="text-danger">*</span>
              </Label>
              <Input
                name="edition"
                id="edition"
                defaultValue={edition}
                placeholder="Ingresar la edición"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["edition"] })}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="isbn">
                ISBN: <span className="text-danger">*</span>
              </Label>
              <Input
                name="isbn"
                id="isbn"
                defaultValue={isbn}
                placeholder="Ingresar el isbn"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["isbn"] })}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="pages">
                Cant. Páginas: <span className="text-danger">*</span>
              </Label>
              <Input
                name="pages"
                id="pages"
                autoComplete={0}
                defaultValue={pages}
                type="number"
                placeholder="Ingresar la versión"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["pages"] })}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs="12" lg="6" md="6">
            <FormGroup>
              <Label for="publication">
                Fecha de Publicación: <span className="text-danger">*</span>
              </Label>
              <Input
                name="publication"
                id="publication"
                defaultValue={publication}
                placeholder="Ingresar la fecha de publicación"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["publication"] })}
              />
            </FormGroup>
          </Col>
          <Col xs="12" lg="6" md="6">
            <FormGroup>
              <Label for="version">
                Versión: <span className="text-danger">*</span>
              </Label>

             <Input
                name="version"
                id="version"
                defaultValue={version}
                placeholder="Ingresar versión"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["version"] })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="full-name">
                Formato  <span className="text-danger">*</span>
              </Label>
              <Select
                isClearable
                value={format}
                options={store.formats}
             
                onChange={selectedItemFormat}
                name="country"
                id="country"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["country"] })}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <Label for="full-name">
                Aplicación <span className="text-danger">*</span>
              </Label>
              <Select
                isClearable
                value={application}
                options={store.applications}
                 onChange={selectedItemApplication}
                name="application"
                id="application"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["country"] })}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="full-name">
                Convenio <span className="text-danger">*</span>
              </Label>
              <Select
                isClearable
                value={agreements} 
                options={store.agreements}
                onChange={selectedAgreement}
                name="agreements"
                id="agreements"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["agreements"] })}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <FormGroup>
              <Label for="full-name">URL</Label>
              <Input
                name="web"
                id="web"
                autoComplete={0}
                defaultValue={url}
                type="url"
                placeholder="Ingresar la url"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["url"] })}
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
