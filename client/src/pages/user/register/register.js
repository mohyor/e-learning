import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'
import './register.css'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../../actions/userActions'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()
  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const handleClick = async (e) => {
    e.preventDefault()
    dispatch(register(name, email, password))
  } 

  return (
    <div className="login">
      <div className="loginWrapper">
       <div className="loginLeft">
        <h3 className="loginLogo">Connect</h3>
        <span className="loginDesc">Stay Connected to the world.{" "}</span>
       </div>
       <div className="loginRight">
        <form className="loginBox" onClick={handleClick}>
        <input placeholder="Username" className="loginInput" value={name} onChange={(e) => setName(e.target.value)} />
         <input placeholder="Email" required className="loginInput" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
         <input placeholder="Password" required className="loginInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
         <button className="loginButton" type="submit">Sign Up</button>
         <button className="loginRegisterButton"><Link to='/login' style={{textDecoration:"none"}} >Log into your Account</Link></button>
        </form>
       </div>
      </div>
    </div>
  );
}
