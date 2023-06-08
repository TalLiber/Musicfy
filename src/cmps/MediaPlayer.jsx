import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateSongIdx } from '../store/actions/playlists.actions'
import { updatePlayer, updateCurrTime, toggleProp } from '../store/actions/player.actions'

import SvgIcon from './SvgIcon'

export const MediaPlayer = () => {

  const currSong = useSelector(state => state.playlistModule.currPlaylist.tracks[state.playlistModule.currSongIdx])
  const playerSettings = useSelector(state => state.playerModule)
  const intervalIdRef = useRef()
  const player = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!player.current) startIframe()
    else loadNewVideo()
  }, [currSong])

  useEffect(() => {
    if (!player.current) return
    if (playerSettings.isPlaying) player.current.playVideo()
    else player.current.pauseVideo()
  }, [playerSettings.isPlaying])

  useEffect(() => {
    if (!player.current) return
    if (playerSettings.isCued) {
      dispatch(toggleProp('isCued'))
      if (playerSettings.isPlaying) player.current.playVideo()
    }
  }, [playerSettings.isCued])

  useEffect(() => {
    if (!player.current) return
    if (playerSettings.currTime === Math.floor(player.current.getDuration())) {
      dispatch(updateSongIdx(1))
    }
  }, [playerSettings.currTime])

  function loadNewVideo() {
    player.current.cueVideoById(currSong.id, 0)
    clearInterval(intervalIdRef.current)
    dispatch(updatePlayer('currTime', 0))
    if (playerSettings.isPlaying) {
      player.current.playVideo()
      intervalIdRef.current = setInterval(() => {
        dispatch(updateCurrTime())
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
    dispatch(updatePlayer('songDuration', player.current.getDuration()))
  }

  function onPlayerStateChange() {

    if (player.current.getPlayerState() === window.YT.PlayerState.CUED) {
      dispatch(toggleProp('isCued'))
      dispatch(updatePlayer('songDuration', player.current.getDuration()))
    }
  }

  function handleVolumeChange(ev) {
    dispatch(updatePlayer('volume', +ev.target.value))

    player.current.setVolume(ev.target.value)
  }

  function handleTimeChange(ev) {
    dispatch(updatePlayer('currTime', +ev.target.value))

    player.current.seekTo(ev.target.value)
    if (!playerSettings.isPlaying) player.current.pauseVideo()
  }

  function togglePlay() {

    if (playerSettings.isPlaying) {
      // dispatch(updatePlayer('isPlaying', false))
      clearInterval(intervalIdRef.current)
    }
    else {
      // dispatch(updatePlayer('isPlaying', true))
      intervalIdRef.current = setInterval(() => {
        dispatch(updateCurrTime())
      }, 1000)
    }

    dispatch(toggleProp('isPlaying'))
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
    dispatch(toggleProp('isShuffleMode'))
  }

  function repeatPlaylist() {
    dispatch(toggleProp('isRepeatMode'))
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
            {SvgIcon({ iconName: playerSettings.isPlaying ? 'player-pause' : 'player-play' })}
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