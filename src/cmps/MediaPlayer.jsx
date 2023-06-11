import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateTrackIdx } from '../store/actions/playlists.actions'
import { updatePlayer, updateCurrTime, toggleProp, shuffleIdxs } from '../store/actions/player.actions'

import SvgIcon from './SvgIcon'

export const MediaPlayer = () => {

  const currTrack = useSelector(state => state.playlistModule.currPlaylist.tracks[state.playlistModule.currTrackIdx])
  const currIdx = useSelector(state => state.playlistModule.currTrackIdx)
  const playlistLength = useSelector(state => state.playlistModule.currPlaylist.tracks.length)
  const playerSettings = useSelector(state => state.playerModule)
  const intervalIdRef = useRef()
  const player = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!player.current) startIframe()
    else loadNewVideo()
  }, [currTrack])

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
      checkNextTrack()
    }
  }, [playerSettings.currTime])

  function loadNewVideo() {
    player.current.cueVideoById(currTrack.id, 0)
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
      videoId: currTrack.id,
      height: '0',
      width: '0',
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      },
    })

  }

  function onPlayerReady() {
    dispatch(updatePlayer('trackDuration', player.current.getDuration()))
  }

  function onPlayerStateChange() {

    if (player.current.getPlayerState() === window.YT.PlayerState.CUED) {
      dispatch(toggleProp('isCued'))
      dispatch(updatePlayer('trackDuration', player.current.getDuration()))
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

    if (playerSettings.isPlaying) stopTrack()

    else {
      //TODO Not sure if this the right place to handle this case
      if (currIdx === playlistLength - 1 && playerSettings.currTime === Math.floor(player.current.getDuration())) {
        checkNextTrack(1, true)
      }
      playTrack()
    }
  }

  function stopTrack() {
    dispatch(updatePlayer('isPlaying', false))
    clearInterval(intervalIdRef.current)
  }

  function playTrack() {
    dispatch(updatePlayer('isPlaying', true))
    intervalIdRef.current = setInterval(() => {
      dispatch(updateCurrTime())
    }, 1000)
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

  function shufflePlaylist() {
    dispatch(toggleProp('isShuffleMode'))
    if (!playerSettings.isShuffleMode) dispatch(shuffleIdxs(playlistLength))
  }


  function repeatPlaylist() {
    dispatch(toggleProp('isRepeatMode'))
  }

  function checkNextTrack(dir = 1, byClick = false) {
    if (!playerSettings.isShuffleMode) {
      if (currIdx < playlistLength - 1 || playerSettings.isRepeatMode || byClick) dispatch(updateTrackIdx('dir', dir))
      else stopTrack()
    }
    else{
      if (playerSettings.shuffledIdxs.length) {
        var nextIdx = playerSettings.shuffledIdxs.pop()
        dispatch(updateTrackIdx('num', nextIdx))
      } else if (playerSettings.isRepeatMode || byClick) {
        dispatch(shuffleIdxs(playlistLength))
        dispatch(updateTrackIdx('dir', dir))
      } else stopTrack()
    }
  }

  return (
    <div className="player-container">
      <div className="track-container">
        <img src={currTrack.imgUrl} />
        <div className="track-details">
          <p className="track-title">{currTrack.title}</p>
          <p className="track-artist">{currTrack.artists[0]}</p>
        </div>
        <i>{SvgIcon({ iconName: 'heart-empty' })}</i>
      </div>
      <div className="player-control">
        <div className="control-btns">
          <div className="side-btns left-side">
            <i onClick={shufflePlaylist} style={{ color: playerSettings.isShuffleMode ? '#1db954' : '#ffffffb3' }}>{SvgIcon({ iconName: 'shuffle' })}</i>
            <i onClick={() => checkNextTrack(-1, true)}>{SvgIcon({ iconName: 'prev-track' })}</i>
          </div>
          <i onClick={togglePlay} className="play-btn">
            {SvgIcon({ iconName: playerSettings.isPlaying ? 'player-pause' : 'player-play' })}
          </i>
          <div className="side-btns right-side">
            <i onClick={() => checkNextTrack(1, true)}>{SvgIcon({ iconName: 'next-track' })}</i>
            <i onClick={repeatPlaylist} style={{ color: playerSettings.isRepeatMode ? '#1db954' : '#ffffffb3' }}>{SvgIcon({ iconName: 'repeat' })}</i>
          </div>
        </div>
        <div className="playback-bar">
          <div className="progress-time elapsed">{timeFormat(playerSettings.currTime)}</div>
          <div className="progress-container progress-bar">
            <progress className="prog progress-bar" type="progress" onChange={handleTimeChange} value={playerSettings.currTime} min="0" max={playerSettings.trackDuration}></progress>
            <input className="prog input-bar timestamp" id="fontController" type="range"
              onChange={handleTimeChange} value={playerSettings.currTime} min="0" max={playerSettings.trackDuration} />
          </div>

          <div className="progress-time duration">{timeFormat(playerSettings.trackDuration)}</div>
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