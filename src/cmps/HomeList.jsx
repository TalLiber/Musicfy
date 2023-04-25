import { useEffect } from 'react'
import {HomePreview} from './HomePreivew' 

export const HomeList = ({playlists}) => {


    useEffect(() => {
        // console.log('playlists',playlists)
    }, [])


    return (
        <div className='home-list'>
            {playlists.slice(0,6).map((playlist) => {
                return <HomePreview key={playlist.id} playlist = {playlist}/>
            })}
        </div>
    )
}