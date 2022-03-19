import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { courseListReducer, courseDetailsReducer } from './reducers/courseReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer } from './reducers/userReducers'

const reducer = combineReducers({
 courseList: courseListReducer, 
 courseDetails: courseDetailsReducer,
 userLogin: userLoginReducer,
 userRegister: userRegisterReducer,
 userDetails: userDetailsReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
 userLogin: { userInfo: userInfoFromStorage }
}
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store