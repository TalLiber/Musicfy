import React, { useEffect } from "react";
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
import EventBus from 'react-native-event-bus'


const App = () => {

  const dispatch = useDispatch()
  const playlists = useSelector(state => state.playlistModule.playlists)

  useEffect(() => {
    getPlaylists()
  }, [])

  const getPlaylists = async () => {
    dispatch(loadPlaylists())
  }

  function closeModal() {
    EventBus.getInstance().fireEvent("closeModal")
  }

  if (!playlists) return <div>Loading...</div>
  return (
    <div onClick={closeModal}>
      <RouterProvider router={router}/>
    </div>
  )
}
export default App

