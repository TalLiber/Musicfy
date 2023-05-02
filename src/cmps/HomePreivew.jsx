import { useEffect } from 'react'

export const HomePreview = ({playlist}) => {


    useEffect(() => {
        // console.log('playlists',playlists)
    }, [])


    return (
        <div className='home-preview'>
            <img src={playlist.images[0].url} alt="" className='img-preview' />
            <h1>{playlist.name}</h1>
            <p>{playlist.description}</p> 
        </div>
    )
}