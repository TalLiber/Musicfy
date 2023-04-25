import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { HomeList } from '../cmps/HomeList'

export const Home = () => {

    const playlists = useSelector(state => state.playlistModule.playlists)

    useEffect(() => {
        // console.log('playlists',playlists)
    }, [])


    return (
        <div className='home-container'>
            <HomeList playlists={playlists}/>
        </div>
    )
}
