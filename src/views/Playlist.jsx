import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useHeaderObserver } from '../customHooks/useHeaderObserver'
import { useObserver } from '../customHooks/useObserver'
import { changePlaylistColor, getPlaylistById, updateTrackIdx, updatePlaylist,removeTrack, checkPlayerPlaylist } from '../store/actions/playlists.actions'
import { PlaylistList } from '../cmps/PlaylistList'
import { updatePlayer } from '../store/actions/player.actions'
import { FastAverageColor } from 'fast-average-color'
import EventBus from 'react-native-event-bus'
import { removeUserPlaylist, addUserPlaylist, addUserTrack, removeUserTrack } from '../store/actions/user.actions'
import { ImageUpload } from '../cmps/ImageUpload'
import { EditModal } from '../cmps/EditModal'


import SvgIcon from '../cmps/SvgIcon'


export const Playlist = () => {

    const dispatch = useDispatch()
    const playlist = useSelector(state => { return { ...state.playlistModule.currPlaylist } })
    const playerSettings = useSelector(state => state.playerModule)
    const userPlaylists = useSelector(state => { return { ...state.userModule.loggedInUser } })
    const playerPlaylistId = useSelector(state => {return state.playlistModule.playerPlaylist._id})
    const params = useParams()
    const [headerRef, headerName] = useHeaderObserver()
    const [containerRef, isVisible] = useObserver()
    const [bgc, setBgc] = useState()
    const fac = new FastAverageColor()
    const [isLiked, setIsLiked] = useState(false)
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isEditModaOpen, setIsEditModalOpen] = useState(false)



    useEffect(() => {
        dispatch(getPlaylistById(params.id))
    }, [params.id])

    useEffect(() => {
        setIsLiked(userPlaylists.playlist.some((playlist) => playlist.spotifyId === params.id || playlist.spotifyId + playlist.id === params.id))
    }, [userPlaylists.playlist.length, playlist.name])

    useEffect(() => {
        EventBus.getInstance().addListener("closeModal", () => {
            setIsModalOpen(false)
        })

        return EventBus.getInstance().removeListener("closeModal")
    }, [])

    useEffect(() => {
        if (!playlist.image) {
            setBgc('#000000')
            dispatch(changePlaylistColor('#000000'))
            return
        }
        isVisible.current = true
        if (playlist.spotifyId) headerName.current = playlist.name
        fac.getColorAsync(playlist.image)
            .then(color => {
                setBgc(color.rgba)
                dispatch(changePlaylistColor(color.hexa))
            })
            .catch(e => {
                console.log(e)
            })
    }, [playlist?.name, playlist.image])

    useEffect(() => {
        return () => {
            dispatch(changePlaylistColor('#000000'))
        }
    }, [])

    function handlePlaylist() {
        if (isLiked) {
            dispatch(removeUserPlaylist(params.id))
        }
        else {
            const playlistToAdd = {
                spotifyId: params.id,
                name: playlist.name,
                image: playlist.image
            }
            dispatch(addUserPlaylist(playlistToAdd))
        }
    }

    function handleTrack(isLiked, track) {
        if (isLiked) {
            dispatch(removeUserTrack(track.id))
        }
        else {
            dispatch(addUserTrack(track))
        }
    }

    function playTrack(trackIdx, isPlaying) {
        dispatch(checkPlayerPlaylist())
        dispatch(updateTrackIdx('num', trackIdx))
        dispatch(updatePlayer('isPlaying', isPlaying))
    }  

    function toggleModal(e) {
        e.stopPropagation()
        setIsModalOpen(state => state = !state)
    }

    async function updatePlaylistImg(imgUrl){
        const updatedPlaylist = {...playlist, image:imgUrl}
        savePlaylist(updatedPlaylist)
    }

    function savePlaylist(playlist){
        dispatch(updatePlaylist(playlist))
    }

    function handleRemoveTrack(trackId){
        const playlistSpotId = playlist.spotifyId + playlist._id
        console.log(trackId)
        dispatch(removeTrack(playlistSpotId,trackId))
    }

    if (playlist.spotifyId !== params.id && playlist.spotifyId !== '1234s') return <div>Loading...</div>
    return (
        <section className="playlist">
            {
                isEditModaOpen &&
                <EditModal savePlaylist={savePlaylist} updatePlaylistImg={updatePlaylistImg} setIsModalOpen={setIsEditModalOpen} />
            }

            <section className='playlist-header' style={{ backgroundColor: bgc || '' }}>
                <div className='img-container'>
                    {
                        playlist.spotifyId === '1234s'?
                        <ImageUpload updatePlaylistImg={updatePlaylistImg} playlistImg={playlist.image} /> :
                        <img src={playlist.image}/>
                    }
                </div>
                <section className='playlist-info' onClick={() => playlist.spotifyId === '1234s'? setIsEditModalOpen(true) : setIsEditModalOpen(false)}>
                    <p>Playlist</p>
                    <h1 className='playlist-name'>{playlist.name}</h1>
                    <p className='playlist-disc'>{playlist.description}</p>
                </section>
            </section>
            <section className='playlist-action' style={{ backgroundColor: bgc || '' }}>
                <button className='btn-play' onClick={() => dispatch(updatePlayer('isPlaying', !playerSettings.isPlaying))}>
                    {SvgIcon({ iconName: playerSettings.isPlaying && playerPlaylistId === playlist._id ? 'player-pause' : 'player-play' })}
                </button>
                <button className={isLiked ? 'btn-heart fill' : 'btn-heart'} onClick={handlePlaylist}>
                    {SvgIcon({ iconName: isLiked ? 'heart-fill' : 'heart-no-fill' })}
                </button>
                <button className='btn-more' onClick={toggleModal}>{SvgIcon({ iconName: 'dots' })}</button>
                <div ref={headerRef}></div>
                {isModalOpen && <section className='more-modal'>
                    <div onClick={handlePlaylist}>{isLiked ? 'Unlike playlist' : 'Like playlist'}</div>
                    {playlist.spotifyId === '1234s' && <div onClick={() => setIsEditModalOpen(true)}> Edit playlist details</div>}
                </section>}
            </section>
            <div ref={containerRef}></div>
            {(playlist.tracks.length > 0 && playlist.tracks[0].imgUrl) && <PlaylistList playlist={playlist} playTrack={playTrack} handleTrack={handleTrack} handleRemoveTrack ={handleRemoveTrack}/>}
        </section>
    )
}