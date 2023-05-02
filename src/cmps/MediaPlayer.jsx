import { useEffect } from "react"
import { useSelector } from "react-redux"

import SvgIcon from './SvgIcon'

export const MediaPlayer = () => {

  const currSong = useSelector(state => state.playlistModule.currSong)
  useEffect(() => {
    console.log(currSong, 'currSong');
  }, [currSong])
  return (
    <div className='player-container'>
      <div className="song-container">
        <img src={currSong.imgUrl} />
        <div className="song-details">
          <p className="song-title">{currSong.title}</p>
          <p className="song-artist">{currSong.artist}</p>
        </div>
        <i>{SvgIcon({ iconName: 'heart-empty' })}</i>
      </div>
      <div className="player-control">
        <div className="control-btns">
          <div className="side-btns left-side">
            <i>{SvgIcon({ iconName: 'shuffle' })}</i>
            <i>{SvgIcon({ iconName: 'prev-song' })}</i>
          </div>
          <i className="play-btn">
            {SvgIcon({ iconName: 'player-play' })}
          </i>
          <div className="side-btns right-side">
            <i>{SvgIcon({ iconName: 'next-song' })}</i>
            <i>{SvgIcon({ iconName: 'repeat' })}</i>
          </div>
        </div>
        <div className="playback-bar">
          <div className="progress-time elapsed">-:--</div>
          <div className="progress-container progress-bar">
          <progress className="prog progress-bar" type="progress" value="32" min="0" max="50"></progress>
          <input className="prog input-bar timestamp" id="fontController" type="range"
            input="40" value="32" min="0" max="50" />
        </div>

          <div className="progress-time duration">-:--</div>
        </div>
      </div>
      <div className="side-container">
        <i>{SvgIcon({ iconName: 'lyrics' })}</i>
        <i>{SvgIcon({ iconName: 'volume-mute' })}</i>
        <div className="progress-container volume-bar">
          <progress className="prog progress-bar" type="progress" value="32" min="0" max="50"></progress>
          <input className="prog input-bar timestamp" id="fontController" type="range"
            input="40" value="32" min="0" max="50" />
        </div>
      </div>
    </div>
  )
}
