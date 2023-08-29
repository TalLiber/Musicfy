import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { HomePreview } from '../cmps/HomePreivew'
import { useObserver } from '../customHooks/useObserver'
import { useHeaderObserver } from '../customHooks/useHeaderObserver'
import { getCategoryPlaylists } from '../store/actions/categories.actions'
import { playlistService } from '../services/playlist.service'

export const Category = ({searchItems, origin}) => {

    const categoryPlaylist = origin === 'search' ? searchItems : useSelector(state => state.categoryModule.catagoryPlaylists)
    const categories = playlistService.getCategories()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const [cmpStyle, setCmpStyle] = useState(null)
    const [containerRef] = useObserver()
    const [headerRef, setHeaderName] = useHeaderObserver()
    const [searchParams] = useSearchParams()
    const [category, setCategory] = useState({})

    useEffect(() => {
        if(origin === 'search') return
        getCategory()
        const currCategory = categories.find(cate=> cate.id === params.id)
        setCategory(currCategory)
        setHeaderName.current = currCategory.name
        setCmpStyle({'backgroundColor':currCategory.backgroundColor})
    }, [params.id])


    async function getCategory() {
        dispatch(getCategoryPlaylists(params.id))
    }

    if (!categoryPlaylist) return (<div> loading... </div>)
    return (
        <section className='category'>
            <div ref={containerRef}></div>
            {origin !== 'search' && <section className='category-header' style={cmpStyle}>
                <h1>{category.name}</h1>
                <div ref={headerRef}></div>
            </section>}

            <section className='category-list'>
                {categoryPlaylist.map(item => {
                    return <HomePreview playlistData={item} key={item.spotifyId} />
                })}
            </section>

        </section>
    )
}