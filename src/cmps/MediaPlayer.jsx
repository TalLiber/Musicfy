import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateSongIdx, changePlayMode, changeCueMode } from '../store/actions/playlists.actions'

import SvgIcon from './SvgIcon'

export const MediaPlayer = () => {

  const currSong = useSelector(state => state.playlistModule.currPlaylist.tracks[state.playlistModule.currSongIdx])
  const isPlaying = useSelector(state => state.playlistModule.isPlaying)
  const isCued = useSelector(state => state.playlistModule.isCued)
  const [playerSettings, setPlayerSettings] = useState({
    isPlaying: false,
    volume: 50,
    songDuration: null,
    currTime: 0,
    isShuffleMode: false,
    isRepeatMode: false
  })
  const intervalIdRef = useRef()
  const player = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!player.current) startIframe()
    else loadNewVideo()
  }, [currSong])

  useEffect(() => {
    if (!player.current) return
    if (isPlaying) player.current.playVideo()
    else player.current.pauseVideo()
  }, [isPlaying])

  useEffect(() => {
    if (!player.current) return
    if (isCued) {
      dispatch(changeCueMode(false))
      if (isPlaying) player.current.playVideo()
    }
  }, [isCued])

  function loadNewVideo() {
    player.current.cueVideoById(currSong.id, 0)
    clearInterval(intervalIdRef.current)
    if (isPlaying) {
      player.current.playVideo()
      intervalIdRef.current = setInterval(() => {
        setPlayerSettings(prevState => ({ ...prevState, currTime: prevState.currTime + 1 }))
      }, 1000)
    }
  }

  function startIframe() {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api"

    window.onYouTubeIframeAPIReady = loadVideo

    var firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  }

  function loadVideo() {

    player.current = new window.YT.Player(`playerRef`, {
      videoId: currSong.id,
      height: '0',
      width: '0',
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      },
    })

  }

  function onPlayerReady() {
    setPlayerSettings(prevState => ({ ...prevState, songDuration: player.current.getDuration() }))
  }

  function onPlayerStateChange() {

    if (player.current.getPlayerState() === window.YT.PlayerState.CUED) {
      setPlayerSettings(prevState => ({ ...prevState, songDuration: player.current.getDuration(), currTime: 0 }))
      dispatch(changeCueMode(true))
    }
  }

  function handleVolumeChange(ev) {
    setPlayerSettings(prevState => ({ ...prevState, volume: ev.target.value }))
    player.current.setVolume(ev.target.value)
  }

  function handleTimeChange(ev) {
    setPlayerSettings(prevState => ({ ...prevState, currTime: +ev.target.value }))

    player.current.seekTo(ev.target.value)
    if (!isPlaying) player.current.pauseVideo()
  }

  function togglePlay() {

    if (isPlaying) {
      dispatch(changePlayMode(false))
      clearInterval(intervalIdRef.current)
    }
    else {
      dispatch(changePlayMode(true))
      intervalIdRef.current = setInterval(() => {
        setPlayerSettings(prevState => ({ ...prevState, currTime: prevState.currTime + 1 }))
      }, 1000)
    }

    // setPlayerSettings(prevState => ({ ...prevState, isPlaying: !prevState.isPlaying }))
  }

  function getVolumeIcon() {
    let icon = 'volume-mute'
    if (playerSettings.volume >= 66) icon = 'volume-high'
    else if (playerSettings.volume >= 33) icon = 'volume-medium'
    else if (playerSettings.volume > 0) icon = 'volume-low'

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

  function switchSong(dir) {
    dispatch(updateSongIdx(dir))
  }

  function shufflePlaylist() {
    setPlayerSettings(prevState => ({ ...prevState, isShuffleMode: !prevState.isShuffleMode }))
  }

  function repeatPlaylist() {
    setPlayerSettings(prevState => ({ ...prevState, isRepeatMode: !prevState.isRepeatMode }))
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
            <i onClick={shufflePlaylist} style={{ color: playerSettings.isShuffleMode ? '#1db954' : '#ffffffb3' }}>{SvgIcon({ iconName: 'shuffle' })}</i>
            <i onClick={() => switchSong(-1)}>{SvgIcon({ iconName: 'prev-song' })}</i>
          </div>
          <i onClick={togglePlay} className="play-btn">
            {SvgIcon({ iconName: isPlaying ? 'player-pause' : 'player-play' })}
          </i>
          <div className="side-btns right-side">
            <i onClick={() => switchSong(1)}>{SvgIcon({ iconName: 'next-song' })}</i>
            <i onClick={repeatPlaylist} style={{ color: playerSettings.isRepeatMode ? '#1db954' : '#ffffffb3' }}>{SvgIcon({ iconName: 'repeat' })}</i>
          </div>
        </div>
        <div className="playback-bar">
          <div className="progress-time elapsed">{timeFormat(playerSettings.currTime)}</div>
          <div className="progress-container progress-bar">
            <progress className="prog progress-bar" type="progress" onChange={handleTimeChange} value={playerSettings.currTime} min="0" max={playerSettings.songDuration}></progress>
            <input className="prog input-bar timestamp" id="fontController" type="range"
              onChange={handleTimeChange} value={playerSettings.currTime} min="0" max={playerSettings.songDuration} />
          </div>

          <div className="progress-time duration">{timeFormat(playerSettings.songDuration)}</div>
        </div>
      </div>
      <div className="side-container">
        <i>{SvgIcon({ iconName: 'lyrics' })}</i>
        <i>{SvgIcon({ iconName: getVolumeIcon() })}</i>
        <div className="progress-container volume-bar">
          <progress className="prog progress-bar" type="progress" onChange={handleVolumeChange} value={playerSettings.volume} min="0" max="100"></progress>
          <input className="prog input-bar timestamp" id="fontController" type="range"
            onChange={handleVolumeChange} value={playerSettings.volume} min="0" max="100" />
        </div>
      </div>
      <div id="playerRef"></div>
    </div>
  )
}