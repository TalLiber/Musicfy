import React, { useEffect, useState } from 'react'

import { useNavigate } from "react-router-dom"
import { playlistService } from '../services/playlist.service'
import { useSelector, useDispatch } from "react-redux"

import { PlaylistList } from '../cmps/PlaylistList'
import { SearchList } from '../cmps/SearchList'

export const Search = () => {

  const categories = playlistService.getCategories()
  const navigate = useNavigate()

  const searchItems = useSelector(state => state.playlistModule.searchItems)
  const searchType = useSelector(state => state.playlistModule.searchType)

  useEffect(() => {
    console.log('searchItems', searchItems);
    console.log('searchType', searchType);
  }, [searchType, searchItems])

  return (
    <>
    {!searchItems.length && <section className='search-container'>
      <h3>Browse all</h3>
      <section className='categories-container'>
        {categories.map(categ => {
          return (<article className='category-card' style={{ backgroundColor: categ.backgroundColor }} onClick={() => navigate({
            pathname: `/Category/${categ.id}`,
            search: `?name=${categ.name}`
          })} key={categ.id}>
            <p>{categ.name}</p>
            <img src={categ.image} />
          </article>)
        })}
      </section>
    </section>}
    {searchItems.length && searchType === 'track' && <PlaylistList playlist={searchItems} origin='search'/>}
    {searchItems.length && searchType === 'playlist' || searchType === 'album' && <SearchList searchItems={searchItems}/>}
    </>
  )
}
