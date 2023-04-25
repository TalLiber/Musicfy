import { useEffect } from 'react'
import {HomePreview} from './HomePreivew' 

export const HomeList = ({category}) => {

    const {id, name , playlists} = category

    useEffect(() => {
        // console.log('playlists',playlists)
    }, [])

    const onMoveToPlaylist = (id) => {
        console.log(id)
    }

    return (
        <div className='home-list'>
            <div className='home-list-header'>
                <h2>{name}</h2>
                <button onClick={()=>{onMoveToPlaylist(id)}} className="btn-header">Show all</button>
            </div>
            <div className='home-list-grid'>
            {playlists.map((playlist) => {
                return <HomePreview key={playlist.id} playlist = {playlist}/>
            })}
            </div>
        </div>
    )
}