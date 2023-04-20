import React from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../cmps/Header'
import { SideNav } from '../cmps/SideNav'
import { MediaPlayer } from '../cmps/MediaPlayer'

export const AppIndex = () => {
 return (
  <section className='main-layout'>
    <SideNav/>
    <section className='content-container'>
      <Header/>
      <Outlet/>
    </section>
    <MediaPlayer/>
  </section>
 )
}

