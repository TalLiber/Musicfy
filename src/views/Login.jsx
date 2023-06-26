import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SvgIcon  from '../cmps/SvgIcon'

export const Login = () => {

    const dispatch = useDispatch()


    useEffect(() => {
    }, [])

    
    return (
        <section className='login'>
            <section className='header'>
            <div className='logo'>{SvgIcon({ iconName: 'logo' })} <h2>Musicfy</h2> </div>
            </section>

            <section className='login-container'>
                <section className='login-actions'>
                    <h2>Log in to Musicfy</h2>
                    <button className='login-google'>
                        <div className='google-icon' >{SvgIcon({iconName:'google-g'})}</div>
                        <span>
                            Continue with Google
                        </span>
                    </button>
                </section>
            </section>
        </section>
    )
}
