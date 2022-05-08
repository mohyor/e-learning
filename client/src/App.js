import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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
      <ToastContainer position="top-center" />
      <Switch>
        <Route path="/login">
          {userInfo ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route exact path='/' component={Home} />
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
      </Switch>
    </Router>
  );
}

export default App;
