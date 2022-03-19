import './login.css'
import { CircularProgress } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../actions/userActions'

export default function Login({ location, history }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo, isFetching } = userLogin

  const handleClick = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  } 

  return (
    <div className="login">
      <div className="loginWrapper">
       <div className="loginLeft">
        <h3 className="loginLogo">Online University</h3>
        <span className="loginDesc">Knowledge is Power!.{" "}</span>
       </div>
       <div className="loginRight">
        <form div className="loginBox" onSubmit={handleClick}>
         <input placeholder="Email" type="email" required minLength="6" className="loginInput" value={email} onChange={(e) => setEmail(e.target.value)} />
         <input placeholder="Password" type="password" required className="loginInput" value={password} onChange={(e) => setPassword(e.target.value)} />
         <button type='submit' className="loginButton">{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Log In"}</button>
         <span className="loginForgot">Forgot Password?</span>
         <button className="loginRegisterButton">
         {isFetching ? <CircularProgress color="inherit" size="20px" /> : "Create a New Account"}
         </button>
        </form>
       </div>
      </div>
    </div>
  );
}

/* 
export default function Login() {
  const email = useRef()
  const password = useRef()
  const { user, isFetching, error, dispatch } = useContext(AuthContext)

  const handleClick = (e) => {
    e.preventDefault()
    loginCall({ email: email.current.value, password: password.current.value }, dispatch)
  } 

  return (
    <div className="login">
      <div className="loginWrapper">
       <div className="loginLeft">
        <h3 className="loginLogo">Online University</h3>
        <span className="loginDesc">Knowledge is Power!.{" "}</span>
       </div>
       <div className="loginRight">
        <form div className="loginBox" onSubmit={handleClick}>
         <input placeholder="Email" type="email" required minLength="6" className="loginInput" ref={email} />
         <input placeholder="Password" type="password" required className="loginInput" ref={password} />
         <button className="loginButton">{isFetching ? <CircularProgress color="inherit" size="20px" /> : "Log In"}</button>
         <span className="loginForgot">Forgot Password?</span>
         <button className="loginRegisterButton">
         {isFetching ? <CircularProgress color="inherit" size="20px" /> : "Create a New Account"}
         </button>
        </form>
       </div>
      </div>
    </div>
  );
}
*/