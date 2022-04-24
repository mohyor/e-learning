import './UserCard.css'
import { useEffect, useState } from "react"
//import UserRoute from "../../components/routes/UserRoute"
import axios from "axios"
import { Link } from "react-router-dom"
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, /*updateUserProfile */ } from '../../../../actions/userActions'
import { useParams } from 'react-router-dom'
import Rating from "../../../../components/general/Rating"
import Message from '../../../../components/general/Message'
//import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const UserCard = () => {
 const { userId } = useParams() //const userId = match.params.id

 const history = useHistory()
 const dispatch = useDispatch()

 const userDetails = useSelector((state) => state.userDetails)
 const { loading, error, user } = userDetails

 const userLogin = useSelector((state) => state.userLogin)
 const { userInfo } = userLogin

 useEffect(() => { dispatch(getUserDetails(userId))}, [dispatch, userId])

 return (
  <div>
    <div className="container py-2 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-lg-9 col-xl-7">
          <div className="card">
            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: "#000", height: "200px" }}>
              <div className="ms-4 mt-5 d-flex flex-column" style={{ width: "150px" }}>
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp" alt="Generic placeholder image" className="img-fluid img-thumbnail mt-4 mb-2" style={{width: "150px", zIndex: "1"}} />
                <button type="button" className="btn btn-outline-dark" data-mdb-ripple-color="dark" style={{ zIndex: "1" }}>Edit profile</button>
              </div>
              <div className="ms-3" style={{ marginTop: "130px" }}>
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="p-4 text-black" style={{ backgroundColor: "#f8f9fa" }}>
              <div className="d-flex justify-content-end text-center py-1">
                <div>
                  <p className="mb-1 h5">253</p>
                  <p className="small text-muted mb-0">Photos</p>
                </div>
                <div className="px-3">
                  <p className="mb-1 h5">1026</p>
                  <p className="small text-muted mb-0">Followers</p>
                </div>
                <div>
                  <p className="mb-1 h5">478</p>
                  <p className="small text-muted mb-0">Following</p>
                </div>
              </div>
            </div>
            <div className="card-body p-4 text-black">
              <div className="mb-5">
                <p className="lead fw-normal mb-1">About</p>
                <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                  <p className="font-italic mb-1">Web Developer</p>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="lead fw-normal mb-0">Recent photos</p>
                <p className="mb-0"><a href="#!" className="text-muted">Show all</a></p>
              </div>
              <div className="row g-2">
                <div className="col mb-2">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp" alt="image 1" className="w-100 rounded-3" />
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 )
}

export default UserCard