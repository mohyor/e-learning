import { useEffect, useState } from "react"
import UserRoute from "../../components/routes/UserRoute"
import axios from "axios"
import { Avatar } from "antd"
import { Link } from "react-router-dom"
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
//import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const Profile = ({ match }) => {
  const [courses, setCourses] = useState([])
  const [loadingProfile, setLoadingProfile] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin 

  /*
  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])
  */
  useEffect(() => { dispatch(getUserDetails(userInfo._id))}, [dispatch, match])
  
  return (
    <UserRoute>
      {loadingProfile && (<SyncOutlined spin className="d-flex justify-content-center display-1 text-danger p-5" />)}
      <h1 className='jumbotron text-center square'>User Dashboard</h1>
      {courses && courses.map(course => (
        <div key={course._id} className="media pt-2 pb-1"><Avatar size={80} shape="square" src={course.image ? course.image.Location : '/course.png'} />
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
    </UserRoute>
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