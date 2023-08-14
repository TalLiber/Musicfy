import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useHeaderObserver } from '../customHooks/useHeaderObserver'
import { useObserver } from '../customHooks/useObserver'
import { changePlaylistColor, getEmptyPlaylist, getPlaylistById, updateTrackIdx, updatePlaylist } from '../store/actions/playlists.actions'
import { PlaylistList } from '../cmps/PlaylistList'
import { updatePlayer } from '../store/actions/player.actions'
import { FastAverageColor } from 'fast-average-color'
import { removeUserPlaylist, addUserPlaylist, addUserTrack, removeUserTrack  } from '../store/actions/user.actions'
import { ImageUpload } from '../cmps/ImageUpload'

import SvgIcon from '../cmps/SvgIcon'


export const EditPlaylist = () => {
    
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
    const [playlistValue, setPlaylistValue] = useState(playlist)
    const navigate = useNavigate()
    

    useEffect(() => {
        if (params.id) dispatch(getPlaylistById('1234s' + params.id))
        else dispatch(getEmptyPlaylist())
    }, [params.id])

    useEffect(() =>{
        if (playlist._id) navigate('/create/' + playlist._id)
    },[playlist._id])
    
    useEffect(() => {
        setIsLiked(userPlaylists.playlist.some((playlist) => playlist.spotifyId === params.id))
    }, [userPlaylists.playlist.length])
    
    useEffect(() => {
        setPlaylistValue(playlist)
        if (playlist.image === null){
            dispatch(changePlaylistColor('#000000'))
            setBgc('#000000')
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
    },[playlist.name,playlist.image,playlist.tracks,playlist.description])

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

    function handlePlaylist(ev){
        setPlaylistValue((prevState) => {
            prevState[ev.target.id] = ev.target.value
            prevState._id = playlist._id
            return prevState
        })
    }
    async function updatePlaylistImg(imgUrl){
        setPlaylistValue((prevState) => {
            prevState.image = imgUrl
            dispatch(updatePlaylist(prevState))
            return prevState
        })
    }
    // if (playlist.spotifyId !== 1234) return <div>Loading...</div>
    return (
        <section className="edit">
            <section className='playlist-header' style={{ backgroundColor: bgc || '#000000'}}>
            {/* <section className='playlist-header' style={{ backgroundColor: '#000000'}}> */}
                <div className='img-container'>
                    <ImageUpload updatePlaylistImg = {updatePlaylistImg} playlistImg = {playlist.image} />
                </div>
                <section className='playlist-info'>
                    <p>Playlist</p>
                    <input type='text' id='name' className='playlist-name' value={playlistValue.name} placeholder='Playlist name' onChange={handlePlaylist} onBlur={() => dispatch(updatePlaylist(playlistValue))} />
                    <input type='text' id='description' className='playlist-disc' value={playlistValue.description} placeholder='Add discription' onChange={handlePlaylist} onBlur={() => dispatch(updatePlaylist(playlistValue))} />
                </section>
            </section>
            <section className='playlist-action' style={{ backgroundColor: bgc || '#000000' }}>
            {/* <section className='playlist-action' style={{ backgroundColor: '#000000' }}> */}
                <button className='btn-play' onClick={() => dispatch(updatePlayer('isPlaying', !playerSettings.isPlaying))}>
                    {SvgIcon({ iconName: playerSettings.isPlaying ? 'player-pause' : 'player-play' })}
                </button>
                {/* <button className={ isLiked ? 'btn-heart fill' : 'btn-heart'} onClick={handlePlaylist}>
                    {SvgIcon({ iconName: isLiked? 'heart-fill' : 'heart-no-fill' })}
                </button> */}
                <button className='btn-more'>{SvgIcon({ iconName: 'dots' })}</button>
                <div ref={headerRef}></div>
            </section>
            <div ref={containerRef}></div>
            {playlist.tracks.length > 1 && <PlaylistList playlist={playlist} playTrack={playTrack} handleTrack={handleTrack}/>}
        </section>
    )
}
