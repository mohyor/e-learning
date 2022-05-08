
import Footer from './Footer/Footer'
import Courses from '../course/CourseList/CourseList'
import TopNav from '../../components/nav/TopNav'
import Banner from "./Banner/Banner";
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <div>
      <TopNav />
      <Banner />
      <Courses />
      <Footer />
    </div>
  )
}

export default Home
