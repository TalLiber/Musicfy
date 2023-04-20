import { NavLink } from 'react-router-dom'

import SvgIcon from './SvgIcon'
import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";

export const SideNav = () => {
  const location = useLocation();
  const [selected, setSelected] = useState('home')

  useEffect(()=>{
    (location.pathname === `/`) ? setSelected('home') : setSelected(`${location.pathname.slice(1)}`)
  },[location.pathname])

  const NavCateg = [{ title: 'Home', icon: 'home', path: '/' },
  { title: 'Search', icon: 'search', path: '/search' },
  { title: 'Your Library', icon: 'lib', path: '/lib' }]

  return (

    <div className='side-nav-container'>
      <i className='logo' >{SvgIcon({ iconName: 'logo' })}</i>

      {NavCateg.map((categ, idx) => {
        return (
          <NavLink to={categ.path} >
            <div key={idx} className='nav-categ'>
              <i className='side-icon'>{SvgIcon({ iconName: categ.icon === selected ? selected + '-full' : categ.icon })}</i>
              <p>{categ.title}</p>
            </div>
          </NavLink>)
      })}
    </div>
  )
}
