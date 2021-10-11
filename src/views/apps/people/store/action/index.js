import axios from 'axios'
import themeConfig from '@configs/themeConfig'
import { types } from '../types/types'

const baseUrl = themeConfig.apiUrl

// ** Get all students
export const getAllStudents = () => {
    return async dispatch => {
    await axios
      .get(`${baseUrl}people/getStudents`)
      .then(response => {
        dispatch({
          type: types.getStudents,
          payload: response.data.items
        })
      })
      .catch(err => console.log(err))
  }
}

// ** Get all tutors
export const getAllTutors = () => {
  return async dispatch => {
    await axios
      .get(`${baseUrl}people/getTutors`)
      .then(response => {
        dispatch({
          type: types.getTutors,
          payload: response.data.items
        })
      })
      .catch(err => console.log(err))
  }
}

// ** Get all directores
export const getAllDirectores = () => {
  return async dispatch => {
    await axios
      .get(`${baseUrl}people/getDirectores`)
      .then(response => {
        dispatch({
          type: types.getDirectores,
          payload: response.data.items
        })
      })
      .catch(err => console.log(err))
  }
}

// ** Get all coordinadores
export const getAllCoordinadores = () => {
  return async dispatch => {
    await axios
      .get(`${baseUrl}people/getCoordinadores`)
      .then(response => {
        dispatch({
          type: types.getCoordinadores,
          payload: response.data.items
        })
      })
      .catch(err => console.log(err))
  }
}