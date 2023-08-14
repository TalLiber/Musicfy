import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"


export const HomePreview = ({ playlistData }) => {

    const navigate = useNavigate()

    useEffect(() => {
        // console.log('playlistData', playlistData)
    },[]) 

    return (
        <div className='home-preview' onClick={() => navigate(`/Playlist/${playlistData.spotifyId || playlistData.id}`)}>
            <img src={playlistData.image || playlistData.images[0].url} alt="" className='img-preview' />
            <h1>{playlistData.name}</h1>
            <p>{playlistData.description}</p>
        </div>
    )
}