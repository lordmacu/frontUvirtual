// ** Initial State
const initialState = {
  fields: [],
  data: [],
  isEdit: 0,

  rowData: null
   
}

const items = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EDIT_ON':
      return { ...state, isEdit: action.data, rowData: action.rowData }
    case "SET_RESOURCE":
      return { ...state, fields: action.data }
    case "SET_RESOURCE_DATA":
      return { ...state, data: action.data }
    case "SET_RESOURCE_ITEM_DATA":
      
      return { ...state, rowData: action.data }
    default:
      return { ...state }
  }
}
export default items
