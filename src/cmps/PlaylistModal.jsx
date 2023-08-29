import { useEffect } from "react"
import { useSelector } from "react-redux"

export const PlaylistModal = () => {
    const userPlaylists = useSelector(state => { return [ ...state.userModule.loggedInUser.playlist ] })
    
    return (
      <div className='modal-list' onClick={(e)=> e.stopPropagation()}>
        {userPlaylists && userPlaylists.map(playlist=>{
            if(playlist.spotifyId === '1234s') return <p className="playlist">{playlist.name}</p>
        })}
      </div>
    )
  }