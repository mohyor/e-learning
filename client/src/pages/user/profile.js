import { useEffect, useState } from "react"
import UserRoute from "../../components/routes/UserRoute"
import axios from "axios"
import { Avatar } from "antd"
import { Link } from "react-router-dom"
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons"
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
//import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const Profile = ({ match }) => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  //const { user } = useContext(AuthContext)
   
  useEffect(() => {
    const loadCourses = async () => {
    try { 
      setLoading(true)
      //const res = await axios.get(`/api/user-courses/6214e3360feccaf7d266ebf4`,
      const res = await axios.get(`/api/user-courses/${match.params.id}`,
       { headers: { Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token}}
      ); setCourses(res.data); setLoading(false)
      console.log(res.data)
    } catch(err) { console.log(err); setLoading(false) }
  }; loadCourses()}, [match])
  
  return (
    <UserRoute>
      {loading && (<SyncOutlined spin className="d-flex justify-content-center display-1 text-danger p-5" />)}
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