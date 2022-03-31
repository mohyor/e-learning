import { useEffect, useState } from 'react'
import CourseCard from '../../../components/cards/CourseCard'
import { useDispatch, useSelector } from 'react-redux'
import { listCourses } from '../../../actions/courseActions'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Row, Col, Divider } from 'antd';

const Courses = () => {
  const dispatch = useDispatch()
  const courseList = useSelector(state => state.courseList)
  const { loading, error, courses } = courseList

  useEffect(() => { dispatch(listCourses()) }, [dispatch])

  return (
    <div className="index">
      <div className="index-header-container">
          <div className="index-header">Courses</div>
      </div>
      <div className="courses-box">
        <div className="carousel-rel-wrapper">
          {loading ? (<h2>Loading...</h2>) : error ? (<h3>{error}</h3>) : (
          <Row justify='center' gutter={[16, 24]}>
            {courses.map((course) => (
              <Col className="gutter-row" key={course._id} span={8}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
          )}
        </div>
      </div>
  </div>
  )
}

export default Courses

/*
const Courses = () => {
  const [currentTransformation, setCurrentTransformation] = useState(0)
  //const [currentTransformation1, setCurrentTransformation1] = useState(0)
  //const [currentTransformation2, setCurrentTransformation2] = useState(0)
  //const [currentTransformation3, setCurrentTransformation3] = useState(0)
  const [arr, setArr] = useState([])
  const [arr1, setArr1] = useState([])
  const [arr2, setArr2] = useState([])
  const [arr3, setArr3] = useState([])

  const dispatch = useDispatch()
  const courseList = useSelector(state => state.courseList)
  const { loading, error, courses } = courseList

  useEffect(() => { dispatch(listCourses()) }, [dispatch])

  const getNumberOfResultsDisplayed = () => {
    const width = window.innerWidth;
    if (width < 564) { 
      return 1;
    } 
    else if (width < 796) { 
      return 2;
    } 
    else if (width < 1028) { 
      return 3 
    } 
    else if (width < 1260) { 
      return 4;
    } 
    else { 
      return 5; 
    }
  }

  const showLeft = (index) => {
    if (![`currentTransformation${index}`] > 0) { 
      return null; 
    }
    
    return (
      <div className="left arrow" onClick={() => leftClick(index)}>
        <FontAwesomeIcon style={{ padding: "12px" }} icon={faChevronLeft} />
      </div>
    );
  }

  const leftClick = (index) => {
    const field = `currentTransformation${index}`
    setCurrentTransformation({
      [field]: Math.max(0, [field] - getNumberOfResultsDisplayed())
    });
  }

  const rightClick = (index) => {
    const field = `currentTransformation${index}`
    setCurrentTransformation({
        [field]: Math.min(
          [`arr${index}`].length - 1,
          [field] + getNumberOfResultsDisplayed()
        )
    });
  }

  const showRight = (index) => {
    let max = [`arr${index}`].length - 1;
    let currentValue = [`currentTransformation${index}`];

    if (max >= currentValue + getNumberOfResultsDisplayed()) {
      return (
        <div className="right arrow" onClick={() => this.rightClick(index)}>
            <FontAwesomeIcon style={{ padding: "12px" }} icon={faChevronRight} />
        </div>
      )
    }
    return null;
  }

  const renderList = (index) => {
    const field = `currentTransformation${index}`;
    let arr;

    if (index === 1) {
      arr = setArr1;
    } else if (index === 2) {
      arr = setArr2;
    } else {
      arr = setArr3;
    }
    
    return (
      <div className="carousel-inner" style={{
        transform: `translateX(${-1 * [field] * 232}px)` }}>
        {resCourse}
      </div>
    )
  }

  return (
    <div className="index">
      <div className="index-header-container">
          <div className="index-header">Courses</div>
      </div>
      <div className="courses-box">
        <div className="carousel-rel-wrapper">
          {loading ? (<h2>Loading...</h2>) : error ? (<h3>{error}</h3>) : (
          <div className='row'>
            {courses.map((course) => (
            <div key={course._id} className='col-md-4'>
              <CourseCard course={course} />
            </div>
            ))}
          </div>
          )}
        </div>
        {showLeft(1)}
        {showRight(1)}
      </div>
  </div>
  )
}

export default Courses
*/