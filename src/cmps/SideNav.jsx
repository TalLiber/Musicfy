import SvgIcon from './SvgIcon'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"

import { SideItem } from './SideItem'

export const SideNav = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    (location.pathname === `/`) ? setSelected('home') : setSelected(`${location.pathname.slice(1)}`)
  }, [location.pathname])

  const NavCateg = [{ title: 'Home', icon: 'home', path: '' },
  { title: 'Search', icon: 'search', path: 'search' },
  { title: 'Your Library', icon: 'lib', path: 'lib' },
  { title: 'Create Playlist', icon: 'plus', path: 'create'},
  { title: 'Liked Songs', icon: 'heart', path: 'lib' },
  ]

  const directTo = (path) => {
    if(path === 'create') {
      addPlaylist()
      path = ''
    }
    navigate('/' + path)
  }

  function addPlaylist() {
    console.log('hi');
  }

  return (

    <div className='side-nav-container'>
      <i className='logo' >{SvgIcon({ iconName: 'heart' })}</i>

      <section className='upper-container'>
        {NavCateg.map((categ, idx) => {
          return (
            <SideItem categ={categ} selected={selected} directTo={directTo} key={idx}/>
          )
        })}
      </section>
    </div>
  )
}

// "editor.mouseWheelZoom": true,