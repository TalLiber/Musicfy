import React from 'react'
import { playlistService } from '../services/playlist.service'

export const Search = () => {

  const categories = playlistService.getCategories()

  return (
    
    <section className='search-container'>
      <h3>Browse all</h3>
      <section className='categories-container'>
        {categories.map(categ => {
          console.log('categ', categ);
          return (<article className='category-card' style={{ backgroundColor: categ.backgroundColor }}>
            <p>{categ.name}</p>
            <img src={categ.imgUrl} />
          </article>)
        })}
      </section>
    </section>
  )
}
