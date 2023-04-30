import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EventBus from 'react-native-event-bus'

import { HomeList } from '../cmps/HomeList'
import { loadCategories, setFilterBy } from '../store/actions/categories.actions'

export const Home = () => {

    const playlists = useSelector(state => state.playlistModule.playlists)
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categoryModule.categories)
    const containerRef = useRef(null)

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
    });

    const handleResize = () => {
        setDimensions({
            width: window.innerWidth,
        });
    }

    useEffect(() => {
      window.addEventListener("resize", handleResize)

      return () => {window.removeEventListener("resize", handleResize)}

    }, [])

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
       getCategories({txt:"HomePage"})
    },[])

    const getCategories = async (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadCategories())
    }

    useEffect(() => {
        const observer = new IntersectionObserver(cb,options)
        if(containerRef.current) observer.observe(containerRef.current)

        return () => {
            if(containerRef.current) observer.unobserve(containerRef.current)
        }
    }, [containerRef])


    if(!categories) return <div> Loading... </div> 
    return (
        <div className='home-container'>
            <div ref={containerRef}></div>
            {categories.map((category,idx) => {
                return <HomeList playlists={category.items} idx={idx} key={idx} width={dimensions.width}/>
            })}
        </div>
    )
}
