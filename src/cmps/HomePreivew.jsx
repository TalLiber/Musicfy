import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"


export const HomePreview = ({playlistData, selectPlaylist}) => {

    const navigate = useNavigate()

    function onSelectPlaylist() {
        selectPlaylist(playlistData)
        navigate(`/Playlist/${playlistData.id}`)
    }

    return (
        <div className='home-preview' onClick={onSelectPlaylist}>
            <img src={playlistData.image} alt="" className='img-preview' />
            <h1>{playlistData.name}</h1>
            <p>{playlistData.description}</p> 
        </div>
    )
}