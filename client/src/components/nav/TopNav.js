
import { useState, useEffect, useContext } from 'react'
import { Avatar, Badge, Menu } from 'antd';
import {AppstoreOutlined, CoffeeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, CarryOutOutlined, TeamOutlined, UserOutlined} from '@ant-design/icons'
import { Link, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUserDetails, } from '../../actions/userActions'

const { Item, SubMenu, ItemGroup } = Menu

const TopNav = () => {
  const { userId } = useParams()

  const [current, setCurrent] = useState("")

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  
  const dispatch = useDispatch()
  const logoutHandler = () => { dispatch(logout())}

  useEffect(() => { dispatch(getUserDetails(userId))}, [dispatch, userId])

  return (
    <Menu mode="horizontal" selectedKeys={[current]} className='mb-2'>
      <Item key="Dashboard" onClick={(e) => setCurrent(e.key)} icon={<AppstoreOutlined />}>
        <Link to="/"><a>Online-Uni</a></Link>
      </Item>
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
    </Menu>
  )
}
export default TopNav

/*
  {user && user.role && user.role.includes('Instructor') ? (
  <Item key="/instructor/course/create" onClick={(e) => setCurrent(e.key)} icon={<CarryOutOutlined />}><Link href="/instructor/course/create"><a>Create Course</a></Link></Item>
    ) : (
  <Item key="/user" onClick={(e) => setCurrent(e.key)} icon={<TeamOutlined />}><Link to="/user"><a>User Profile</a></Link></Item>
  )}
  <Item key="/instructor/course/create" onClick={(e) => setCurrent(e.key)} icon={<CarryOutOutlined />}><Link href="/instructor/course/create"><a>Create Course</a></Link></Item>
      
 return (

   {user && user.role && user.role.includes('Instructor') ? (
    <Item key="/instructor/course/create" onClick={(e) => setCurrent(e.key)} icon={<CarryOutOutlined />}><Link href="/instructor/course/create"><a>Create Course</a></Link></Item>
   ) : (
    <Item key="/user/become-instructor" onClick={(e) => setCurrent(e.key)} icon={<TeamOutlined />}><Link href="/user/become-instructor"><a>Become Instructor</a></Link></Item>
   )}

   {user && user.role && user.role.includes('Instructor') && 
    (<Item key="/instructor" onClick={(e) => setCurrent(e.key)} icon={<TeamOutlined />} className='float-right'><Link href="/instructor"><a>Instructor</a></Link></Item>)}
  </Menu>
 )
}

export default TopNav*/
