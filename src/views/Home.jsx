import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EventBus from 'react-native-event-bus'

import { HomeList } from '../cmps/HomeList'

export const Home = () => {

    const playlists = useSelector(state => state.playlistModule.playlists)
    const categories = [{id:1, name:'Focus',playlists},{id:2, name:'Pop', playlists}]
    const containerRef = useRef(null)

    const isVisible = useRef(false) 
    const options ={
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    }
    const cb = () => {
        isVisible.current = !isVisible.current
        EventBus.getInstance().fireEvent("test", isVisible.current)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(cb,options)
        if(containerRef.current) observer.observe(containerRef.current)

        return () => {
            if(containerRef.current) observer.unobserve(containerRef.current)
        }
    }, [containerRef])
    // }, [])


    return (
        <div className='home-container'>
            <div ref={containerRef}></div>
            {categories.map((category,idx) => {
                return <HomeList category={category} key={idx}/>
            })}
        </div>
    )
}
