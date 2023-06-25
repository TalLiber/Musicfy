import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { HomePreview } from '../cmps/HomePreivew'
import { useObserver } from '../customHooks/useObserver'
import { useHeaderObserver } from '../customHooks/useHeaderObserver'
import { getCategoryPlaylists } from '../store/actions/categories.actions'

export const Category = () => {

    const category = useSelector(state => state.categoryModule.catagoryPlaylists)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const [cmpStyle, setCmpStyle] = useState(null)
    const [containerRef] = useObserver()
    const [headerRef, setHeaderName] = useHeaderObserver()
    const [searchParams] = useSearchParams()

    useEffect(() => {
        getCategory()
    }, [params.id])

    async function getCategory() {
        dispatch(getCategoryPlaylists(params.id))
        // setCmpStyle({'backgroundColor':category.backgroundColor})
        setHeaderName.current = category?.name
    }

    if (!category) return (<div> loading... </div>)
    return (
        <section className='category'>
            <div ref={containerRef}></div>
            <section className='category-header' style={cmpStyle}>
                <h1>{category.name}</h1>
                <div ref={headerRef}></div>
            </section>

            <section className='category-list'>
                {category.map(item => {
                    return <HomePreview playlistData={item} key={item.spotifyId} />
                })}
            </section>

        </section>
    )
}