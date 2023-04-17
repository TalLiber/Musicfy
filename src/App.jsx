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
} from './store/actions/items.actions'

import SvgIcon from './cmps/SvgIcon'

{/* <SvgIcon iconname='logo' /> */ }
const App = () => {

  const [items, setItems] = useState(null)

  const value = useSelector(state => state.itemModule.items)
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
      <header>
        app header
        {/* <SvgIcon iconName='logo' /> */}
        {/* {value} */}
      </header>
      <RouterProvider router={router} />
      <footer>
        app footer
      </footer>
    </>
  )
}
export default App

