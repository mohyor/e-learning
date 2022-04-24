import { useEffect, useState } from "react"
//import UserRoute from "../../components/routes/UserRoute"
import axios from "axios"
import { Avatar } from "antd"
import { Link } from "react-router-dom"
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, /*updateUserProfile */ } from '../../../actions/userActions'
import { useParams } from 'react-router-dom'
import Rating from "../../../components/general/Rating"
import Message from '../../../components/general/Message'
import UserCard from "./UserCard/UserCard"
//import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const Profile = ({ match }) => {
  const { userId } = useParams() //const userId = match.params.id

  /*
  const [courses, setCourses] = useState([])
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  */
  
  const history = useHistory()
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  /*
  useEffect(() => {
    if (!userInfo) { history.push('/login')
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails(userId))
      }
    }
  }, [dispatch, history, userInfo, user])

    useEffect(() => {
    if (successCourseReview) {
      setRating(0)
      setComment('')
    }
    if (!course.slug || course.slug !== match.params.slug) {
      dispatch(listCourseDetails(match.params.slug))
      dispatch({ type: COURSE_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successCourseReview])

  */
 
  useEffect(() => { dispatch(getUserDetails(userId))}, [dispatch, userId])
  
  return (
    <div>
      {/*{loadingProfile && (<SyncOutlined spin className="d-flex justify-content-center display-1 text-danger p-5" />)}*/}
      <h1 className='jumbotron text-center square'>User Dashboard</h1>
      <UserCard />
      <p>{user.name}</p>
      {/*
      {courses && courses.map(course => (
        <div key={course._id} className="media pt-2 pb-1">
          <Avatar size={80} shape="square" src={course.image ? course.image.Location : '/course.png'} />
          <div className="media-body pl-2">
            <div className='row'>
              <div className="col">
                <Link href={`/user/course/${course.slug}`} className='pointer'>
                  <a><h5 className="mt-2 text-primary">{course.name}</h5></a>
                </Link>
                <p className="text-muted" style={{ marginTop: '-15px', fontSize: '12px' }}>By {course.instructor.name}</p>
              </div>
              <div className="col-md-3 mt-3 text-center">
                <Link href={`/user/course/${course.slug}`}><a><PlayCircleOutlined className="h2 pointer text-primary" /></a></Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      */}
    </div>
  ) 
}

export default Profile

/*
const UserIndex = () => {

  const { state: { user }, } = useContext(Context)
  
  return (
    <UserRoute>
     <h1 className="jumbotron text-center square">User Profile Page</h1>
    </UserRoute>
  ) 
}
  
export default UserIndex
*/