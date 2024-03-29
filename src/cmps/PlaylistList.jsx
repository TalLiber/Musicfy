import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { PlaylistPreview } from './PlaylistPreview'

import SvgIcon from '../cmps/SvgIcon'

export const PlaylistList = ({ playlist, playTrack, handleTrack, origin, handleRemoveTrack }) => {
  
    return (
        <div className='playlist-list'>

            <div className='playlist-list-table'>
                <section className='table-header'>
                    <p>#</p>
                    <p>Tilte</p>
                    <p>Album</p>
                    <p>{origin !== 'search' ? 'Date Added' : ''}</p>
                    <p>{SvgIcon({ iconName: 'clock' })}</p>
                </section>
                {playlist.tracks ? playlist.tracks.map((track, idx) => {
                    return <PlaylistPreview key={idx} track={track} playTrack={playTrack} idx={idx} playlistId={playlist.id} handleTrack={handleTrack} handleRemoveTrack={handleRemoveTrack} origin={origin} />
                }) :
                    playlist.map((track, idx) => {
                        return <PlaylistPreview key={idx} track={track} playTrack={playTrack} idx={idx} playlistId={playlist.id} handleTrack={handleTrack}  />
                    })}
            </div>
        </div>
    )
}