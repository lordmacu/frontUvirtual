// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { getImageUser } from '@utils'
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

// ** Invoice List Sidebar
import Sidebar from './Sidebar'

// ** Columns
import { columns } from './columns'
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom"
// ** Store & Actions
import { getResource, setEditOn, getDataResource, getDataResourceById, deleteItem  } from '../store/action'
import { useDispatch, useSelector } from 'react-redux'

// ** Third Party Components
import ReactPaginate from 'react-paginate'
import { ChevronDown, Trash2 } from 'react-feather'
import DataTable from 'react-data-table-component'
import { Card, Input, Row, Col, Label, CustomInput, Button, Modal, ModalHeader, ModalBody, ModalFooter, Tr } from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { trim } from 'jquery'

// ** Table Header

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const List = () => {

  const dispatch = useDispatch()
  const store = useSelector(state => state.resources)
  const [fields, setFields] = useState('')
  const [dataTableJson, setDataTableJson] = useState([])
  const [headerFields, setHeaderFields] = useState([])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  function getParameterByName(name) {
    const match = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.search)
    const ma = match && decodeURIComponent(match[1].replace(/\+/g, ' '))
    return ma.trim()
  }


  useEffect(() => {

    dispatch(
      getResource({
        model: getParameterByName("resource")
      })
    )
    
    dispatch(
      setEditOn(0, {})
    )
  }, [])

  useEffect(() => {

    const headerFieldsTemp = []
    headerFieldsTemp.push("_id")

    for (const field in store.fields) {
      headerFieldsTemp.push(field)
    }
 
    setHeaderFields(headerFieldsTemp)

    dispatch(
      getDataResource({
        model: getParameterByName("resource"),
        where: {}
      })
    )
  }, [store.fields])

  useEffect(() => {

    const dataGereral = []
    for (const fieldData in store.data) {
 
      const rowData = {}

      for (const field in headerFields) {
        
        rowData[headerFields[field]] = store.data[fieldData][headerFields[field]]
      }

      dataGereral.push(rowData)
    }
    setDataTableJson(dataGereral)
 

  }, [store.data])


  return (
    <Fragment>
      <table className="table">
        <tr>
        {headerFields.map(function (object, i) {
          return <th>{ object}</th>
        })}
        </tr>

        
        {dataTableJson.map(function (object, i) {
           
          const rows = []
          for (const fieldData in object) {
            if (fieldData === "_id") {
            //  rows += `<button class="waves-effect btn-icon mr-50 btn btn-outline-primary">Editar</button>`

            } else {
          
              rows.push(<th key={object[fieldData]}>{object[fieldData]}</th>)
            }
          }

          const button = <Button.Ripple
            className="btn-icon mr-50"
            outline
            color="primary"
            onClick={() => {

              toggleSidebar()
              dispatch(getDataResourceById(object["_id"], getParameterByName("resource")))
              dispatch(setEditOn(Math.random(), {}))
              

            }}
          >
            Editar
          </Button.Ripple>

          const buttonDelete = <Button.Ripple
            className="btn-icon mr-50"
            outline
            color="danger"
            onClick={() => {
              MySwal.fire({
                title: "¿Quieres borrar este item?",
                icon: "info",
                customClass: {
                  confirmButton: "btn btn-danger"
                },

                buttonsStyling: true,
                confirmButtonText: "Si, Borrarlo"
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(deleteItem(object["_id"], getParameterByName("resource")))
                } else if (result.isDenied) {
                  MySwal.fire("Changes are not saved", "", "info")
                }
              })
            }}
          >
            <Trash2 size={14} />
          </Button.Ripple>
          
          return <tr className={object["_id"]} key={object["_id"]}><td>{button} {buttonDelete}</td>{rows}</tr>
          })}
        
      </table>
      <Sidebar
        size='lg'
        open={sidebarOpen}
        toggleSidebar={toggleSidebar} />
    </Fragment>
  )
}

export default List
