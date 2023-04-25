import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { HomeList } from '../cmps/HomeList'

export const Home = () => {

    const playlists = useSelector(state => state.playlistModule.playlists)
    const categories = [{id:1, name:'Focus',playlists},{id:2, name:'Pop', playlists}]
    const containerRef = useRef(null)

    const [isVisible,setIsVisible] = useState(false) 
    const options ={
        root: null,
        rootMargin: "0px",
        threshold: 1.0
    }
    const cb = () => {
        setIsVisible(prevState => !prevState)
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
            <div ref={containerRef}>{isVisible? 'yes' : 'no'}</div>
            {categories.map((category,idx) => {
                return <HomeList category={category} key={idx}/>
            })}
        </div>
    )
}
