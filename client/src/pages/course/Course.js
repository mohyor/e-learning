import { useState, useEffect, useContext } from "react"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listCourseDetails } from '../../actions/courseActions'
import { useHistory } from "react-router"
//import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron"
import PreviewModal from "../../components/modal/PreviewModal"
import SingleCourseLessons from "../../components/cards/SingleCourseLessons"
import { AuthContext } from '../../context/AuthContext'
import { toast } from "react-toastify"

const Course = ({ match }) => {
  const dispatch = useDispatch()

  const courseDetails = useSelector(state => state.courseDetails )
  const { loading, error, course } = courseDetails

  useEffect(() => { dispatch(listCourseDetails(match.params.slug))}, [dispatch, match])

  return (
    <>
      <h3>{course.name}</h3>
    </>
  )
}

export default Course

/*
  const Course = ({ course }) => {

  
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [enrolled, setEnrolled] = useState({})

  const { user } = useContext(AuthContext)
  const history = useHistory()
  const { slug } = router.query

  const checkEnrollment = async => { const { data } = await axios.get(`api/check-enrollment/${course._id}`); setEnrolled(data)}

  useEffect(() => { if (user && course) checkEnrollment()}, [user, course])

  const handleFreeEnrollment = async (e) => {
    e.preventDefault()
    try { 
    if (!user) history.push('/login')
    if(enrolled.status) return router.push(`/user/course/${enrolled.course.slug}`)
    setLoading(true)
    const { data } = await axios.post(`/api/free-enrollment/${course._id}`); toast(data.message); setLoading(false)
    } catch (err) { toast('Enrollment failed. Try again'); console.log(err); setLoading(false)}
  }

  return (
    <>
      <SingleCourseJumbotron course={course} showModal={showModal} setShowModal={setShowModal} preview={preview} setPreview={setPreview} user={user} loading={loading}  
      handleFreeEnrollment={handleFreeEnrollment} enrolled={enrolled} setEnrolled={setEnrolled} />
      <PreviewModal showModal={showModal} setShowModal={setShowModal} preview={preview} />
      {course.lessons && (<SingleCourseLessons lessons={course.lessons} setPreview={setPreview} showModal={showModal} setShowModal={setShowModal} />)}
    </>
  ) 
  }
*/