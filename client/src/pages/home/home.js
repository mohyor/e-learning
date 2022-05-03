
import InspirationBanner from './InspirationBanner/InspirationBanner'
import Footer from './Footer/Footer'
import Courses from '../course/CourseList/CourseList'
import TopNav from '../../components/nav/TopNav'
import Categories from "../../components/nav/Categories/Categories";
import Banner from "./Banner/Banner";
import Register from '../user/register/register'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <div>
      <TopNav />
      <Banner />
      <Courses />
      <Categories />
      <InspirationBanner />
      <Footer />
    </div>
  )
}

export default Home
