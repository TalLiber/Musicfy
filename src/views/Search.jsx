import React from 'react'

import { useNavigate } from "react-router-dom"
import { playlistService } from '../services/playlist.service'

export const Search = () => {

  const categories = playlistService.getCategories()
  const navigate = useNavigate()

  return (
    
    <section className='search-container'>
      <h3>Browse all</h3>
      <section className='categories-container'>
        {categories.map(categ => {
          return (<article className='category-card' style={{ backgroundColor: categ.backgroundColor }} onClick={() => navigate(`/Category/${categ.id}`)}>
            <p>{categ.name}</p>
            <img src={categ.imgUrl} />
          </article>)
        })}
      </section>
    </section>
  )
}
