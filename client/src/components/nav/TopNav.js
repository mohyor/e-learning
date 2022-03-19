
import { useState, useEffect, useContext } from 'react'
import { Menu } from 'antd'
import {AppstoreOutlined, CoffeeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined, CarryOutOutlined, TeamOutlined} from '@ant-design/icons'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const { Item, SubMenu, ItemGroup } = Menu

const TopNav = () => {
  const [current, setCurrent] = useState("")
  const { user } = useContext(AuthContext)

  const logout = async() => { logout(dispatch)}

  return (
    <Menu mode="horizontal" selectedKeys={[current]} className='mb-2'>
      <Item key="/" onClick={(e) => setCurrent(e.key)} icon={<AppstoreOutlined />}><Link to="/"><a>Online-Uni</a></Link></Item>
      {user && user.role && user.role.includes('Instructor') ? (
      <Item key="/instructor/course/create" onClick={(e) => setCurrent(e.key)} icon={<CarryOutOutlined />}><Link href="/instructor/course/create"><a>Create Course</a></Link></Item>
        ) : (
      <Item key="/user" onClick={(e) => setCurrent(e.key)} icon={<TeamOutlined />}><Link to="/user"><a>User Profile</a></Link></Item>
      )}
      {/*<Item key="/instructor/course/create" onClick={(e) => setCurrent(e.key)} icon={<CarryOutOutlined />}><Link href="/instructor/course/create"><a>Create Course</a></Link></Item>*/}
      
      {user === null && (
       <>
        <Item key="/login" onClick={(e) => setCurrent(e.key)} icon={<LoginOutlined />}><Link to="/login"><a>Login</a></Link></Item>
        <Item key="/register" onClick={(e) => setCurrent(e.key)} icon={<UserAddOutlined />}><Link to="/register"><a>Register</a></Link></Item>
       </>
      )}

      {user !== null && (
       <SubMenu icon={<CoffeeOutlined />} title={user && user.name} className="float-right">
        <ItemGroup>
         <Item key='/user'><Link href='/user'><a>Dashboard</a></Link></Item>
         <Item onClick={logout} icon={<LogoutOutlined />} >Logout</Item>
        </ItemGroup>
       </SubMenu>
   )}
    </Menu>
  )
}
export default TopNav

/*
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
