import "./TopBar.css"
import { useState, useEffect } from 'react'
import { Link, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserDetails, logout } from '../../../actions/userActions'


export default function Topbar() {
    const { userId } = useParams()
    //const { Search } = Input;

    const [current, setCurrent] = useState("")

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()
    const logoutHandler = () => { dispatch(logout())}

    useEffect(() => { dispatch(getUserDetails(userId))}, [dispatch, userId])
  
    return (
        <div className="topbarContainer">
        <div className="topbarLeft">
            <Link to='/' style={{ textDecoration:"none" }}>
            <span className="logo">Educate</span>
            </Link>
        </div>
        <div className="topbarCenter">
            <div className="searchBar">
            <Search className="searchIcon" />
            <input placeholder="Search for friends and posts" className="searchInput" />
            </div>
        </div>
        {!userInfo ? (
       <>
        <Item key="Login" onClick={(e) => setCurrent(e.key)} icon={<LoginOutlined />}>
          <Link to="/login"><a>Login</a></Link>
        </Item>
        <Item key="Register" onClick={(e) => setCurrent(e.key)} icon={<UserAddOutlined />}>
          <Link to="/register"><a>Register</a></Link>
        </Item>
       </>
      ) : (
       <SubMenu icon={<UserOutlined />} title={userInfo.name} className="float-right">
        <ItemGroup>
          <Item key='profile'>
          <Link to={`/user/${userId}`}><a>Profile</a></Link>
          </Item>
          <Item onClick={logoutHandler} icon={<LogoutOutlined />}>
            <Link to='/logout'><a>Logout</a></Link>
          </Item>
        </ItemGroup>
       </SubMenu>
      )}
      {!userInfo ? (

      ) : (
        <div className="topbarRight">
            <div className="topbarLinks">
            <span className="topbarLink">Timeline</span>
            <Link to={`/user/${userId}`}>
            {/*<img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="topbarImg" />*/}
            </Link>
        </div>  
      )}
      </div>
    )
    }
