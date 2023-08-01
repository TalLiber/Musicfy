import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/actions/user.actions'


import SvgIcon  from '../cmps/SvgIcon'

export const Signup = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currUser = useSelector(state => state.userModule.loggedInUser)


    useEffect(() => {
        console.log(currUser)
        if(currUser.fullname) navigate('/')
    }, [currUser.fullname])

    function loginUser(ev) {
        ev.preventDefault()
        const user = {username:ev.target[0].value, password: ev.target[1].value}
        dispatch(login(user))
        ev.target[0].value = ''
        ev.target[1].value = ''
    }

    
    return (
        <section className='signup'>
            <section className='header'>
            <div className='logo' onClick={() => navigate('/')}>{SvgIcon({ iconName: 'logo' })} <h2>Musicfy</h2> </div>
            <h2 className='header-txt'>Sign up for free to listen.</h2>
            </section>

            <button className='login-google'>
                <div className='google-icon' >{SvgIcon({iconName:'google-g'})}</div>
                <span>
                    Sign up with Google
                </span>
            </button>

            <span className='or'>Or</span>

            <section className='form-container'>
                <h1 className='form-txt'>Sign up using Email address</h1>
                <form action="" className='signup-form' onSubmit={() => console.log('submit')}>

                    <label htmlFor="email">
                        <span>What's your email?</span>
                        <input id='email' type="text" placeholder='Type in youre Email address'/>
                    </label>

                    <label htmlFor="password">
                        <span>Create password</span>
                        <input id='password' type="password" placeholder='Type in youre password'/>
                    </label>
                    
                    <label htmlFor="username">
                        <span>What will be youre username?</span>
                        <input id='username' type="text" placeholder='Type in youre username'/>
                    </label>

                    <button className='signup-btn'>Sign Up</button>
                </form>
            </section>

            <section className='login-navigate'>
                <span className='txt'>Have an account? </span>
                <span className='navigate' onClick={() => navigate(`/login`)}>
                    Log in.
                </span>
            </section>
        </section>
    )
}
