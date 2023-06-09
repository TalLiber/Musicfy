import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useHeaderObserver } from '../customHooks/useHeaderObserver'
import { useObserver } from '../customHooks/useObserver'
import { changePlaylistColor, getPlaylistById, updateTrackIdx } from '../store/actions/playlists.actions'
import { PlaylistList } from '../cmps/PlaylistList'
import { updatePlayer } from '../store/actions/player.actions'
import { FastAverageColor } from 'fast-average-color'

import SvgIcon from '../cmps/SvgIcon'


export const Playlist = () => {
    
    const dispatch = useDispatch()
    const playlist = useSelector(state => state.playlistModule.currPlaylist)
    const playerSettings = useSelector(state => state.playerModule)
    const params = useParams()
    const [headerRef, headerName] = useHeaderObserver()
    const [containerRef] = useObserver()
    const [bgc, setBgc] = useState()
    const fac = new FastAverageColor()
    

    useEffect(() => {
        dispatch(getPlaylistById(params.id))
    }, [params.id])
    
    useEffect(() => {
        console.log(playlist)
        headerName.current = playlist.name
        fac.getColorAsync(playlist.image)
            .then(color => {
                setBgc(color.rgba)
                dispatch(changePlaylistColor(color.hexa))
            })
            .catch(e => {
                console.log(e)
            })
    },[playlist.name])

    useEffect(() => {
        return () => {
            dispatch(changePlaylistColor('#000000'))
        }
    }, [])

    const playTrack = (trackIdx,isPlaying) =>{
        dispatch(updateTrackIdx('num', trackIdx))
        dispatch(updatePlayer('isPlaying', isPlaying))
    }
    if (playlist.spotifyId !== params.id) return <div>Loading...</div>
    return (
        <section className="playlist">
            <section className='playlist-header' style={{ backgroundColor: bgc || ''}}>
                <div className='img-container'>
                    <img src={playlist.image} alt="" />
                </div>
                <section className='playlist-info'>
                    <p>Playlist</p>
                    <h1 className='playlist-name'>{playlist.name}</h1>
                    <p className='playlist-disc'>{playlist.description}</p>
                </section>
            </section>
            <section className='playlist-action' style={{ backgroundColor: bgc || '' }}>
                <button className='btn-play' onClick={() => dispatch(updatePlayer('isPlaying', !playerSettings.isPlaying))}>
                    {SvgIcon({ iconName: playerSettings.isPlaying ? 'player-pause' : 'player-play' })}
                </button>
                <button className='btn-heart'>
                    {SvgIcon({ iconName: 'heart-no-fill' })}
                </button>
                <button className='btn-more'>{SvgIcon({ iconName: 'dots' })}</button>
                <div ref={headerRef}></div>
            </section>
            <div ref={containerRef}></div>
            <PlaylistList playlist={playlist} playTrack={playTrack}/>
        </section>
    )
}




//   {
//     darkMuted: "#2a324b"
//     darkVibrant: "#0e7a4b"
//     lightMuted: "#9cceb7"
//     lightVibrant: "#a4d4bc"
//     muted: "#64aa8a"
//     vibrant: "#b4d43c"
//   }
