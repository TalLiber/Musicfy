import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

import { utilService } from '../services/util.service'
import SvgIcon from '../cmps/SvgIcon'


export const PlaylistPreview = ({ track, idx, playTrack, playlistId }) => {

    const navigate = useNavigate()
    const playerSettings = useSelector(state => state.playerModule)
    const currTrack = useSelector(state => state.playlistModule.currPlaylist.tracks[state.playlistModule.currTrackIdx])
    const currPlatlistId = useSelector(state => state.playlistModule.currPlaylist.id)

    useEffect(() => {
        console.log(track)
    }, [])


    return (
        <section className='playlist-preview' onClick={() => console.log(track.title)}>
            <button className='btn-player' onClick={() => playTrack(idx, (playerSettings.isPlaying && currTrack.id === track.id ? false : true))}>
                {SvgIcon({ iconName: playerSettings.isPlaying && currTrack.id === track.id ? 'player-pause' : 'player-play' })}
            </button>
            <section className='track-title'>
                <div className='track-img'>
                    <img src={track.imgUrl} alt="" />
                </div>
                <section className='track-info'>
                    <h1 className={playlistId === currPlatlistId && currTrack.id === track.id? 'green-header' : ''} onClick={() => console.log(`track ${track.title}`)}>{track.title}</h1>
                    <p onClick={() => console.log(`artist ${track.artists}`)}>{track.artists[0]}</p>
                </section>
            </section>
            <section className='track-album' onClick={() => console.log(`album ${track.album}`)}>
                <p>{track.album}</p>
            </section>

            <section className='track-date'>
                <p>{utilService.dateAdded(track.addedAt)}</p>
            </section>
            <section className='like-time'>
                <button className='btn-heart'>
                        {SvgIcon({ iconName: 'heart-no-fill' })}
                </button>
                <section className='track-duration'>
                    {utilService.timeFormat(track.formalDuration/600)}
                </section>
            </section>
        </section>
    )
}