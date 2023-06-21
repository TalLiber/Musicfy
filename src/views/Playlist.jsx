import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useHeaderObserver } from '../customHooks/useHeaderObserver'
import { useObserver } from '../customHooks/useObserver'
import { usePalette } from 'react-palette'
import { changePlaylistColor, setPlaylist, updateTrackIdx } from '../store/actions/playlists.actions'
import { PlaylistList } from '../cmps/PlaylistList'
import { updatePlayer } from '../store/actions/player.actions'

import SvgIcon from '../cmps/SvgIcon'


export const Playlist = () => {

    const dispatch = useDispatch()
    const playlist = useSelector(state => state.playlistModule.currPlaylist)
    const playerSettings = useSelector(state => state.playerModule)
    const params = useParams()
    const [headerRef, setHeaderName] = useHeaderObserver()
    const [containerRef] = useObserver()
    const imgColor = useRef(null)
    const { data, loading, error } = usePalette(imgColor.current)

    useEffect(() => {
        getPlaylist()
        setPlaylistTracks()
    }, [params.id])
    
    useEffect(()=>{
        console.log(playlist)
    },[playlist.name])

    useEffect(() => {
        // console.log(data)
        dispatch(changePlaylistColor(data.darkVibrant))
    }, [data])

    useEffect(() => {
        return () => {
            dispatch(changePlaylistColor('#000000'))
        }
    }, [])

    const setPlaylistTracks = async () => {
        console.log('params.id', params.id);
        dispatch(setPlaylist('tracks', params.id))
    }
    
    const getPlaylist = async () => {
        setHeaderName.current = playlist.name
        setTimeout(() => {
            imgColor.current = playlist.image
        }, 1000)
    }

    const playTrack = (trackIdx,isPlaying) =>{
        dispatch(updateTrackIdx('num', trackIdx))
        dispatch(updatePlayer('isPlaying', isPlaying))
    }
    // if (!playerSettings.isPlaying) return <div>Loading...</div>
    return (
        <section className="playlist">
            <section className='playlist-header' style={{ backgroundColor: data.vibrant }}>
                <div className='img-container'>
                    <img src={playlist.image} alt="" />
                </div>
                <section className='playlist-info'>
                    <p>Playlist</p>
                    <h1 className='playlist-name'>{playlist.name}</h1>
                    <p className='playlist-disc'>{playlist.description}</p>
                </section>
            </section>
            <section className='playlist-action' style={{ backgroundColor: data.darkVibrant }}>
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
