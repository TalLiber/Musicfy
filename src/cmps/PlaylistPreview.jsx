import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'

import { utilService } from '../services/util.service'
import SvgIcon from '../cmps/SvgIcon'


export const PlaylistPreview = ({ track, idx, playTrack }) => {

    const navigate = useNavigate()
    const playerSettings = useSelector(state => state.playerModule)
    const currTrack = useSelector(state => state.playlistModule.currPlaylist.tracks[state.playlistModule.currTrackIdx])

    useEffect(() => {
        console.log(track)
    }, [])

    const dateAdded = (addedAt) => {
        const currDate = new Date()
        const specificDate = new Date(addedAt)
        const diffInMs = currDate.getTime() -specificDate.getTime()
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
        const diffInDays = Math.floor(diffInHours / 24)
        const diffInWeeks = Math.floor(diffInDays / 7)
        const diffInMonths = Math.floor(diffInWeeks / 4)
        const diffInYears = Math.floor(diffInMonths / 12)
        
        if (diffInHours < 24) return diffInHours === 1 ? `${diffInHours} hour ago` : `${diffInHours} hours ago`
        if (diffInDays < 7) return diffInDays === 1 ? `${diffInDays} day ago` : `${diffInDays} days ago`
        if (diffInWeeks < 4) return diffInWeeks === 1 ? `${diffInWeeks} week ago` : `${diffInWeeks} weeks ago`
        if (diffInMonths < 12)return diffInMonths === 1 ? `${diffInMonths} month ago` : `${diffInMonths} months ago`
        return diffInDays === 1 ? `${diffInYears} year ago` : `${diffInYears} years ago` 
    }


    return (
        <section className='playlist-preview' onClick={() => console.log(track.title)}>
            <button className='btn-player' onClick={() => playTrack(idx, !(playerSettings.isPlaying && currTrack.id))}>
                {SvgIcon({ iconName: playerSettings.isPlaying && currTrack.id === track.id ? 'player-pause' : 'player-play' })}
            </button>
            <section className='track-info'>
                <h1 onClick={() => console.log(`track ${track.title}`)}>{track.title}</h1>
                <p onClick={() => console.log(`artist ${track.artists}`)}>{track.artists[0]}</p>
            </section>
            <section className='track-album' onClick={() => console.log(`album ${track.album}`)}>
                <p>{track.album}</p>
            </section>

            <section className='track-date'>
                <p>{dateAdded(track.addedAt)}</p>
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