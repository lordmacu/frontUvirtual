// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
 
import users from '@src/views/apps/user/store/reducer'
import programs from '@src/views/apps/program/store/reducer'
import subjects from '@src/views/apps/subject/store/reducer'
import providers from '@src/views/apps/provider/store/reducer'
import books from '@src/views/apps/book/store/reducer'
import people from '@src/views/apps/people/store/reducer'
import resources from '@src/views/apps/resource/store/reducer'


const rootReducer = combineReducers({
  auth,
  users,
     programs,
  navbar,
  layout,
  subjects,
  providers,
  books,
  people,
  resources
  })

export default rootReducer