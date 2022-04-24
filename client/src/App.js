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
import 'antd/dist/antd.css'
import "./styles.css"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Categories from "./components/nav/Categories/Categories";
import Banner from "./pages/home/Banner/Banner";

function App() {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <Router>
      <ToastContainer position="top-center" />
      <Switch>
        <Route exact path='/'>
          <TopNav />
          {userInfo ? <Home /> : <Register />}
          <Categories />
          <Banner />
          {/*<Courses />*/}
          <InspirationBanner />
          <Footer />
        </Route>
        <Route path="/login">
          {userInfo ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {userInfo ? <Redirect to="/" /> : <Register />}{" "}
        </Route>
        <Route path='/user/:userId'>
          {!userInfo ? <Redirect to='/login' /> : <Profile />}
        </Route>
        <Route path='/courses' exact>
          <Categories />
          <Courses />
        </Route>
        <Route path='/course/:slug' exact component={Course} />
        <Route path='/tags' exact component={TagClassificationDemo} />
      </Switch>
    </Router>
  );
}

export default App;
