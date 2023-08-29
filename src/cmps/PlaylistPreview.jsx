import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import EventBus from 'react-native-event-bus'
import { utilService } from '../services/util.service'
import SvgIcon from '../cmps/SvgIcon'
import svgIcon from '../cmps/SvgIcon'
import { PlaylistModal } from './PlaylistModal'


export const PlaylistPreview = ({ track, idx, playTrack, playlistId, handleTrack, origin }) => {

    const navigate = useNavigate()
    const playerSettings = useSelector(state => state.playerModule)
    const currTrack = useSelector(state => state.playlistModule.currPlaylist.tracks[state.playlistModule.currTrackIdx])
    const currPlatlistId = useSelector(state => state.playlistModule.currPlaylist.id)
    const [isLiked, setIsLiked] = useState(false)
    const userLikedTracks = useSelector(state => { return { ...state.userModule.loggedInUser }.likedTracks })
    const [isModalOpen, setIsModalOpen] = useState(false)


    useEffect(() => {
        setIsLiked(state => state = userLikedTracks?.some(likedTrack => likedTrack.id === track.id))
    }, [])

    useEffect(() => {
        EventBus.getInstance().addListener("closeModal", () => {
            setIsModalOpen(false)
        })

        return EventBus.getInstance().removeListener("closeModal")
    }, [])

    function handleTrackPrev(isLiked, track) {
        setIsLiked(prevState => prevState = !prevState)
        handleTrack(isLiked, track)
    }

    function toggleModal(e) {
        e.stopPropagation()
        setIsModalOpen(state => state = !state)
    }

    return (
        <section className='playlist-preview' >
            <button className='btn-player' onClick={() => playTrack(idx, (playerSettings.isPlaying && currTrack.id === track.id ? false : true))}>
                {SvgIcon({ iconName: playerSettings.isPlaying && currTrack.id === track.id ? 'player-pause' : 'player-play' })}
            </button>
            <section className='track-title' onClick={() => playTrack(idx, (playerSettings.isPlaying && currTrack.id === track.id ? false : true))}>
                <div className='track-img'>
                    <img src={track.imgUrl} alt="" />
                </div>
                <section className='track-info'>
                    <h1 className={playlistId === currPlatlistId && currTrack.id === track.id ? 'green-header' : ''} onClick={() => console.log(`track ${track.title}`)}>{track.title}</h1>
                    <p onClick={() => console.log(`artist ${track.artists}`)}>{track.artists[0]}</p>
                </section>
            </section>
            <section className='track-album' onClick={() => console.log(`album ${track.album}`)}>
                <p>{track.album}</p>
            </section>

            <section className='track-date'>
                <p>{origin !== 'search' ? utilService.dateAdded(track.addedAt) : ''}</p>
            </section>
            <section className='like-time'>
                <button className={isLiked ? 'btn-heart fill' : 'btn-heart'} onClick={() => handleTrackPrev(isLiked, track)}>
                    {SvgIcon({ iconName: isLiked ? 'heart-fill' : 'heart-no-fill' })}
                </button>
                <section className='track-duration'>
                    {utilService.timeFormat(track.formalDuration / 600)}
                </section>
            </section>
            <section className='track-option' onClick={toggleModal}>
                {svgIcon({ iconName: 'dots' })}
            </section>
            {isModalOpen &&<section className='track-modal' onClick={(e)=> e.stopPropagation()}>
                <button className='like-btn' onClick={() => handleTrackPrev(isLiked, track)}>
                    {!isLiked ? 'Add to Liked Songs' : 'Remove from Liked Songs'}
                </button>
                <button className='add-btn'>
                    Add to playlist
                    <PlaylistModal />
                </button>
            </section>}
        </section>
    )
}