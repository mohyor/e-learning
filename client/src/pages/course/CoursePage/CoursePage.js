import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { listCourseDetails, createCourseReview } from '../../../actions/courseActions'
import { useHistory } from "react-router"
import './CoursePage.css'
import CourseCard from '../../../components/cards/CourseCard'
import { Modal, Button as ModalButton } from 'antd';
import { COURSE_CREATE_REVIEW_RESET } from '../../../constants/courseConstants'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from "../../../components/general/Rating"
import Message from '../../../components/general/Message'
import { Grid,  TextField, FormControl, FormLabel, Select, MenuItem, Button as ReviewButton } from "@mui/material";
import { TextareaAutosize } from '@mui/base'
import { SyncOutlined } from "@ant-design/icons";

const Course = ({ match }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch()
  
  const courseDetails = useSelector(state => state.courseDetails )
  const { loading, error, course } = courseDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const courseReviewCreate = useSelector(state => state.courseReviewCreate )
  const { success: successCourseReview, loading: loadingCourseReview, error: errorCourseReview } = courseReviewCreate

  //useEffect(() => { dispatch(listCourseDetails(match.params.slug))}, [dispatch, match])

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

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch( createCourseReview(match.params.id, { rating, comment, }))
  }

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
                  <span className="index-rating-span">{renderRating()}</span>
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
          <ModalButton type="secondary" onClick={() => { setIsModalVisible(true); }}>Start Learning</ModalButton>
          <Modal title="Modal Title" visible={isModalVisible} onOk={() => { setIsModalVisible(false); }} onCancel={() => { setIsModalVisible(false); }}>
            <CourseCard course={course} />
          </Modal>
          <div>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {course.reviews.length === 0 && <Message>No Reviews</Message>}
                {course.reviews.map((review) => (
                  <div item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    {/*<p>{review.createdAt.substring(0, 10)}</p>*/}
                    <p>{review.comment}</p>
                  </div>
                ))}
                <h2>Write a Customer Review</h2>
                {successCourseReview && (<Message variant='success'>Review submitted successfully</Message>)}
                {loadingCourseReview && <SyncOutlined spin className="d-flex justify-content-center display-1 text-primary p-5"/>}
                {errorCourseReview && (<Message variant='danger'>{errorCourseReview}</Message>)}
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                  <Grid container alignItems="center" justify="center" direction="column">
                    <Grid item>
                     <FormControl>
                      <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                        <MenuItem value=''>Select...</MenuItem>
                        <MenuItem value='1'>1 - Poor</MenuItem>
                        <MenuItem value='2'>2 - Fair</MenuItem>
                        <MenuItem value='3'>3 - Good</MenuItem>
                        <MenuItem value='4'>4 - Very Good</MenuItem>
                        <MenuItem value='5'>5 - Excellent</MenuItem>
                      </Select>
                     </FormControl>
                    </Grid>
                    <Grid item>
                     <TextareaAutosize placeholder='Enter your review' style={{ width: 200 }} onChange={(e) => setComment(e.target.value)}/>
                   </Grid>
                    <ReviewButton disabled={loadingCourseReview} variant="contained" color="primary" type="submit">Submit</ReviewButton>
                  </Grid>
                 </form>
                ) : (
                  <Message>Please <Link to='/login'>sign in</Link> to write a review{' '}</Message>
                )}
            </Col>
          </Row>
          </div>
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