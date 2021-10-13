// ** React Imports
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { getSSmallImageUser } from "@utils"

const MySwal = withReactContent(Swal)

// ** Custom Components
import Avatar from "@components/avatar"

// ** Store & Actions
import {} from "../store/action"
import { store } from "@store/storeConfig/store"

// ** Third Party Components
import { Button } from "reactstrap"
import { Trash2, Edit, Copy } from "react-feather"

// ** Renders Client Columns
const renderClient = (row) => {
  const stateNum = Math.floor(Math.random() * 6),
    states = [
      "light-success",
      "light-danger",
      "light-warning",
      "light-info",
      "light-primary",
      "light-secondary"
    ],
    color = states[stateNum]

  if (row.image.length) {
    return (
      <Avatar
        className="mr-1"
        img={getSSmallImageUser(row.image)}
        width="32"
        height="32"
      />
    )
  } else {
    return (
      <Avatar
        color={color || "primary"}
        className="mr-1"
        content={row.name || "John Doe"}
        initials
      />
    )
  }
}

const formatDate = (date) => {
  const d = new Date(date)

  let month = `${d.getMonth() + 1}`
  let day = `${d.getDate()}`
  const year = d.getFullYear()

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return [year, month, day].join("-")
}

export const columns = [
  {
    name: "Actions",
    minWidth: "180px",
    maxWidth: "2500px",
    selector: "_id",
    sortable: true,
    cell: (row) => (
      <div>
        <Button.Ripple
          className="btn-icon mr-50"
          outline
          color="primary"
          onClick={() => {
            store.dispatch(setEditOn(Math.random(), row))
          }}
        >
          <Edit size={14} />
        </Button.Ripple>

        <Button.Ripple
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
                store.dispatch(deleteItem(row._id))
              } else if (result.isDenied) {
                MySwal.fire("Changes are not saved", "", "info")
              }
            })
          }}
        >
          <Trash2 size={14} />
        </Button.Ripple>

         
      </div>
    )
  },
  {
    name: "Autor",
    // minWidth: "70px",
    selector: "empresa",
    sortable: true,
    cell: (row) => <span className="text-capitalize">{row.author}</span>
  },
  {
    name: "edición",
    minWidth: "40px",
    selector: "edition",
    sortable: true,
    cell: (row) => <span className="text-capitalize">{row.edition}</span>

  },
  {
    name: "Publicación",
    minWidth: "200px",
    selector: "publication",
    sortable: true,
    cell: (row) => <span className="text-capitalize">{row.publication}</span>
  },
   

  {
    name: "versión",
    minWidth: "40px",
    selector: "version",
    sortable: true,
    cell: (row) => <span className="text-capitalize">{row.version}</span>

  }
  
]
