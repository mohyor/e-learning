import axios from 'axios'
import { loginFailure, loginStart, loginSuccess, Logout } from "./AuthActions";

export const loginCall = async (userCredential, dispatch) => {
 dispatch({ type: "LOGIN_START" })
 try {
  const res = await axios.post("api/login", userCredential)
  dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
 } catch (err) { dispatch({ type: "LOGIN_FAILURE", payload: err })}
}

export const logout = async(dispatch) => {
 dispatch(Logout())
 try {
  window.localStorage.removeItem('user')
  const { data } = await axios.get('/api/logout')
  toast(data.message)
  history.push('/login')
 } catch (err) { console.log(err)}
}