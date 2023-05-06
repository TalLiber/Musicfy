import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {playlistService} from '../services/playlist.service'


export const Playlist = () => {

    const [playlist, setPlaylist] = useState()
    const [cmpStyle, setCmpStyle] = useState(null)
    const params = useParams()

    useEffect(() => {
        getPlaylist()
     },[params.id])
 
     const getPlaylist = async () => {
        const playlist = await playlistService.getById(params.id)
        setPlaylist(playlist)
        setCmpStyle({'backgroundColor':playlist.backgroundColor})
        setHeaderName.current = category.name
     }


    return (
        <section className="playlist">
            <section className='playlist-header' style={cmpStyle}></section>
            <h1>Playlist</h1>
        </section>
    )
  }
