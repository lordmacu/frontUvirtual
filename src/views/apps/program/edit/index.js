// ** React Imports
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Paperclip, ExternalLink } from "react-feather"

// ** Store & Actions
import { useSelector, useDispatch } from "react-redux"
import { getBase64, gotoFile, getImageUser } from "@utils"

import Select from "react-select"
import Uppy from "@uppy/core"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
const MySwal = withReactContent(Swal)
const XHRUpload = require("@uppy/xhr-upload")
import SunEditor from "suneditor-react"
import "suneditor/dist/css/suneditor.min.css"
import VersionItem from "./VersionItem"
// ** Utils
import "@styles/react/libs/flatpickr/flatpickr.scss"

// ** Third Party Components
import classnames from "classnames"
import {
  Button,
  FormGroup,
  Label,
  Card,
  CardBody,
  Form,
  Input,
  Nav,
  NavItem,
  NavLink,
  ListGroup,
  TabContent,
  ListGroupItem,
  Badge,
  TabPane,
  Alert,
  Col,
  Row
} from "reactstrap"
import { useForm, Controller } from "react-hook-form"

// ** Store & Actions
import {
  addItem,
  addImage,
  udpateItem,
  getAllAggrements,
  getALlPeople,
  getItem,
  getAllVersions,
  addVersion
} from "../store/action"

// ** Styles
import "@styles/react/apps/app-general.scss"
import { getAllCoordinadores, getAllDirectores } from "../../people/store/action"

const ItemEdit = (props) => {
  // ** States & Vars

  const store = useSelector((state) => state.programs)
  const directores = useSelector((state) => state.people.directores)
  const coordinadores = useSelector((state) => state.people.coordinadores)
  const stores = useSelector((state) => state.programs)
  const { id } = useParams()
  const dispatch = useDispatch()
  //  const { id } = useParams()

  const baseUrl = "http://localhost:3000/api/"

  //Fields Programs
  const [sigla, setSigla] = useState("")
  const [name, setName] = useState("")
  const [directorAcad, setdirectorAcad] = useState(null)
  const [coordinatorAcad, setCoordinatorAcad] = useState(null)
  const [price, setPrice] = useState(0)
  const [numberCredits, setNumberCredits] = useState(0)
  const [approvalNote, setApprovalNote] = useState(0)
  const [nroSubjects, setNroSubjects] = useState(0)
  const [agreement, setAgreement] = useState(null)
  const [reglamento, setReglamento] = useState("")
  const [brochure, setBrochure] = useState([])
  const [presupuesto, setPresupuesto] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [studentProfile, setStudentProfile] = useState("")
  const [observations, setObservations] = useState("")

  const [activeTab, setActiveTab] = useState(1)

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const [period, setPeriod] = useState(0)
  const [year, setYear] = useState(0)

  const [versions, setVersions] = useState([])

  const { register, errors, handleSubmit, control, trigger } = useForm({
    defaultValues: { dob: new Date() }
  })

  //
  const [optionDirector, setOptionDirector] = useState()
  const [optionCoordinador, setOptionCoordinador] = useState()

  useEffect(() => {
    setVersions(store.versions)
  }, [dispatch, store.versions])

  //Load Select Directores
  const loadSelectDirectores = () => { 
    const optionDirectores = []
    directores.map((director) => {
      optionDirectores.push({ value: director._id, label: `${director.name} ${director.lastName}`, _id: director._id })
    })
    setOptionDirector(optionDirectores)
  }

  //Load Select Coordinadores
  const loadSelectCoordinadores = () => { 
    const optionCoordinadores = []
    coordinadores.map((coordinador) => {
      optionCoordinadores.push({ value: coordinador._id, label: `${coordinador.name} ${coordinador.lastName}`, _id: coordinador._id })
    })
    setOptionCoordinador(optionCoordinadores)
  }

  useEffect(() => {
    //dispatch(getItem(id))

    if (!!store.selectedItem) {

      if (directores.length === 0 || coordinadores.length === 0) {
        dispatch(getAllCoordinadores())
        dispatch(getAllDirectores())
      } else {
          loadSelectDirectores()
          loadSelectCoordinadores()
      }

      dispatch(getAllVersions(id))

      // setId(store.selectedItem._id)
      setName(store.selectedItem.name)
      setSigla(store.selectedItem.sigla)

      if (!!store.selectedItem.directorAcad) {
        setdirectorAcad({
          value: store.selectedItem.directorAcad._id,
          label: store.selectedItem.directorAcad.name,
          _id: store.selectedItem.directorAcad._id
        })
      }
      if (!!store.selectedItem.coordinatorAcad) {
        setCoordinatorAcad({
          value: store.selectedItem.coordinatorAcad._id,
          label: store.selectedItem.coordinatorAcad.name,
          _id: store.selectedItem.coordinatorAcad._id
        })
      }

      if (!!store.selectedItem.agreement) {
        setAgreement({
          value: store.selectedItem.agreement.id,
          label: store.selectedItem.agreement.name,
          _id: store.selectedItem.agreement._id
        })
      }
      setPrice(store.selectedItem.price)
      setNumberCredits(store.selectedItem.numberCredits)
      setApprovalNote(store.selectedItem.approvalNote)
      setNroSubjects(store.selectedItem.nroSubjects)
      setReglamento(store.selectedItem.reglamento)
      setBrochure(store.selectedItem.brochure)
      setPresupuesto(store.selectedItem.presupuesto)
      setTitle(store.selectedItem.title)
      setDescription(store.selectedItem.description)
      setStudentProfile(store.selectedItem.studentProfile)
      setObservations(store.selectedItem.observation)

      setStartDate(store.selectedItem.startDate)
      setEndDate(store.selectedItem.endDate)
      setPeriod(store.selectedItem.period)
      setYear(store.selectedItem.year)
    } else {
      setSigla("")
      setName("")
      setdirectorAcad("")
      setCoordinatorAcad("")
      setStartDate(new Date())
      setEndDate(new Date())
      setPrice(0)
      setNumberCredits(0)
      setNroSubjects(0)
      setPeriod("")
      setYear("")
      setDescription("")
      setStudentProfile("")
      setTitle("")
      setApprovalNote()
      setObservations("")
      setReglamento("")
      setBrochure("")
      setPresupuesto("")
    }

    dispatch(
        getAllAggrements({
          q: ""
        })
      )
  }, [dispatch, store.selectedItem])

  // ** Store Vars

  const titlePanel = (val) => {
    if (id === 0) {
      return "Agregar programa"
    } else {
      return "Editar programaa"
    }
  }
  const openImage = (val) => {
    window.open(getImageUser(userImage))
  }

  const addVersionMethod = (val) => {
    dispatch(
      addVersion({
        id
      })
    )
  }

  const getAggrement = (val) => {
    if (val.length > 3) {
      dispatch(
        getAllAggrements({
          q: val
        })
      )
    }
  }

  const selectAggrement = (val) => {
    getAggrement(val)
  }

  const selectedItemAggrement = (val) => {
    setAgreement(val)
  }

  const getUsers = (val) => {
    if (val.length > 3) {
      dispatch(
        getALlPeople({
          q: val
        })
      )
    }
  }

  const selectUser = (val) => {
    getUsers(val)
  }

  const selectedItemDirectorAcad = (val) => {
    setdirectorAcad(val)
  }
  const selectedItemCoordinatorAcad = (val) => {

    setCoordinatorAcad(val)
  }

  const checkDisabled = () => {
    let disabled = false

    if (agreement === null) {
      disabled = true
    }

    return disabled
  }

  const toggle = (values) => {
    setActiveTab(values)
  }
  // ** Vars

  // ** Function to handle form submit
  const onSubmit = (values) => {
    values["name"] = name
    values["sigla"] = sigla
    values["directorAcad"] = directorAcad._id
    values["coordinatorAcad"] = coordinatorAcad._id
    values["price"] = price
    values["numberCredits"] = numberCredits
    values["approvalNote"] = approvalNote
    values["nroSubjects"] = nroSubjects
    values["agreement"] = agreement._id
    values["reglamento"] = reglamento
    values["brochure"] = brochure
    values["presupuesto"] = presupuesto
    values["title"] = title
    values["description"] = description
    values["studentProfile"] = studentProfile
    values["observation"] = observations
    values["id"] = id
    if (id === 0) {
      dispatch(addItem(values))
    } else {
      dispatch(udpateItem(values, props))
    }
  }


  const onSubmitReglamento = (e) => {
    getBase64(e.target.files[0]).then((data) => setReglamento({ file: data }))
  }

   const onSubmitBrochure = (e) => {
    getBase64(e.target.files[0]).then((data) => setBrochure({ file: data }))
  }

   const onSubmitPresupuesto = (e) => {
    getBase64(e.target.files[0]).then((data) => setPresupuesto({ file: data }))
  }
  
  //Handles
  const handleInputName = (e) => { 
    setName(e.target.value)
  }

  const handleInputSigla = (e) => { 
    setSigla(e.target.value)
  }

  const handleInputPrice = (e) => {
    setPrice(e.target.value)
  }
  
  const handleInputNumberCredits = (e) => {
    setNumberCredits(e.target.value)
  }

  const handleInputApprovalNote = (e) => { 
    setApprovalNote(e.target.value)
  }

  const handleInputNroSubjects = (e) => { 
    setNroSubjects(e.target.value)
  }

  const handleInputTitle = (e) => { 
    setTitle(e.target.value)
  }

  const handleInputDescription = (e) => { 
    setDescription(e.target.value)
  }

  const handleInputStudentProfile = (e) => { 
    setStudentProfile(e.target.value)
  }

  const handleInputObservations = (e) => { 
    setObservations(e.target.value)
  }

 
  // ** Function to toggle tabs

  // ** Function to get user on mount
  useEffect(() => {
    setActiveTab("1")
    setVersions([])
    setVersions((versions) => versions.concat({ name: "version", index: 1 }))
    setVersions((versions) => versions.concat({ name: "version", index: 2 }))
    setVersions((versions) => versions.concat({ name: "version", index: 3 }))
    dispatch(getItem(id))
  }, [dispatch])
  return stores.selectedItem !== null && stores.selectedItem !== undefined ? (
    <Row className="app-user-edit">
      <Col sm="12">
        <Card>
          <CardBody className="pt-2">
            <Nav pills>
              <NavItem>
                <NavLink active={activeTab === "1"} onClick={() => toggle("1")}>
                  <span className="align-middle d-none d-sm-block">
                    Información
                  </span>
                </NavLink>
              </NavItem>
              <NavLink active={activeTab === "2"} onClick={() => toggle("2")}>
                <span className="align-middle d-none d-sm-block">
                  Versiones
                </span>
              </NavLink>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Card>
                  <CardBody>
                    <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                      <Row>
                      <Col md='3' sm='12'>
                          <FormGroup>
                            <Label for="sigla">
                              Sigla <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="sigla"
                              id="sigla"
                              onChange={handleInputSigla}
                              autoComplete={0}
                              defaultValue={sigla}
                              placeholder="Ingresar la sigla del programa"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["sigla"]
                              })}
                            />
                          </FormGroup>
                        </Col>
                        <Col md='9' sm='12'>
                          <FormGroup>
                            <Label for="name">
                              Nombre <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="name"
                              id="name"
                              autoComplete={0}
                              onChange={handleInputName}
                              defaultValue={name}
                              placeholder="Ingresar el nombre del programa"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["name"]
                              })}
                            />
                          </FormGroup>
                        </Col>

                        </Row>
                      <Row>
                        <Col md='4' sm='4'>
                          <FormGroup>
                            <Label for="directorAcad">Director Acad:</Label>
                            <Select
                              isClearable
                              value={directorAcad}
                              options={ directores && optionDirector }
                              //onInputChange={selectUser}
                              onChange={selectedItemDirectorAcad}
                              name="directorAcad"
                              id="directorAcad"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["directorAcad"]
                              })}
                            />
                          </FormGroup>
                        </Col>
                        <Col md='4' sm='4'>
                          <FormGroup>
                            <Label for="coordinatorAcad">
                              Coordinador Acad:
                            </Label>
                            <Select
                              isClearable
                              value={coordinatorAcad}
                              options={ coordinadores && optionCoordinador}
                              //onInputChange={selectUser}
                              onChange={selectedItemCoordinatorAcad}
                              name="coordinatorAcad"
                              id="coordinatorAcad"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["coordinatorAcad"]
                              })}
                            />
                          </FormGroup>
                        </Col>

                        <Col md='4' sm='4'>
                          <FormGroup>
                            <Label for="directorAcad">Universidad</Label>
                            <Select
                              isClearable
                              value={agreement}
                              options={store.aggrements}
                              onInputChange={selectUser}
                              onChange={selectedItemAggrement}
                              name="directorAcad"
                              id="directorAcad"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["agreement"]
                              })}
                            />
                          </FormGroup>
                        </Col>
                        
                      </Row>

                      <Row>
                        <Col md='3' sm='3'>
                          <FormGroup>
                            <Label for="approvalNote">Nota de aprobación</Label>
                            <Input
                              name="approvalNote"
                              id="approvalNote"
                              autoComplete={0}
                              onChange={handleInputApprovalNote}
                              defaultValue={approvalNote}
                              value={approvalNote}
                              placeholder="Ingresar nota de aprobación"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["approvalNote"]
                              })}
                            />
                          </FormGroup>
                        </Col>
                        <Col md='3' sm='3'>
                          <FormGroup>
                            <Label for="nroSubjects">Nro. de asignaturas</Label>
                            <Input
                              name="nroSubjects"
                              id="nroSubjects"
                              onChange={handleInputNroSubjects}
                              autoComplete={0}
                              defaultValue={nroSubjects}
                              value={nroSubjects}
                              placeholder="Ingresar número de créditos"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["nroSubjects"]
                              })}
                            />
                          </FormGroup>
                        </Col>

                        <Col md='3' sm='3'>
                          <FormGroup>
                            <Label for="price">
                              Precio Total:
                              <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="price"
                              id="price"
                              onChange={handleInputPrice}
                              autoComplete={0}
                              defaultValue={price}
                              value={price}
                              placeholder="Ingresar el precio"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["price"]
                              })}
                            />
                          </FormGroup>
                        </Col>
                        <Col md='3' sm='3'>
                          <FormGroup>
                            <Label for="numberCredits">
                              Nro. Créditos:
                              <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="numberCredits"
                              id="numberCredits"
                              onChange={handleInputNumberCredits}
                              autoComplete={0}
                              defaultValue={numberCredits}
                              value={numberCredits}
                              placeholder="Ingresar el número de créditos"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["numberCredits"]
                              })}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                      <Col className="p-2" md='4' sm='12'>
                          <Button.Ripple
                            tag="label"
                            className="mr-50 cursor-pointer"
                            color="primary"
                            outline
                            onChange={onSubmitReglamento}
                          >
                            Reglamento
                            <Input
                              type="file"
                              name="file"
                              id="uploadImg"
                              hidden
                            />
                          </Button.Ripple>
                          {reglamento && (
                            <Button.Ripple
                              onClick={() => {
                                gotoFile(reglamento)
                              }}
                              tag="label"
                              className="mr-50 cursor-pointer"
                              color="primary"
                              outline
                            >
                              <ExternalLink size={14} />
                            </Button.Ripple>
                          )}
                        </Col>
                        <Col className="p-2" md='4' sm='12'>
                          <Button.Ripple
                            tag="label"
                            className="mr-50 cursor-pointer"
                            color="primary"
                            outline
                             onChange={onSubmitBrochure}
                          >
                            Brochure
                            <Input
                              type="file"
                              name="file"
                              id="uploadImg"
                              hidden
                            />
                          </Button.Ripple>
                          {brochure && (
                            <Button.Ripple
                              onClick={() => {
                                gotoFile(brochure)
                              }}
                              tag="label"
                              className="mr-50 cursor-pointer"
                              color="primary"
                              outline
                            >
                              <ExternalLink size={14} />
                            </Button.Ripple>
                          )}
                        </Col>

                        <Col className="p-2" md='4' sm='12'>
                          <Button.Ripple
                            tag="label"
                            className="mr-50 cursor-pointer"
                            color="primary"
                            outline
                             onChange={onSubmitPresupuesto}
                          >
                            Presupuesto
                            <Input
                              type="file"
                              name="file"
                              id="uploadImg"
                              hidden
                            />
                          </Button.Ripple>
                          {presupuesto && (
                            <Button.Ripple
                              onClick={() => {
                                gotoFile(presupuesto)
                              }}
                              tag="label"
                              className="mr-50 cursor-pointer"
                              color="primary"
                              outline
                            >
                              <ExternalLink size={14} />
                            </Button.Ripple>
                          )}
                        </Col>

                      </Row>
                      <Row>
                        <Col md='12' sm='12'>
                          <FormGroup>
                          <Label for="title">
                            Titulación: <span className="text-danger">*</span>
                          </Label>

                          {title && (
                            <SunEditor
                              name="title"
                              setOptions={{
                                height: 300,
                                buttonList: [
                                  [
                                    "font",
                                    "align",
                                    "fontSize",
                                    "table",
                                    "textStyle",
                                    "align"
                                  ],
                                  ["image"]
                                ]
                              }}
                              id="title"
                              autoComplete={0}
                              defaultValue={title}
                              value={title}
                              placeholder="Ingresar el título"
                              innerRef={register({ required: true })}
                              onChange={setTitle}
                              className={classnames({
                                "is-invalid": errors["title"]
                              })}
                            />
                          )}

                          {!title && (
                            <SunEditor
                              setOptions={{
                                buttonList: [
                                  [
                                    "font",
                                    "align",
                                    "fontSize",
                                    "table",
                                    "textStyle",
                                    "align"
                                  ],
                                  ["image"]
                                ],
                                height: 300
                              }}
                              name="title"
                              id="title"
                              autoComplete={0}
                              defaultValue={""}
                              placeholder="Ingresar el título"
                              innerRef={register({ required: true })}
                              onChange={setTitle}
                              className={classnames({
                                "is-invalid": errors["title"]
                              })}
                            />
                          )}
                        </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md='12' sm='12'>
                          <FormGroup>
                          <Label for="description">
                            Descripción <span className="text-danger">*</span>
                          </Label>

                          {description && (
                            <SunEditor
                              setOptions={{
                                height: 300,
                                buttonList: [
                                  [
                                    "font",
                                    "align",
                                    "fontSize",
                                    "table",
                                    "textStyle",
                                    "align"
                                  ],
                                  ["image"]
                                ]
                              }}
                              name="description"
                              id="description"
                              autoComplete={0}
                              defaultValue={description}
                              value={description}
                              placeholder="Ingresar la descripción"
                              innerRef={register({ required: true })}
                              onChange={setDescription}
                              className={classnames({
                                "is-invalid": errors["description"]
                              })}
                            />
                          )}

                          {!description && (
                            <SunEditor
                              setOptions={{
                                height: 300,
                                buttonList: [
                                  [
                                    "font",
                                    "align",
                                    "fontSize",
                                    "table",
                                    "textStyle",
                                    "align"
                                  ],
                                  ["image"]
                                ]
                              }}
                              name="description"
                              id="description"
                              autoComplete={0}
                              defaultValue={""}
                              placeholder="Ingresar la descripción"
                              innerRef={register({ required: true })}
                              onChange={setDescription}
                              className={classnames({
                                "is-invalid": errors["description"]
                              })}
                            />
                          )}
                          </FormGroup>
                        </Col>     
                      </Row>    

                      <Row>
                        <Col md='12' sm='12'>
                          <FormGroup>
                          <Label for="studentProfile">
                            Perfil Estudiante:{" "}
                            <span className="text-danger">*</span>
                          </Label>

                          {studentProfile && (
                            <SunEditor
                              setOptions={{
                                height: 300,
                                buttonList: [
                                  [
                                    "font",
                                    "align",
                                    "fontSize",
                                    "table",
                                    "textStyle",
                                    "align"
                                  ],
                                  ["image"]
                                ]
                              }}
                              name="studentProfile"
                              id="studentProfile"
                              autoComplete={0}
                              defaultValue={studentProfile}
                              value={studentProfile}
                              onChange={setStudentProfile}
                              type="textarea"
                              placeholder="Ingresar el perfil del estudiante"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["studentProfile"]
                              })}
                            />
                          )}

                          {!studentProfile && (
                            <SunEditor
                              setOptions={{
                                height: 300,
                                buttonList: [
                                  [
                                    "font",
                                    "align",
                                    "fontSize",
                                    "table",
                                    "textStyle",
                                    "align"
                                  ],
                                  ["image"]
                                ]
                              }}
                              name="studentProfile"
                              id="studentProfile"
                              autoComplete={0}
                              defaultValue={""}
                              onChange={setStudentProfile}
                              type="textarea"
                              placeholder="Ingresar el perfil del estudiante"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["studentProfile"]
                              })}
                            />
                          )}
                         </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md='12' sm='12'>
                          <FormGroup>
                          <Label for="observations">Observaciones</Label>

                          {observations && (
                            <SunEditor
                              setOptions={{
                                height: 300,
                                buttonList: [
                                  [
                                    "font",
                                    "align",
                                    "fontSize",
                                    "table",
                                    "textStyle",
                                    "align"
                                  ],
                                  ["image"]
                                ]
                              }}
                              name="observations"
                              id="observations"
                              autoComplete={0}
                              defaultValue={observations}
                              value={observations}
                              onChange={setObservations}
                              type="textarea"
                              placeholder="Ingresar observación"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["observations"]
                              })}
                            />
                          )}

                          {!observations && (
                            <SunEditor
                              setOptions={{
                                height: 300,
                                buttonList: [
                                  [
                                    "font",
                                    "align",
                                    "fontSize",
                                    "table",
                                    "textStyle",
                                    "align"
                                  ],
                                  ["image"]
                                ]
                              }}
                              name="observations"
                              id="observations"
                              autoComplete={0}
                              defaultValue={""}
                              onChange={setObservations}
                              type="textarea"
                              placeholder="Ingresar observaciones"
                              innerRef={register({ required: true })}
                              className={classnames({
                                "is-invalid": errors["observations"]
                              })}
                            />
                          )}
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
                          <Button type="reset" color="secondary" outline>
                            Cancelar
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="2">
                <Row className=" text-right">
                  <Col>
                    <Button
                      color="success"
                      className="mb-2"
                      onClick={() => {
                        addVersionMethod()
                      }}
                    >
                      Agregar Versión
                    </Button>
                  </Col>
                </Row>
                <ListGroup>
                  {versions.map((value, index) => {
                    return (
                      <VersionItem
                        item={value}
                        name={value.name}
                        index={index + 1}
                      />
                    )
                  })}
                </ListGroup>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Col>
    </Row>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">Item not found</h4>
      <div className="alert-body">
        El item con el id : {id} no existe, por favor buscalo en :{" "}
        <Link to="/apps/user/list">la lista de items</Link>
      </div>
    </Alert>
  )
}
export default ItemEdit
