import { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { listCourseDetails, createCourseReview } from '../../../actions/courseActions'
import { useHistory } from "react-router"
import './CoursePage.css'
import CourseCard from '../../../components/cards/CourseCard'
import { Modal, Button as ModalButton } from 'antd';
import { COURSE_CREATE_REVIEW_RESET } from '../../../constants/courseConstants'
import Rating from "../../../components/general/Rating"
import Message from '../../../components/general/Message'
//import { Grid,  TextField, FormControl, FormLabel, Select, MenuItem, Button as ReviewButton } from "@mui/material";
//import { TextareaAutosize } from '@mui/base'
import { SyncOutlined } from "@ant-design/icons";
import { Form, Input, Select, Button, Row, Col, Divider } from 'antd';
import Footer from "../../home/Footer/Footer"


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

  const[form] = Form.useForm()

  const formItemLayout = {
    labelCol: { xs: { span: 24, }, sm: { span: 8 }, },
    wrapperCol: { xs: { span: 24, }, sm: { span: 16, }, },
   }
   
   const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 }}
   }

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
                <div style={{ fontSize: "36px", lineHeight: "41px", fontFamily: "inherit", paddingBottom:"15px" }}>{course.name}</div><br />
                <div style={{ fontSize: "21px", lineHeight: "27px", fontFamily: "inherit", paddingBottom: "10px"}}>{course.description}</div>
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
                {/*<button className="back-home-button" onClick={() => history.push("/")}>Enroll!</button>*/}
                <ModalButton type="primary" onClick={() => { setIsModalVisible(true); }}>Start Learning</ModalButton>
                <Modal title={course.name} visible={isModalVisible} width={1000} okText="Done" cancelText="Pause" onOk={() => { setIsModalVisible(false); }} onCancel={() => { setIsModalVisible(false); }}>
                  <CourseCard course={course} />
                </Modal>  
              </div>
          </div>

          <div>
          <Row className='pl-4'>
            <Col span={12} >
              <Divider orientation="left"><h4>Reviews</h4></Divider>
              {course.reviews.length === 0 && <Message>No Reviews</Message>}
                <ul className="list-group">
                  {course.reviews.map((review) => (
                    <li className="list-group-item" item key={review._id}>
                      <p>{review.name}</p>
                      <Rating value={review.rating} />
                      {/*<p>{review.createdAt.substring(0, 10)}</p>*/}
                      <p>{review.comment}</p>
                    </li>
                  ))}
                </ul>
                
                <strong>Write a Customer Review</strong>
                {successCourseReview && (<Message variant='success'>Review submitted successfully</Message>)}
                {loadingCourseReview && <SyncOutlined spin className="d-flex justify-content-center display-1 text-primary p-5"/>}
                {errorCourseReview && (<Message variant='danger'>{errorCourseReview}</Message>)}
                {userInfo ? (
                  <Form {...formItemLayout} form={form} name='review'>
                    <Form.Item name='rating' label='Rating' rules={[{ required: true, message: 'Kindly rate your learning experience.'}]}>
                    <Select>
                      <Option value=''>Select..</Option>
                      <Option value='1'>1 - Poor</Option>
                      <Option value='2'>2 - Fair</Option>
                      <Option value='3'>3 - Good</Option>
                      <Option value='4'>4 - Very Good</Option>
                      <Option value='5'>5 - Excellent</Option>
                    </Select>
                    </Form.Item>
                    <Form.Item name='comment' label='Comment' rules={[{ required: true, message: 'Kindly comment on the course.' }]}>
                    <Input.TextArea showCount maxlength={1000} />
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                      <Button type='primary' htmlType='submit'>Submit</Button>
                    </Form.Item>
                  </Form>
                ) : (<Message>Please <Link to='/login'>sign in</Link> to write a review{' '}</Message>)}
            </Col>
          </Row>
          </div>
        </div>
      }
      <Footer />
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