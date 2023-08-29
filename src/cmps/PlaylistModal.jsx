import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { addTrack } from '../store/actions/playlists.actions'
import EventBus from 'react-native-event-bus'

export const PlaylistModal = ({track}) => {

    const dispatch = useDispatch()
    const userPlaylists = useSelector(state => { return [ ...state.userModule.loggedInUser.playlist ] })

    function HandleTrack(playlistId){
      const idx = userPlaylists.findIndex(playlist => playlist.id === playlistId)
      const playlistSpotId = userPlaylists[idx].spotifyId + playlistId
      dispatch(addTrack(playlistSpotId,track))
      EventBus.getInstance().fireEvent("closeModal")
    }
    
    return (
      <div className='modal-list' onClick={(e)=> e.stopPropagation()}>
        {userPlaylists && userPlaylists.map((playlist)=>{
            if(playlist.spotifyId === '1234s') return <p className="playlist" key={playlist.id} onClick={()=>HandleTrack(playlist.id)}>{playlist.name}</p>
        })}
      </div>
    )
  }