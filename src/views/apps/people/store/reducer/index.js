import { types } from "../types/types"

// ** Initial State
const initialState = {
  students: [],
  tutors: [],
  directores: [],
  coordinadores: []
}

const items = (state = initialState, action) => {
  switch (action.type) {

    case types.getStudents:
      return { ...state, students: action.payload }
    case types.getTutors:
      return { ...state, tutors: action.payload }
    case types.getDirectores:
      return { ...state, directores: action.payload }
    case types.getCoordinadores:
      return { ...state, coordinadores: action.payload }
    default:
      return state
  }
}
export default items
