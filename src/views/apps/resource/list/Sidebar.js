// ** React Import
import { useState, useEffect  } from "react"
import InputPasswordToggle from "@components/input-password-toggle"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

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
  udpateItem
} from "../store/action"


function getParameterByName(name) {
  const match = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search)
  const ma = match && decodeURIComponent(match[1].replace(/\+/g, ' '))
  return ma.trim()
}

const SidebarNewItems = ({ open, toggleSidebar }) => {
  // ** States
  const dispatch = useDispatch()
  const history = useHistory()

  const store = useSelector((state) => state.resources)

  const baseUrl = "http://localhost:3000/api/"
 

  const [formItems, setFormItems] = useState({})
  const [formItemsTemp, setFormItemsTemp] = useState({})
  const [id, setId] = useState(0)
  const [status, setStatus] = useState({ value: "false", label: 'Inactivo' })
  const [itemsFields, setItemsFields] = useState([])

  const { register, errors, handleSubmit, control, trigger } = useForm({
    defaultValues: { dob: new Date() }
  })

  const itemsSaved = {}

  const options = [
    { value: "false", label: 'Inactivo' },
    { value: "true", label: 'Activo' }
 
  ]

  useEffect(() => {


   // var dataForm = []
    
    if (!!store.rowData) {
      if (!!store.rowData._id) {
        setId(store.rowData._id)

        if (store.rowData.status) {
          setStatus({ value: "true", label: 'Activo' })

        } else {
          setStatus({ value: "false", label: 'Inactivo' })

        }
        
      }
    } else {
      setId(0)
    }
    
    const data = []
    
    for (const field in store.rowData) {
      data[field] = store.rowData[field]      
     }

    setFormItems(data)
    setFormItemsTemp(data)

  }, [dispatch, store.rowData])
 
  useEffect(() => {
     
  }, [dispatch, store.isEdit])

  useEffect(() => {
    const headerFieldsTemp = []

    for (const field in store.fields) {
      headerFieldsTemp.push({ name: field, type: store.fields[field]})
    }
    setItemsFields(headerFieldsTemp)

    console.log("aquiii estan los fielkds   ", store.fields)

  }, [dispatch, store.fields])

  // ** Store Vars

  const titlePanel = (val) => {
    if (id === 0) {
      return "Agregar"
    } else {
      return "Editar"
    }
  }

  const checkDisabled = () => {
    const disabled = false

    return disabled
  }

  // ** Vars

  // ** Function to handle form submit
  const onSubmit = (values) => {
    
    toggleSidebar()

    if (!id) {
      values["id"] = 0
      //dispatch(addItem(values))
    } else {
      formItems["id"] = id
      formItems["status"] = status.value
 
      dispatch(udpateItem(formItems, history, getParameterByName("resource")))
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
        {itemsFields.map(function (object, i) {

          let typeInput = null
 
          if (object.type === "String") {
            typeInput = "text"
          }

          if (object.type === "Number") {
            typeInput = "number"
          }

          if (object.type === "Boolean") {
            typeInput = "number"
          }

          return object.type !== "Boolean" ? <Row key={object.name}>
            <Col>
              <FormGroup className="mb-2">
               
                <Label for={object.name}>
                  {object.name}
                </Label>
                <Input
                   name={object.name}
                  id={object.name}
                  type={typeInput}
                  defaultValue={(formItems[object.name])}
                  onChange={(value) => {
                    formItems[object.name] = value.target.value
                  } } 
                   placeholder="Ingresar valor"
               
                />
              </FormGroup>
            </Col>
          </Row> : ""
        })}
        <Row>
          <Col>
        <FormGroup>
          <Label for="coordinatorAcad">Status:</Label>
          <Select
            isClearable
            value={status}
            options={options}
            onChange={(value) => {
              setStatus(value)
              
            }}

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
            <Button
              type="submit"
              className="mr-1"
              color="primary"
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
