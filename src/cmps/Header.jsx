import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import EventBus from 'react-native-event-bus'
import { useSelector, useDispatch } from "react-redux"
import { updatePlayer } from '../store/actions/player.actions'


import SvgIcon from './SvgIcon'
import { svgService } from '../services/svg.service'
import svgIcon from './SvgIcon'

export const Header = (props) => {

    const navigator = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const playerSettings = useSelector(state => state.playerModule)
    const playlistColor = useSelector(state => state.playlistModule.playlistColor)
    const [isPrev,setIsPrev] = useState()
    const [isNext,setIsNext] = useState()
    const [currPath,setCurrpath] = useState()
    const [isSearch, setIsSearch] = useState()
    const [isPlaylist, setIsPlaylist] = useState()
    const [opacityLevel,setOpacityLevel] = useState("80")
    const [headerBgc, setHeaderBgc] = useState("#00000080")
    const [headerName, setHeaderName] = useState('')
    const [isFocus, setIsFocus] = useState(false)

    useEffect(() => {
        EventBus.getInstance().addListener("toggleOpacity",  (data) =>{
            if(data){
                setOpacityLevel("80")
                setHeaderBgc(prevState=> {
                    return prevState.slice(0,7) + '80'
                })
            } 
            else {
                setOpacityLevel("ff")
                setHeaderBgc(prevState => {
                    console.log(prevState.slice(0,7))
                    return prevState.slice(0,7) + 'ff'
                })
            }
        })
        
        return EventBus.getInstance().removeListener("toggleOpacity")
    },[])

    useEffect(() => {
        setCurrpath(location.pathname)
        location.pathname.includes('Playlist')? setIsPlaylist(true) : setIsPlaylist(false)
        location.pathname.includes('search')? setIsSearch(true) : setIsSearch(false)
    },[location.pathname])
    
    useEffect(() => {
        setHeaderBgc(playlistColor + '80')
    }, [playlistColor])

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
        <section className='header-container flex' style={{'backgroundColor':!isSearch? headerBgc : "#000000ff"}}>
            <div className='action flex'>
                <button className='btn-action' disabled={isPrev} onClick={() => handleClick(-1)}>
                    {SvgIcon({ iconName: 'prev' })}
                </button>
                <button className='btn-action' disabled={isNext} onClick={() => handleClick(1)}>
                    {SvgIcon({ iconName: 'next' })}
                </button>
            </div>
            <section className='content-container'>
                { isPlaylist && 
                    <button className='btn-play' hidden={!headerName} onClick={() => dispatch(updatePlayer('isPlaying', !playerSettings.isPlaying))}>
                        {SvgIcon({ iconName: playerSettings.isPlaying ? 'player-pause' : 'player-play' })}
                    </button>
                }
                <div>{headerName}</div>
                { isSearch &&
                    <div className={isFocus?' search-box focus': 'search-box'}>
                        {svgIcon({iconName: 'search'})}
                        <input type="text" onFocus={()=>setIsFocus(true)} onBlur={()=>setIsFocus(false)} placeholder='What do you want to listen to?' />
                    </div>
                }
            </section>
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
