import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useHeaderObserver } from '../customHooks/useHeaderObserver'
import { useObserver } from '../customHooks/useObserver'
import { changePlaylistColor, getPlaylistById, updateTrackIdx } from '../store/actions/playlists.actions'
import { PlaylistList } from '../cmps/PlaylistList'
import { updatePlayer } from '../store/actions/player.actions'
import { FastAverageColor } from 'fast-average-color'
import { removeUserPlaylist, addUserPlaylist, addUserTrack, removeUserTrack  } from '../store/actions/user.actions'

import SvgIcon from '../cmps/SvgIcon'


export const Playlist = () => {
    
    const dispatch = useDispatch()
    const playlist = useSelector(state => {return {...state.playlistModule.currPlaylist}})
    const playerSettings = useSelector(state => state.playerModule)
    const userPlaylists = useSelector(state => {return {...state.userModule.loggedInUser}})
    const params = useParams()
    const [headerRef, headerName] = useHeaderObserver()
    const [containerRef, isVisible] = useObserver()
    const [bgc, setBgc] = useState()
    const fac = new FastAverageColor()
    const [isLiked, setIsLiked] = useState(false)
    const navigate = useNavigate()
    

    useEffect(() => {
        dispatch(getPlaylistById(params.id))
    }, [params.id])
    
    useEffect(() => {
        setIsLiked(userPlaylists.playlist.some((playlist) => playlist.spotifyId === params.id || playlist.spotifyId + playlist.id === params.id))
    }, [userPlaylists.playlist.length, playlist.name])
    
    useEffect(() => {
        if (!playlist.image){
            setBgc('#000000')
            dispatch(changePlaylistColor('#000000'))
            return 
        } 
        isVisible.current = true
        if(playlist.spotifyId) headerName.current = playlist.name
        fac.getColorAsync(playlist.image)
        .then(color => {
            setBgc(color.rgba)
            dispatch(changePlaylistColor(color.hexa))
        })
        .catch(e => {
            console.log(e)
        })
    },[playlist?.name])
    
    useEffect(() => {
        return () => {
            dispatch(changePlaylistColor('#000000'))
        }
    }, [])

    function handlePlaylist(){
        if(isLiked){
            dispatch(removeUserPlaylist(params.id))
        }
        else{
            const playlistToAdd = {
                spotifyId: params.id,
                name: playlist.name,
                image:playlist.image
            }
            dispatch(addUserPlaylist(playlistToAdd))
        }
    }

    function handleTrack(isLiked, track) {
        if(isLiked) {
            dispatch(removeUserTrack(track.id))
        }
        else {
            dispatch(addUserTrack(track))
        }
    }

    const playTrack = (trackIdx,isPlaying) =>{
        dispatch(updateTrackIdx('num', trackIdx))
        dispatch(updatePlayer('isPlaying', isPlaying))
    }
    if (playlist.spotifyId !== params.id && playlist.spotifyId !== '1234s') return <div>Loading...</div>
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
                <button className={ isLiked ? 'btn-heart fill' : 'btn-heart'} onClick={handlePlaylist}>
                    {SvgIcon({ iconName: isLiked? 'heart-fill' : 'heart-no-fill' })}
                </button>
                <button className='btn-more' onClick={()=> navigate(`/create/${playlist.spotifyId + playlist._id}`)}>{SvgIcon({ iconName: 'dots' })}</button>
                <div ref={headerRef}></div>
            </section>
            <div ref={containerRef}></div>
            {playlist.tracks.length > 1 && <PlaylistList playlist={playlist} playTrack={playTrack} handleTrack={handleTrack}/>}
        </section>
    )
}