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
  loadItem,
  removeItem,
  setFilterBy
} from './store/actions/playlists.actions'

import SvgIcon from './cmps/SvgIcon'

{/* <SvgIcon iconname='logo' /> */ }
const App = () => {

  const [items, setItems] = useState(null)

  const value = useSelector(state => state.playlistModule.items)
  console.log('value:', value)
  const dispatch = useDispatch()
  useEffect(() => {
    getItems()
  }, [items])

  const getItems = async () => {
    dispatch(loadItem())
  }

  if (!value) return <div>Loading...</div>
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export default App

