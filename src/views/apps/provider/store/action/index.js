import axios from "axios"
import themeConfig from "@configs/themeConfig"

const baseUrl = themeConfig.apiUrl
// ** Get all Data

export const setEditOn = (val, row) => {
  return async (dispatch) => {
    dispatch({ type: "SET_EDIT_ON", data: val, rowData: row })
  }
}

export const addImage = (image) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_USER_IMAGE_USER",
      data: image
    })
  }
}

export const selectedCountryAdd = (val) => {
  return async (dispatch) => {
    dispatch({
      type: "ADD_SELECTED_COUNTRY",
      payload: val
    })
  }
}

export const deleteSelectedCountry = (val) => {
  return async (dispatch) => {
    dispatch({
      type: "DELETE_SELECTED_COUNTRY",
      payload: null
    })
  }
}

export const selectedCityAdd = (val) => {
  return async (dispatch) => {
    dispatch({
      type: "ADD_SELECTED_CITY",
      payload: val
    })
  }
}

export const deleteSelectedCity = (val) => {
  return async (dispatch) => {
    dispatch({
      type: "DELETE_SELECTED_CITY",
      payload: null
    })
  }
}

export const selectedCityLocal = (val) => {
  return async (dispatch) => {
    dispatch({
      type: "ADD_SELECTED_CITY_LOCAL",
      payload: val
    })
  }
}

export const getAllTypes = (params) => {
  return async (dispatch) => {
    await axios.post(`${baseUrl}types/get`, params).then((response) => {
      dispatch({
        type: "GET_ALL_TYPES",
        data: response.data
      })
    })
  }
}

export const getAllStatuses = (params) => {
  return async (dispatch) => {
    await axios.post(`${baseUrl}statuses/get`, params).then((response) => {
      dispatch({
        type: "GET_ALL_STATUSES",
        data: response.data
      })
    })
  }
}

// ** Get data on page or row change
export const getData = (params) => {
  return async (dispatch) => {
    await axios.post(`${baseUrl}providersBooks/get`, params).then((response) => {
      dispatch({
        type: "GET_DATA",
        data: response.data.docs,
        totalPages: response.data.totalDocs,
        params
      })
    })
  }
}

// ** Get Item
export const getItem = (id) => {
  return async (dispatch) => {
    await axios
      .get(`${baseUrl}providersBooks/get/${id}`)
      .then((response) => {
        dispatch({
          type: "GET_ITEM",
          selectedItem: response.data.items
        })
      })
      .catch((err) => console.log(err))
  }
}

// ** Add new item
export const addItem = (item) => {
  return (dispatch, getState) => {
    axios
      .post(`${baseUrl}providersBooks/create`, item)
      .then((response) => {
        dispatch({
          type: "ADD_ITEM",
          item
        })
      })
      .then(() => {
        dispatch(getData(getState().providers.params))
      })
      .catch((err) => console.log(err))
  }
}

export const getAllCountries = (params) => {
  return async dispatch => {
    
    await axios.post(`${baseUrl}countries/get`, params).then(response => {
       dispatch({
        type: 'GET_ALL_COUNTRIES',
        data: response.data
      })
    })
    //console.log(response)
  }
}

export const getAllCountriesSelect = () => {
  return async dispatch => {
    
    await axios.get(`${baseUrl}countries/getAll`).then(response => {
       dispatch({
        type: 'GET_ALL_COUNTRIES',
        data: response.data
      })
    })
    //console.log(response)
  }
}
export const getAllCities = (params) => {
  return async dispatch => {
    
    await axios.post(`${baseUrl}cities/get`, params).then(response => {
       dispatch({
        type: 'GET_ALL_CITIES',
        data: response.data
      })
    })
    //console.log(response)
  }
}

export const getAllCitiesSelect = () => {
  return async dispatch => {
    
    await axios.get(`${baseUrl}cities/getAll`).then(response => {
       dispatch({
        type: 'GET_ALL_CITIES',
        data: response.data
      })
    })
    //console.log(response)
  }
}


export const udpateItem = (item, props) => {
  return (dispatch, getState) => {
    axios
      .put(`${baseUrl}providersBooks/update/${item.id}`, item)
      .then((response) => {
 
        dispatch(getItem(null))

        dispatch(getData(getState().providers.params))
      })

      .catch((err) => console.log(err))
  }
}

// ** Delete user
export const deleteItem = (id) => {
  return (dispatch, getState) => {
    axios
      .delete(`${baseUrl}providersBooks/remove/${id}`, { id })
      .then((response) => {
        dispatch({
          type: "DELETE_ITEM"
        })
      })
      .then(() => {
        dispatch(getData(getState().providers.params))
      })
  }
}

export const cloneItem = (id) => {
  return (dispatch, getState) => {
    axios
      .post(`${baseUrl}providersBooks/clone`, { id })
      .then((response) => {
        console.log(response.data)
        dispatch(setEditOn(Math.random(), response.data.items))
      })
      .then(() => {
        dispatch(getData(getState().providers.params))
      })
  }
}
