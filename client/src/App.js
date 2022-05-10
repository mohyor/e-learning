import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import TopNav from './components/nav/TopNav'
import Register from './pages/user/register/register'
import Home from './pages/home/Home'
import Login from './pages/user/login/login'
import Profile from './pages/user/Profile/profile'
import Courses from './pages/course/CourseList/CourseList'
import Course from './pages/course/CoursePage/CoursePage'
import { useDispatch, useSelector } from 'react-redux'
import 'antd/dist/antd.css'
import "./styles.css"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Categories from "./components/nav/Categories/Categories";

function App() {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <Router>
      <TopNav />
      <ToastContainer position="top-center" />
      <Switch>
        // Login Page
        <Route path="/login">
          {userInfo ? <Redirect to="/" /> : <Login />}
        </Route>
        // Home Page
        <Route exact path='/' component={Home} />
        // Register Page
        <Route path="/register">
          {userInfo ? <Redirect to="/" /> : <Register />}{" "}
        </Route>
        // User Profile Page
        <Route path='/user/:userId'>
          {!userInfo ? <Redirect to='/login' /> : <Profile />}
        </Route>
        // Courses Page
        <Route path='/courses' exact>
          <Categories />
          <Courses />
        </Route>
        // Individual Course Page
        <Route path='/course/:slug' exact component={Course} />
      </Switch>
    </Router>
  );
}

export default App;
