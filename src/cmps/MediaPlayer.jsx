import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateSongIdx } from '../store/actions/playlists.actions'

import SvgIcon from './SvgIcon'

export const MediaPlayer = () => {

  const currSong = useSelector(state => state.playlistModule.currPlaylist.tracks[state.playlistModule.currSongIdx])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(50)
  const [songDuration, setSongDuration] = useState(null)
  const [currTime, setCurrTime] = useState(0)
  const [isShuffleMode, setIsShuffleMode] = useState(false)
  const [isRepeatMode, setIsRepeatMode] = useState(false)
  const intervalIdRef = useRef()
  const player = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(player.current);
    if(!player.current) {
      startIframe()
    }
    else loadVideo()
  }, [currSong])

  function startIframe() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api"

    window.onYouTubeIframeAPIReady = loadVideo

    var firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    console.log('startIframe');
  }

  function loadVideo() {
    console.log('loadVideo', currSong.id);

    player.current = new window.YT.Player(`playerRef`, {
      videoId: currSong.id,
      height: '0',
      width: '0',
      events: {
        onReady: onPlayerReady,
      },
    })

  }

  function onPlayerReady() {
    setSongDuration(player.current.getDuration())
    console.log(player.current.getDuration())
  }

  function handleVolumeChange(ev) {
    setVolume(ev.target.value)
    player.current.setVolume(ev.target.value)
  }

  function handleTimeChange(ev) {
    setCurrTime(+ev.target.value)

    player.current.seekTo(ev.target.value)
  }

  function togglePlay() {
    if (isPlaying) {
      player.current.pauseVideo()
      clearInterval(intervalIdRef.current)
    }
    else {
      player.current.playVideo()
      intervalIdRef.current = setInterval(() => {
        setCurrTime(prevTime => prevTime + 1)
      }, 1000)
    }

    setIsPlaying(prevState => !prevState)
  }

  function getVolumeIcon() {
    let icon = 'volume-mute'
    if (volume >= 66) icon = 'volume-high'
    else if (volume >= 33) icon = 'volume-medium'
    else if (volume > 0) icon = 'volume-low'

    return icon
  }

  function timeFormat(duration) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    console.log(ret);
    return ret;
  }

  function switchSong(dir) {
    dispatch(updateSongIdx(dir))
  }

  function shufflePlaylist() {
    setIsShuffleMode(prevState => !prevState)
  }

  function repeatPlaylist() {
    setIsRepeatMode(prevState => !prevState)
  }


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
            <i onClick={shufflePlaylist} style={{ color: isShuffleMode ? '#1db954' : '#ffffffb3' }}>{SvgIcon({ iconName: 'shuffle' })}</i>
            <i onClick={() => switchSong(-1)}>{SvgIcon({ iconName: 'prev-song' })}</i>
          </div>
          <i onClick={togglePlay} className="play-btn">
            {SvgIcon({ iconName: isPlaying ? 'player-pause' : 'player-play' })}
          </i>
          <div className="side-btns right-side">
            <i onClick={() => switchSong(1)}>{SvgIcon({ iconName: 'next-song' })}</i>
            <i onClick={repeatPlaylist} style={{ color: isRepeatMode ? '#1db954' : '#ffffffb3' }}>{SvgIcon({ iconName: 'repeat' })}</i>
          </div>
        </div>
        <div className="playback-bar">
          <div className="progress-time elapsed">{timeFormat(currTime)}</div>
          <div className="progress-container progress-bar">
            <progress className="prog progress-bar" type="progress" onChange={handleTimeChange} value={currTime} min="0" max={songDuration}></progress>
            <input className="prog input-bar timestamp" id="fontController" type="range"
              onChange={handleTimeChange} value={currTime} min="0" max={songDuration} />
          </div>

          <div className="progress-time duration">{timeFormat(songDuration)}</div>
        </div>
      </div>
      <div className="side-container">
        <i>{SvgIcon({ iconName: 'lyrics' })}</i>
        <i>{SvgIcon({ iconName: getVolumeIcon() })}</i>
        <div className="progress-container volume-bar">
          <progress className="prog progress-bar" type="progress" onChange={handleVolumeChange} value={volume} min="0" max="100"></progress>
          <input className="prog input-bar timestamp" id="fontController" type="range"
            onChange={handleVolumeChange} value={volume} min="0" max="100" />
        </div>
      </div>
      <div id="playerRef"></div>
    </div>
  )
}