import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { categoryService } from "../services/category.service"
import { HomePreview } from '../cmps/HomePreivew'
import { useObserver } from '../customHooks/useObserver'
import { useHeaderObserver } from '../customHooks/useHeaderObserver'

export const Category = () => {
    
    const [category, setCategory] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const [cmpStyle, setCmpStyle] = useState(null)
    const [containerRef] = useObserver()
    const [headerRef, setHeaderName] = useHeaderObserver()
    const [searchParams] = useSearchParams() 

    useEffect(() => {
        getCategory()
     },[params.id])
 
     //TODO: Component use service directly?
     const getCategory = async () => {
        const category = await categoryService.getById(params.id, searchParams.get('name'))
        setCategory(category)
        // setCmpStyle({'backgroundColor':category.backgroundColor})
        setHeaderName.current = category.name
     }

    if(!category) return (<div> loading... </div>)
    return (
        <section className='category'>
            <div ref={containerRef}></div>
            <section className='category-header' style={cmpStyle}>
                <h1>{category.name}</h1>
                <div ref={headerRef}></div>
            </section>

            <section className='category-list'>
                {category.items.map(item => {
                    return <HomePreview playlistData={item} key={item.id}/>
                })}
            </section>

        </section>
    )
}