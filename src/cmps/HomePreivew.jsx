import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"


export const HomePreview = ({playlist}) => {

    const navigate = useNavigate()


    useEffect(() => {
        // console.log('playlist',playlist)
    }, [])


    return (
        <div className='home-preview' onClick={() => navigate(`/Playlist/${playlist.id}`)}>
            <img src={playlist.images[0].url} alt="" className='img-preview' />
            <h1>{playlist.name}</h1>
            <p>{playlist.description}</p> 
        </div>
    )
}