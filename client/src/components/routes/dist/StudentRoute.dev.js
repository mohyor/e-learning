/*
import { useEffect, useState } from "react";
import { Context } from '../../context'
import axios from 'axios'
import { useRouter } from 'next/router'
import { SyncOutlined } from "@ant-design/icons";

const StudentRoute = ({ children, showNav = true }) => {
 const [ok, setOk] = useState(false)
 const router = useRouter()

 useEffect(() => { fetchUser()}, [])

 const fetchUser = async() => {
  try { const { data } = await axios.get('/api/current-user') 
   if (data.ok) setOk(true)
  } catch(err) { console.log(err); setOk(false)}; router.push('/login')
 }

 return( <>{!ok ? (<SyncOutlined spin className="d-flex justify-content-center display-1 text-primary p-5"/>) : ( 
  <div className="container-fluid">{children}</div>)}</> ) 
}

export default StudentRoute
*/
"use strict";