import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import {playlistService} from '../services/playlist.service'
import { useHeaderObserver } from '../customHooks/useHeaderObserver'
import { useObserver } from '../customHooks/useObserver'
import Palette from 'react-palette';
import { usePalette } from 'react-palette' 


export const Playlist = () => {

    const dispatch = useDispatch()
    const playlist = useSelector(state => state.playlistModule.currPlaylist)
    const params = useParams()
    const [headerRef, setHeaderName] = useHeaderObserver()
    const [containerRef,headerBgc] = useObserver()
    const imgColor = useRef(null)
    const [img, setImg] = useState(null)
    const { data, loading, error } = usePalette(imgColor.current)

    useEffect(() => {
        getPlaylist()
     },[params.id])
 
     const getPlaylist = async () => {
        setHeaderName.current = playlist.name
        setTimeout(()=>{
            imgColor.current = playlist.image
            headerBgc.current = imgColor.current
        },1000)
     }


    return (
        <section className="playlist">
            <section className='playlist-header' style={{ backgroundColor: data.darkVibrant }}>
                <div className='img-container'>
                <img src={playlist.image} alt="" />
                </div>
                <h1>{playlist.name}</h1>
                <div ref={headerRef}></div>
            </section>
            <div ref={containerRef}></div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
            <div>hay</div>
        </section>
    )
  }




//   {
//     darkMuted: "#2a324b"
//     darkVibrant: "#0e7a4b"
//     lightMuted: "#9cceb7"
//     lightVibrant: "#a4d4bc"
//     muted: "#64aa8a"
//     vibrant: "#b4d43c"
//   }
