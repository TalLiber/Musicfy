import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { PlaylistPreview } from './PlaylistPreview'

import SvgIcon from '../cmps/SvgIcon'

export const PlaylistList = ({playlist}) => {


    return (
        <div className='playlist-list'>
            
            <div className='playlist-list-table'>
                <section className='table-header'>
                    <p>#</p>
                    <p>Tilte</p>
                    <p>Album</p>
                    <p>Date Added</p>
                    <p>{SvgIcon({ iconName: 'clock'})}</p>
                </section>
            {playlist.tracks.map((track,idx) => {
                return <PlaylistPreview key={idx} track={track}> </PlaylistPreview>
            })}
            </div>
        </div>
    )
}