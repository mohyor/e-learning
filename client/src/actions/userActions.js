import axios from 'axios'
import { 
  USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, 
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, 
  USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET, 
  USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET,
  USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL,
  USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET, 
  } from '../constants/userConstants'


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
  console.log(res)
  
  dispatch({ type: USER_DETAILS_SUCCESS, payload: res.data })
 } catch (error) { 
  dispatch({ type: USER_DETAILS_FAIL, 
   payload: error.response && error.response.data.message ? error.response.data.message : error.message, 
  }) 
 }
}

export const updateUser = (user) => async (dispatch, getState) => {
 try { 
  dispatch({ type: USER_UPDATE_REQUEST, })
  const { userLogin: { userInfo },} = getState()

  const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}`, },}
  const res = await axios.put(`/api/user/${user._id}`, user, config)

  dispatch({ type: USER_UPDATE_SUCCESS })
  dispatch({ type: USER_DETAILS_SUCCESS, payload: res.data })
  dispatch({ type: USER_DETAILS_RESET })
} catch (error) {
 const message = error.response && error.response.data.message ? error.response.data.message : error.message
 if (message === 'Not authorized, token failed') { dispatch(logout()) }
 dispatch({ type: USER_UPDATE_FAIL, payload: message, })
 }
}

export const deleteUser = (id) => async (dispatch, getState) => {
 try {
  dispatch({ type: USER_DELETE_REQUEST, })
  const { userLogin: { userInfo }, } = getState()

  const config = { headers: { Authorization: `Bearer ${userInfo.token}`, },}
  await axios.delete(`/api/user/${id}`, config)

  dispatch({ type: USER_DELETE_SUCCESS })
 } catch (error) {
  const message = error.response && error.response.data.message ? error.response.data.message : error.message
  if (message === 'Not authorized, token failed') { dispatch(logout()) }
  dispatch({ type: USER_DELETE_FAIL, payload: message, })
 }
}

export const listUsers = () => async (dispatch, getState) => {
 try {
  dispatch({ type: USER_LIST_REQUEST })
  const { userLogin: { userInfo }, } = getState()

  const config = { headers: { Authorization: `Bearer ${userInfo.token}`, },}
  const res = await axios.get(`/api/users`, config)

  dispatch({ type: USER_LIST_SUCCESS, payload: res.data, })
 } catch (error) {
  const message = error.response && error.response.data.message ? error.response.data.message : error.message
  if (message === 'Not authorized, token failed') { dispatch(logout()) }
  dispatch({ type: USER_LIST_FAIL, payload: message, })
 }
}

/*

export const updateUserProfile = (user) => async (dispatch, getState) => {
 try {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST })
  const { userLogin: { userInfo } } = getState() 

  const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.token}` } }
  //const res = await axios.put(`/api/user/${id}`,user, config)
  const res = await axios.put(`/api/user/profile`,user, config)
  
  dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: res.data })
  dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data })
  localStorage.setItem('userInfo', JSON.stringify(res.data))
 } catch (error) { 
  dispatch({ type: USER_UPDATE_PROFILE_FAIL, 
   payload: error.response && error.response.data.message ? error.response.data.message : error.message, 
  }) 
 }
}

*/