import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HomeList } from '../cmps/HomeList'
import { loadCategories, setFilterBy } from '../store/actions/categories.actions'
import { useObserver } from '../customHooks/useObserver'

export const Home = () => {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.categoryModule.categories)
    const [containerRef] = useObserver()

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

    useEffect(() => {
        getCategories({txt:"HomePage"})
    },[])
    
    const getCategories = async (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadCategories())
    }


    if(!categories) return <div> Loading... </div> 
    return (
        <div className='home-container'>
            <div ref={containerRef}></div>
            {categories.map((category,idx) => {
                return <HomeList id={category.id} playlists={category.items} idx={idx} key={idx} width={dimensions.width}/>
            })}
        </div>
    )
}
