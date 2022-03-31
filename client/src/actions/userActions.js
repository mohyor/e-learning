import axios from 'axios'
import { 
 USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, 
 USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, 
 USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, 
 USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL } from '../constants/userConstants'

export const login = (email, password) => async (dispatch) => {
 try {
  dispatch({ type: USER_LOGIN_REQUEST })
  const config = { headers: { 'Content-Type': 'application/json' }}
  const res = await axios.post('/api/login', { email, password }, config)
  
  dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data })
  localStorage.setItem('userInfo', JSON.stringify(res.data))
 } catch (error) { 
  dispatch({ type: USER_LOGIN_FAIL, 
   payload: error.response && error.response.data.message ? error.response.data.message : error.message, 
  })
 }
}

export const logout = () => (dispatch) => {
 localStorage.removeItem('userInfo')
 dispatch({ type: USER_LOGOUT })
} 

export const register = (name, email, password) => async (dispatch) => {
 try {
  dispatch({ type: USER_REGISTER_REQUEST })
  const config = { headers: { 'Content-Type': 'application/json' }}
  const res = await axios.post('/api/register', { name, email, password }, config)
  
  dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data })
  dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data })
  localStorage.setItem('userInfo', JSON.stringify(res.data))
 } catch (error) { 
  dispatch({ type: USER_REGISTER_FAIL, 
   payload: error.response && error.response.data.message ? error.response.data.message : error.message, 
  })
 }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
 try {
  dispatch({ type: USER_DETAILS_REQUEST })
  const { userLogin: { userInfo } } = getState() 
  const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
  const res = await axios.get(`/api/user/${id}`, config)
  
  dispatch({ type: USER_DETAILS_SUCCESS, payload: res.data })
 } catch (error) { 
  dispatch({ type: USER_DETAILS_FAIL, 
   payload: error.response && error.response.data.message ? error.response.data.message : error.message, 
  }) 
 }
}


export const updateUserProfile = (user) => async (dispatch, getState) => {
 try {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
  const { userLogin: { userInfo } } = getState() 
  const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } }
  const res = await axios.put(`/api/user/${id}`,user, config)
  
  dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: res.data })
 } catch (error) { 
  dispatch({ type: USER_UPDATE_PROFILE_FAIL, 
   payload: error.response && error.response.data.message ? error.response.data.message : error.message, 
  }) 
 }
}