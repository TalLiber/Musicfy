import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"


export const PlaylistPreview = ({track}) => {

    const navigate = useNavigate()


    useEffect(() => {
    }, [])


    return (
        <div className='playlist-preview' onClick={() => navigate(`/Playlist/${playlist.id}`)}>
            <h1>{track.title}</h1>
        </div>
    )
}