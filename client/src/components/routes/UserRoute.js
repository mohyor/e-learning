import { useEffect, useState, useContext } from "react";
import axios from 'axios'
import { useHistory } from 'react-router'
import { SyncOutlined } from "@ant-design/icons";
import UserNav from "../nav/UserNav";
import { useParams } from 'react-router'

const UserRoute = ({ children, showNav = true }) => {
  const [ok, setOk] = useState(false)
  const { user } = useContext(AuthContext)
  
  useEffect(() => { 
    const fetchUser = () => async() => {
      try { 
        const { data } = await axios.get(`/api/user/${user._id}`, 
        { headers: { token: "Bearer " + JSON.parse(localStorage.getItem("user")).token}}
        ) 
        console.log(data)
        
        if (data.ok) setOk(true)
      } catch(err) { console.log("Failed to fetch userId.", err); setOk(false)}; history.push('/login')
    }
    fetchUser()
  }, [])
  
  return ( 
    <>
      {/*
      {!ok ? (<SyncOutlined spin className="d-flex justify-content-center display-1 text-primary p-5"/>) : ( 
        <div className="container-fluid">
          <div className='row'>
            <div className="col-md-2">{showNav && <UserNav />}</div>
            <div className="col-md-10">{children}</div>
          </div>
        </div>
      )}
      */}
      <div className="container-fluid">
        <div className='row'>
          <div className="col-md-2">{showNav && <UserNav />}</div>
          <div className="col-md-9">{children}</div>
        </div>
      </div>
    </> 
  )
}

export default UserRoute
