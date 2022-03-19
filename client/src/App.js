import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react"
import Register from './pages/user/register/register'
import Home from './pages/home'
import Login from './pages/user/login/login'
import Profile from './pages/user/profile'
//import { AuthContext } from './context/AuthContext';
import Courses from './pages/courselist'
import Course from './pages/course/Course'
import { useDispatch, useSelector } from 'react-redux'
import TopNav from './components/nav/TopNav'
import 'antd/dist/antd.css'
import "./styles.css"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  //const { user } = useContext(AuthContext)
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  return (
    <Router>
      <ToastContainer position="top-center" />
      <TopNav />
      <Switch>
        <Route exact path='/'>
          {userInfo ? <Home /> : <Register />}
        </Route>
        <Route path="/login">
          {!userInfo ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/register">
          {!userInfo ? <Redirect to="/" /> : <Register />}{" "}
        </Route>
        <Route path='/user'>
          {!userInfo ? <Redirect to='/login' /> : <Profile />}
        </Route>
        <Route path='/courses' exact component={Courses} />
        <Route path='/course/:slug' exact component={Course} />
      </Switch>
    </Router>
  );
}

export default App;
