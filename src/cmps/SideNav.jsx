import React from 'react'
import SvgIcon from './SvgIcon'

export const SideNav = () => {

const NavCat = []

 return (
  <div className='side-nav-container'>
    <i className='logo' >{SvgIcon({iconName:'logo'})}</i>

    {NavCat.forEach(cat => {
      <div>
        <i className='side-icon' >{SvgIcon({iconName:'home'})}</i>
        <p>Home</p>
      </div>
    })}
    <div>
      <i className='side-icon' >{SvgIcon({iconName:'home'})}</i>
      <p>Home</p>
    </div>
    <i className='side-icon' >{SvgIcon({iconName:'search'})}</i>
    <p>Search</p>
    <i className='side-icon' >{SvgIcon({iconName:'lib'})}</i>
    <p>Your Library</p>
  </div>
 )
}
