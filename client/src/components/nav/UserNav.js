import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const UserNav = () => {
 const [current, setCurrent] = useState('')

 return (
  <div className='nav flex-column nav-pills mt-2'>
   <Link href='/user'>
    <a className={`nav-link ${current === '/user' && 'active'}`}>Dashboard</a>
   </Link>
  </div>
 )
}

export default UserNav
