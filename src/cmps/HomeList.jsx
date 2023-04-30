import { useEffect, useState } from 'react'
import {HomePreview} from './HomePreivew' 

export const HomeList = ({playlists,idx, width}) => {

    const [playlistSlice,setPlaylistSlice] = useState(6)

    const onMoveToPlaylist = (idx) => {
        console.log(idx)
    }

    useEffect(() =>{
        if (width <= 770) setPlaylistSlice(2)
        else if(width > 770 && width < 975) setPlaylistSlice(3)
        else if(width >= 975 && width < 1300) setPlaylistSlice(4)
        else if(width >= 1300 && width < 1500) setPlaylistSlice(5)
        else if(width >= 1500 && width < 1700) setPlaylistSlice(6)
        else if(width >= 1700 && width < 1915) setPlaylistSlice(7)
        else if(width >= 1915 && width < 2120) setPlaylistSlice(8)
        else setPlaylistSlice(9)
    },[width])

    return (
        <div className='home-list'>
            <div className='home-list-header'>
                <h2>{idx === 0? 'Focus': 'Pop'}</h2>
                <button onClick={()=>{onMoveToPlaylist(id)}} className="btn-header">Show all</button>
            </div>
            <div className='home-list-grid'>
            {playlists.slice(0,playlistSlice).map((playlist,idx) => {
                return <HomePreview key={idx} playlist = {playlist}/>
            })}
            </div>
        </div>
    )
}