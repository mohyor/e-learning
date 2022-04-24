
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react"
import Register from './pages/user/register/register'
import Home from './pages/home/home'
import InspirationBanner from './pages/home/InspirationBanner/InspirationBanner'
import Footer from './pages/home/Footer/Footer'
import Login from './pages/user/login/login'
import Profile from './pages/user/Profile/profile'
import Courses from './pages/course/CourseList/CourseList'
import Course from './pages/course/CoursePage/CoursePage'
import { useDispatch, useSelector } from 'react-redux'
import TopNav from './components/nav/TopNav'
import TagClassificationDemo from './pages/tags'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Categories from "./components/nav/Categories/Categories";
import Banner from "./pages/home/Banner/Banner";


const Home = () => {
 return (
  <div>
    <TopNav />
    {userInfo ? <Home /> : <Register />}
    <Categories />
    <Banner />
    {/*<Courses />*/}
    <InspirationBanner />
    <Footer />
  </div>
 )
}

export default Home
