// ** React Import
import { useState, useEffect } from "react"
import InputPasswordToggle from "@components/input-password-toggle"
import { useDispatch, useSelector } from "react-redux"

// ** Custom Components
import Sidebar from "@components/sidebar"
import SunEditor from "suneditor-react"
import "suneditor/dist/css/suneditor.min.css"

import Select from "react-select"
import { Paperclip, ExternalLink } from "react-feather"

import Uppy from "@uppy/core"
const XHRUpload = require("@uppy/xhr-upload")

import { DragDrop } from "@uppy/react"

// ** Utils
import { getBase64, gotoFile, getImageUser } from "@utils"
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
  getAllAggrements,
  getALlPeople,
  addNewData,
  delNewData
} from "../store/action"
import { getAllCoordinadores, getAllDirectores } from "../../people/store/action"

const SidebarNewItems = ({ open, toggleSidebar }) => {
  // ** States
  const dispatch = useDispatch()

  const store = useSelector((state) => state.programs)
  const directores = useSelector(state => state.people.directores)
  const coordinadores = useSelector(state => state.people.coordinadores)
  const newData = useSelector(state => state.programs.newData)

  const baseUrl = "http://localhost:3000/api/"

  const [activeTab, setActiveTab] = useState("1")

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
    const [brochure, setBrochure] = useState("")
    const [presupuesto, setPresupuesto] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [studentProfile, setStudentProfile] = useState("")
    const [observations, setObservations] = useState("")

  // const [name, setName] = useState("")

  //   const [sigla, setSigla] = useState("")

  //   const [agreement, setAgreement] = useState(null)

  //   const [directorAcad, setdirectorAcad] = useState(null)
  //   const [coordinatorAcad, setCoordinatorAcad] = useState(null)
     const [startDate, setStartDate] = useState(new Date())
     const [endDate, setEndDate] = useState(new Date())
  //   const [reglamento, setReglamento] = useState("")
  //   const [brochure, setBrochure] = useState([])
  //   const [presupuesto, setPresupuesto] = useState([])

  const [startDateDefault, setStartDateDefault] = useState(new Date())
  const [endDateDefault, setEndDateDefault] = useState(new Date())

  //const [price, setPrice] = useState(0)
  const [period, setPeriod] = useState(0)
  const [year, setYear] = useState(0)
  const [id, setId] = useState(0)

 // const [description, setDescription] = useState("")
  //const [studentProfile, setStudentProfile] = useState("")
  //const [title, setTitle] = useState("")

  const { register, errors, handleSubmit, control, trigger } = useForm({
    defaultValues: { dob: new Date() }
  })

  const [optionDirector, setOptionDirector] = useState()
  const [optionCoordinador, setOptionCoordinador] = useState()

  let dataNew = {}
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
    // if (!!newData) {
    //   dispatch(addNewData(data))      // console.log('agrega')
    //   setId(store.rowData._id)
    //     setName(store.rowData.name)
    //     setSigla(store.rowData.sigla)
  
    //     if (!!store.rowData.agreement) {
    //       setAgreement({
    //         value: store.rowData.agreement.id,
    //         label: store.rowData.agreement.name,
    //         id: store.rowData.agreement._id
    //       })
    //     }
  
    //     if (!!store.rowData.directorAcad) {
    //       setdirectorAcad({
    //         value: store.rowData.directorAcad._id,
    //         label: store.rowData.directorAcad.name,
    //         id: store.rowData.directorAcad._id
    //       })
    //     }
    //     if (!!store.rowData.coordinatorAcad) {
    //       setCoordinatorAcad({
    //         value: store.rowData.coordinatorAcad._id,
    //         label: store.rowData.coordinatorAcad.name,
    //         id: store.rowData.coordinatorAcad._id
    //       })
    //     }

    //     setPrice(store.rowData.price)
    //     setNumberCredits(store.rowData.numberCredits)
    //     setApprovalNote(store.rowData.approvalNote)
    //     setNroSubjects(store.rowData.nroSubjects)
    //     setReglamento(store.rowData.reglamento)
    //     setBrochure(store.rowData.brochure)
    //     setPresupuesto(store.rowData.presupuesto)
    //     setTitle(store.rowData.title)
    //     setDescription(store.rowData.description)
    //     setStudentProfile(store.rowData.studentProfile)
    //     setObservations(store.rowData.observation)
  
    //   } else {
    //     console.log('LIMPIA')
    //     setSigla("")
    //     setName("")
    //     setdirectorAcad("")
    //     setCoordinatorAcad("")
    //     setStartDate(new Date())
    //     setEndDate(new Date())
    //     setPrice(0)
    //     setNumberCredits(0)
    //     setNroSubjects(0)
    //     setPeriod("")
    //     setYear("")
    //     setDescription("")
    //     setStudentProfile("")
    //     setTitle("")
    //     setApprovalNote()
    //     setObservations("")
    //     setReglamento("")
    //     setBrochure("")
    //     setPresupuesto("")
        
    //     if (directores.length === 0 || coordinadores.length === 0) {
    //       dispatch(getAllCoordinadores())
    //       dispatch(getAllDirectores())
    //     } else {
    //         loadSelectDirectores()
    //         loadSelectCoordinadores()
    //     }
    //   }

        if (directores.length === 0 || coordinadores.length === 0) {
          dispatch(getAllCoordinadores())
          dispatch(getAllDirectores())
        } else {
            loadSelectDirectores()
            loadSelectCoordinadores()
        }
  
      dispatch(
          getAllAggrements({
            q: ""
          })
        )
    

  }, [dispatch, store.isEdit])

  // ** Store Vars

  const titlePanel = (val) => {
    if (id === 0) {
      return "Agregar programa"
    } else {
      return "Editar programa"
    }
  }
  const openImage = (val) => {
    window.open(getImageUser(userImage))
  }

  const getAggrement = (val) => {
    if (val.length > 3) {
      
    }
  }

  const selectAggrement = (val) => {
    getAggrement(val)
  }

  const selectedItemAggrement = (val) => {
    //console.log(val)
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
  
  const onSubmitReglamento = (e) => {
    getBase64(e.target.files[0]).then((data) => setReglamento({ file: data }))
  }

   const onSubmitBrochure = (e) => {
    getBase64(e.target.files[0]).then((data) => setBrochure({ file: data }))
  }

   const onSubmitPresupuesto = (e) => {
    getBase64(e.target.files[0]).then((data) => setPresupuesto({ file: data }))
  }

  useEffect(() => {
    dataNew = {
      name,
      sigla,
      price,
      numberCredits,
      approvalNote,
      nroSubjects,
      title,
      description,
      studentProfile,
      observations,
      reglamento,
      brochure,
      presupuesto,
      agreement,
      directorAcad,
      coordinatorAcad
    }
    dispatch(addNewData(dataNew))
  }, [name, sigla, price, numberCredits, approvalNote, nroSubjects, title, description, studentProfile, observations, reglamento, brochure, presupuesto, agreement, directorAcad, coordinatorAcad])

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

  const handleInputDescription = (content) => { 
    setDescription(content)
  }

  const handleInputStudentProfile = (content) => { 
    setStudentProfile(content)
  }

  const handleInputObservations = (content) => { 
    setObservations(content)
  }

  const handleInputTitle = (content) => { 
    setTitle(content)
  }

  const checkDisabled = () => {
    let disabled = false

    if (agreement === null) {
      disabled = true
    }

    return disabled
  }

  // ** Toogle
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

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

    toggleSidebar()

    if (id === 0) {
      dispatch(addItem(values))
      dispatch(delNewData())
    } else {
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
      <Nav tabs className="nav-right">
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => {
                toggle("1")
              }}
            >
              Detalle del programa
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => {
                toggle("2")
              }}
            >
              Titulación{" "}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => {
                toggle("3")
              }}
            >
              Descripción
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "4" })}
              onClick={() => {
                toggle("4")
              }}
            >
              Perfil del estudiante
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "5" })}
              onClick={() => {
                toggle("5")
              }}
            >
              Observaciones
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "6" })}
              onClick={() => {
                toggle("6")
              }}
            >
              Adjuntos
            </NavLink>
          </NavItem>
        </Nav>
      <TabContent activeTab={activeTab} className="mt-2">
        <TabPane tabId="1">
        <Row>
          <Col>
            <FormGroup>
              <Label for="sigla">
                Sigla <span className="text-danger">*</span>
              </Label>
              <Input
                name="sigla"
                id="sigla"
                defaultValue={sigla}
                onChange={handleInputSigla}
                placeholder="Ingresar la sigla"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["sigla"] })}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup className="mb-2">
              <Label for="agreement">Universidad</Label>
              <Select
                isClearable
                value={agreement}
                options={store.aggrements}
                onChange={selectedItemAggrement}
                name="agreement"
                id="agreement"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["agreement"] })}
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label for="name">
            Nombre <span className="text-danger">*</span>
          </Label>
          <Input
            name="name"
            id="name"
            onChange={handleInputName}
            autoComplete={0}
            defaultValue={name}
            placeholder="Ingresar el nombre"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["name"] })}
          />
        </FormGroup>

        <Row>
        <Col>
            <FormGroup>
              <Label for="directorAcad">Director Acad:</Label>
              <Select
                isClearable
                value={directorAcad}
                options={directores && optionDirector}
                onInputChange={selectUser}
                onChange={selectedItemDirectorAcad}
                name="directorAcad"
                id="directorAcad"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["directorAcad"] })}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="coordinatorAcad">Coordinador Acad:</Label>
              <Select
                isClearable
                value={coordinatorAcad}
                options={coordinadores && optionCoordinador}
                onInputChange={selectUser}
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
           
        </Row>
        <Row>
        <Col>
            <FormGroup>
              <Label for="approvalNote">Nota de aprobación:</Label>
                 <Input
            name="approvalNote"
            id="approvalNote"
            onChange={handleInputApprovalNote}
            autoComplete={0}
            defaultValue={approvalNote}
            placeholder="Ingresar la nota de aprobación"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["approvalNote"] })}
          />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="nroSubjects">Nro. de asignaturas:</Label>
                 <Input
            name="nroSubjects"
            id="nroSubjects"
            onChange={handleInputNroSubjects}
            autoComplete={0}
            defaultValue={nroSubjects}
            placeholder="Ingresar número de materias"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["nroSubjects"] })}
          />
            </FormGroup>
          </Col>
        </Row>
        <Row>
        <Col>
            <FormGroup>
              <Label for="price">
                Precio: <span className="text-danger">*</span>
              </Label>
              <Input
                name="price"
                id="price"
                onChange={handleInputPrice}
                autoComplete={0}
                defaultValue={price}
                placeholder="Ingresar el precio"
                innerRef={register({ required: true })}
                className={classnames({ "is-invalid": errors["price"] })}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="numberCredits">Nro. Créditos:</Label>
                 <Input
            name="numberCredits"
            id="numberCredits"
            autoComplete={0}
            onChange={handleInputNumberCredits}
            defaultValue={numberCredits}
            placeholder="Ingresar número de créditos"
            innerRef={register({ required: true })}
            className={classnames({ "is-invalid": errors["numberCredits"] })}
          />
            </FormGroup>
          </Col>
        </Row>
        </TabPane>

        <TabPane tabId="2">
          <FormGroup>
            <Label for="title">
              Titulación: <span className="text-danger">*</span>
            </Label>
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
              name="title"
              id="title"
              autoComplete={0}
              onChange={handleInputTitle}
              defaultValue={title}
              placeholder="Ingresar la titulación"
              innerRef={register({ required: true })}
              className={classnames({ "is-invalid": errors["title"] })}
            />
          </FormGroup>
        </TabPane>

        <TabPane tabId="3">
          <FormGroup>
            <Label for="description">
              Descripción <span className="text-danger">*</span>
            </Label>
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
              onChange={handleInputDescription}
              autoComplete={0}
              defaultValue={description}
              type="textarea"
              placeholder="Ingresar la descripción"
              innerRef={register({ required: true })}
              className={classnames({ "is-invalid": errors["description"] })}
            />
          </FormGroup>
        </TabPane>

        <TabPane tabId="4">
          <FormGroup>
            <Label for="studentProfile">
              Perfil Estudiante: <span className="text-danger">*</span>
            </Label>
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
              onChange={handleInputStudentProfile}
              autoComplete={0}
              defaultValue={studentProfile}
              type="textarea"
              placeholder="Ingresar el perfil del estudiante"
              innerRef={register({ required: true })}
              className={classnames({ "is-invalid": errors["studentProfile"] })}
            />
          </FormGroup>
        </TabPane>

        <TabPane tabId="5">
          <FormGroup>
            <Label for="observation">
              Observaciones: <span className="text-danger">*</span>
            </Label>
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
              onChange={handleInputObservations}
              defaultValue={observations}
              type="textarea"
              placeholder="Ingresar observación"
              innerRef={register({ required: true })}
              className={classnames({ "is-invalid": errors["observations"] })}
            />
          </FormGroup>
        </TabPane>
          <TabPane tabId="6">
          <Row>
                      <Col className="p-2" md='12' sm='12'>
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
                        <Col className="p-2" md='12' sm='12'>
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

                        <Col className="p-2" md='12' sm='12'>
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
          </TabPane>
        </TabContent>
        
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
