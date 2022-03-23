import { useState, useEffect, useContext } from "react"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listCourseDetails } from '../../../actions/courseActions'
import { useHistory } from "react-router"
//import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron"
import PreviewModal from "../../../components/modal/PreviewModal"
import './CoursePage.css'
import CourseCard from '../../../components/cards/CourseCard'

const Course = ({ match }) => {
  const dispatch = useDispatch()

  const courseDetails = useSelector(state => state.courseDetails )
  const { loading, error, course } = courseDetails

  useEffect(() => { dispatch(listCourseDetails(match.params.slug))}, [dispatch, match])

  return (
    <div>
      {course && 
        <div>
          <div className="heading_box">
              <div>
                <div style={{ fontSize: "36px", lineHeight: "41px", fontFamily: "inherit", paddingBottom:"15px" }}>{course.name}</div>
                {/*<div style={{ fontSize: "21px", lineHeight: "27px", fontFamily: "inherit", paddingBottom: "10px"}}>{course.description}</div>*/}
                {/*
                <div className="index-card-ratting-feed">
                  <span className="index-rating-span">{this.renderRating()}</span>
                  <span className="index-rating-span">{course.rating}</span>
                  <span className="index-rating-span" >({course.rating_count} ratings)</span>
                  <span className="index-rating-span">{course.student_count} students enrolled</span>
                </div>
                 */}
                <div>
                  {/*<span style={{paddingRight:"32px", fontSize:"15px"}}>Created by {course.instructor.name}</span>*/}
                </div>
              </div>
              <div className="course-feed-img-box">
                <CourseCard course={course} />
                <button className="back-home-button" onClick={() => history.push("/")}>Enroll!</button>  
              </div>
          </div>
          {/*<CourseInfo course={this.props.course}/>*/}
    </div>
      }
    </div>
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