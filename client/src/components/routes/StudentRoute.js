import { useEffect, useState, useContext } from "react";
import axios from 'axios'
import { useHistory } from 'react-router'
import { SyncOutlined } from "@ant-design/icons";

const StudentRoute = ({ children, showNav = true }) => {
 const [ok, setOk] = useState(false)
 const history = useHistory()
 const { user } = useContext(AuthContext)

 useEffect(() => { fetchUser()}, [])

 const fetchUser = async() => {
  try { const { data } = await axios.get(`/api/user/${userId}`) 
   if (data.ok) setOk(true)
  } catch(err) { console.log(err); setOk(false)}; history.push('/login')
 }

  return ( 
    <>
      {!ok ? (
        <SyncOutlined spin className="d-flex justify-content-center display-1 text-primary p-5"/>
        ) : ( 
        <div className="container-fluid">{children}</div>
        )
      }
    </> 
  ) 
}

export default StudentRoute
