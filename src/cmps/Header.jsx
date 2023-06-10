import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import EventBus from 'react-native-event-bus'

import SvgIcon from './SvgIcon'

export const Header = (props) => {

    const navigator = useNavigate()
    const location = useLocation()
    const [isPrev,setIsPrev] = useState()
    const [isNext,setIsNext] = useState()
    const [opacityLevel,setOpacityLevel] = useState("0.5")
    const [headerBcg,setHeaderBcg] = useState("rgba(0,0,0)")
    const [headerName, setHeaderName] = useState('')

    useEffect(() => {
        EventBus.getInstance().addListener("toggleOpacity",  (data) =>{
            data? setOpacityLevel("0.5") : setOpacityLevel("1")
        })

        return EventBus.getInstance().removeListener("toggleOpacity")
    },[])
    
    useEffect(() => {
        EventBus.getInstance().addListener("changeBgc",  (data) =>{
            console.log('hay')
            setHeaderBcg(data)
        })
            
        return EventBus.getInstance().removeListener("changeBGC")

    },[])

    useEffect(() => {
        EventBus.getInstance().addListener("headerName",  (data) =>{
            setHeaderName(data)
        })

        return EventBus.getInstance().removeListener("headerName")
    },[])

    useEffect(() => {
        setIsPrev(location.key === 'default') 
        setIsNext(history.length > 1 && history.length - history.state.idx === 1)
    }, [location.key])

    const handleClick = (num) => {
        navigator(num)
    }

    return (
        <section className='header-container flex' style={{'backgroundColor':headerBcg,'opacity':opacityLevel}}>
            <div className='action flex'>
                <button className='btn-action' disabled={isPrev} onClick={() => handleClick(-1)}>
                    {SvgIcon({ iconName: 'prev' })}
                </button>
                <button className='btn-action' disabled={isNext} onClick={() => handleClick(1)}>
                    {SvgIcon({ iconName: 'next' })}
                </button>
            </div>
            <div className='content-container'>
                <div>{headerName}</div>
            </div>
            <div className='login-container'>
                <button className='btn-signup'>Sign up</button>
                <button className='btn-login'>
                    <span>
                        Log in
                    </span>
                </button>
            </div>
            {/* <NavLink to="/search">Search</NavLink>   */}
        </section>
    )
}
