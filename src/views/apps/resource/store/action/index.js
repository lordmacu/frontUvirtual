import axios from "axios"
import themeConfig from "@configs/themeConfig"

const baseUrl = themeConfig.apiUrl
// ** Get all Data

export const setEditOn = (val, row) => {
  return async (dispatch) => {
    dispatch({ type: "SET_EDIT_ON", data: val, rowData: row })
  }
}
 

export const getResource = (params) => {
  return async (dispatch) => {
    await axios.post(`${baseUrl}resources/getResource`, params).then((response) => {
      const fields = response.data.data.fields
      const fieldsJson = JSON.parse(fields.replace(/'/g, '"'))
      
      console.log(fieldsJson)
     dispatch({
        type: "SET_RESOURCE",
        data: fieldsJson,
        params
      })
    })
  }
}

export const getDataResource = (params) => {
  return async (dispatch) => {
    await axios.post(`${baseUrl}resources/getAll`, params).then((response) => {
     
       dispatch({
        type: "SET_RESOURCE_DATA",
        data: response.data.data,
        params
      })
    })
  }
}

export const getDataResourceById = (params, modelName) => {
  return async (dispatch) => {
    await axios.post(`${baseUrl}resources/get`, { where: { _id: params }, model: modelName}).then((response) => {

      dispatch({
        type: "SET_RESOURCE_ITEM_DATA",
        data: response.data.data,
        params
      })
    })
  }
}

export const deleteItem = (id, modelname) => {
  return (dispatch, getState) => {
    axios
      .delete(`${baseUrl}resources/remove/${id}/${modelname}`, { id })
      .then((response) => {
        dispatch(getDataResource({
          model: modelname,
          where: {}
        }))
      })
      
  }
}

export const udpateItem = (item, history, modelname) => {


  const dataArray = []
  const test = Object.assign({}, item)

  return (dispatch, getState) => {
    axios
      .put(`${baseUrl}resources/update/${item.id}`, { update: test, model: modelname})
      .then((response) => {
        history.push(`/apps/resource/list?resource=${modelname}`)
        dispatch(getDataResource({
          model: modelname,
          where: {}
        }))
      })

      .catch((err) => console.log(err))
  }
}