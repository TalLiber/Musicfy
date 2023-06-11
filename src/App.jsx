import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./assets/styles/styles.scss";
import { router } from './router'

import { useDispatch, useSelector } from 'react-redux'
import {
  loadPlaylists,
  removePlaylist,
  setFilterBy
} from './store/actions/playlists.actions'
import { loadCategories } from "./store/actions/categories.actions";


const App = () => {

  const dispatch = useDispatch()
  const playlists = useSelector(state => state.playlistModule.playlists)

  useEffect(() => {
    getPlaylists()
  }, [])
  
  const getPlaylists = async () => {
    dispatch(loadPlaylists())
  }

  if (!playlists) return <div>Loading...</div>
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export default App

