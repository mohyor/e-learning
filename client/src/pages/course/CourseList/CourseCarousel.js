import { useEffect, useState } from 'react'
import CourseCard from '../../../components/cards/CourseCard'
import { useDispatch, useSelector } from 'react-redux'
import { listCourses } from '../../../actions/courseActions'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const CourseCarousel = () => {
  const settings = {  className: "center", infinite: true, centerPadding: "60px", slidesToShow: 3, swipeToSlide: true,slidesToScroll: 1, };

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
          <Slider {...settings}>
            {courses.map((course) => (
              <div item key={course._id} className='col-md-4'>
                <CourseCard course={course} />
              </div>
            ))}
          </Slider>
          )}
        </div>
      </div>
  </div>
  )
}

export default CourseCarousel