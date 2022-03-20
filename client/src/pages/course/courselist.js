import { useEffect } from 'react'
import CourseRoute from '../../components/routes/CourseRoute'
import CourseCard from '../../components/cards/CourseCard'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listCourses } from '../../../actions/courseActions'

const Courses = (/*{ courses }*/) => {
  const dispatch = useDispatch()

  const courseList = useSelector(state => state.courseList)
  const { loading, error, courses } = courseList

  useEffect(() => { dispatch(listCourses()) }, [dispatch])

  return (
   <div>
    <h1>Courses</h1>
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
  )
}

export default Courses