import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"


export const HomePreview = ({ playlistData }) => {

    const navigate = useNavigate()

    return (
        <div className='home-preview' onClick={() => navigate(`/Playlist/${playlistData.spotifyId}`)}>
            <img src={playlistData.image} alt="" className='img-preview' />
            <h1>{playlistData.name}</h1>
            <p>{playlistData.description}</p>
        </div>
    )
}