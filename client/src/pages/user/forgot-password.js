import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SyncOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { AuthContext } from '../../context/AuthContext'
import { useHistory } from 'react-router'

const ForgotPassword = () => {
 const [email, setEmail] = useState('')
 const [success, setSuccess] = useState(false)
 const [code, setCode] = useState("")
 const [newPassword, setNewPassword] = useState('')
 const [loading, setLoading] = useState(false)

 const { user } = useContext(AuthContext)
 const history = useHistory()

 useEffect(() => { if (user !== null) history.push('/')}, [user])

 const handleSubmit = async(e) => {
  e.preventDefault()
  try { setLoading(true)
   const data = await axios.post('/api/forgot-password', { email })
   setSuccess(true), toast('Check your email from the secret code')
  } catch (err) {
   setLoading(false), toast(err.response.data)
  }
 }

 const handleResetPassword = async(e) => {
  e.preventDefault()
  try { setLoading(true)
   const { data } = await axios.post('/api/reset-password', { email, code, newPassword })
   setEmail(''), setCode(''), setNewPassword(''), setLoading(false), toast('Great! Now you can login with your new password')
  } catch (err) {
   setLoading(false), toast(err.response.data)
  }
 }

 return ( 
  <>
   <h1 className='jumbotron text-center bg-primary square'>Forgot Password</h1>
   <div className='container col-md-4 offset-md-4 pb-5'>
    <form onSubmit={success ? handleResetPassword : handleSubmit}>
     <input type='email' className='form-control mb-4 p-4' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' required />
     {success && <>
      <input type='text' className='form-control mb-4 p-4' value={code} onChange={(e) => setEmail(e.target.value)} placeholder='Enter secret code' required />
      <input type='password' className='form-control mb-4 p-4' value={newPassword} onChange={(e) => setEmail(e.target.value)} placeholder='Enter new password' required />
     </>}
     <br /><button type='submit' className='btn btn-primary btn-block p-2' disabled={loading || !email }>{ loading ? <SyncOutlined spin /> : 'Submit' }</button>
    </form>
   </div>
  </> 
 )
}

export default ForgotPassword
