import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"

import SvgIcon from './SvgIcon'

export const MediaPlayer = () => {

  const playerRef = useRef(null)
  const currSong = useSelector(state => state.playlistModule.currSong)
  const [isPlaying, setIsPlaying] = useState(false)
  const [player, setPlayer] = useState(null)
  const [volume, setVolume] = useState(50)
  const [songDuration, setSongDuration] = useState(null)
  const [currTime, setCurrTime] = useState(0)
  const intervalIdRef = useRef()


  useEffect(() => {
    startIframe()
  }, [currSong])

  function startIframe() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api"

    window.onYouTubeIframeAPIReady = loadVideo

    var firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  }

  var newPlayer
  function loadVideo() {
    newPlayer = new window.YT.Player(`playerRef`, {
      videoId: 'RS7trxkb0zE',
      height: '0',
      width: '0',
      events: {
        onReady: onPlayerReady,
      },
    })

  }

  function onPlayerReady(event) {
    setPlayer(newPlayer)
    setSongDuration(newPlayer.getDuration())
    console.log(timeFormat(newPlayer.getDuration()))
    // newPlayer.seekTo(0)
  }

  function handleVolumeChange(ev) {
    setVolume(ev.target.value)
    player.setVolume(ev.target.value)
  }

  function handleTimeChange(ev) {
    setCurrTime(ev.target.value)
    player.seekTo(ev.target.value)
  }

  function togglePlay() {
    if (isPlaying) {
      player.pauseVideo()
      clearInterval(intervalIdRef.current)
    }
    else {
      player.playVideo()
      intervalIdRef.current = setInterval(() => {
        setCurrTime(prevTime => prevTime + 1)
    }, 1000)
    }

    setIsPlaying(prevState => !prevState)
  }

  function getVolumeIcon() {
    let icon = 'volume-mute'
    if(volume >= 66) icon = 'volume-high'
    else if(volume >= 33) icon = 'volume-medium'
    else if(volume > 0) icon = 'volume-low'

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

    return ret;
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
            <i>{SvgIcon({ iconName: 'shuffle' })}</i>
            <i>{SvgIcon({ iconName: 'prev-song' })}</i>
          </div>
          <i onClick={togglePlay} className="play-btn">
            {SvgIcon({ iconName: isPlaying ? 'player-pause' : 'player-play' })}
          </i>
          <div className="side-btns right-side">
            <i>{SvgIcon({ iconName: 'next-song' })}</i>
            <i>{SvgIcon({ iconName: 'repeat' })}</i>
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