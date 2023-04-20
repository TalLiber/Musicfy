import React, { useEffect, useRef } from 'react'
import { useNavigate, useLocation, NavLink } from 'react-router-dom'

import SvgIcon from './SvgIcon'

export const Header = (props) => {

    const navigator = useNavigate()
    const location = useLocation()
    const isPrev = useRef(location.key === 'default')
    const isNext = useRef(location.key === 'default')

    useEffect(() => {
        isPrev.current = location.key !== 'default'
        isNext.current = location.key === 'default'
    }, [location.key])

    const handleClick = (num) => {
        // if(num === 1) navigator('/search') 
        // else navigator(num)
        navigator(num)
    }
    return (
        <section className='header-container flex'>
            <div className='action flex'>
                <button className='btn-action' disabled={isPrev.current} onClick={() => handleClick(-1)}>
                    {SvgIcon({ iconName: 'prev' })}
                </button>
                <button className='btn-action' disabled={isNext.current} onClick={() => handleClick(1)}>
                    {SvgIcon({ iconName: 'next' })}
                </button>
            </div>
            <div className='content-container'>
                hay
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
