import { categoryService } from '../../services/category.service.js'
import { playlistService } from '../../services/playlist.service.js'

export function loadPlaylists() {
  return async (dispatch, getState) => {
    try {
      // console.log('getting playlists');
      const filterBy = getState().playlistModule.filterBy
      const playlists = await playlistService.query(filterBy)
      dispatch({ type: 'SET_PLAYLISTS', playlists })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function addPlaylist() {
  let playlist = playlistService.getEmptyPlaylist()
  return async (dispatch) => {
    try {
      playlist = await playlistService.save(playlist)
      dispatch({ type: 'ADD_PLAYLIST', playlist })
      return playlist
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function removePlaylist(playlistId) {
  return async (dispatch) => {
    try {
      const playlists = await playlistService.remove(playlistId)
      dispatch({ type: 'REMOVE_PLAYLIST', playlistId })
      return 'hello'
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    try {
      dispatch({ type: 'SET_FILTER_BY', filterBy: { ...filterBy } })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function updateTrackIdx(byType, toUpdate) {
  return (dispatch) => {
    try {
      if (byType === 'dir')
        dispatch({ type: 'UPDATE_CURR_TRACK_IDX_BY_DIR', dir: toUpdate })
      else dispatch({ type: 'UPDATE_CURR_TRACK_IDX_BY_NUM', idx: toUpdate })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function getPlaylistById(spotifyId, sentPlaylist = null) {
  return async (dispatch) => {
    try {
      var playlist
      sentPlaylist ? playlist = sentPlaylist : 
      playlist = await playlistService.getById(spotifyId)
      dispatch({ type: 'SET_PLAYLIST', playlist })
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function getYoutubeId(keyword) {
  return async (dispatch, getState) => {
    try {
      console.log('getting YoutubeId');
      const youtubeId = await playlistService.getYoutubeId(keyword)
      dispatch({ type: 'SET_YOUTUBE_ID', youtubeId })
      playlistService.save(getState().playlistModule.currPlaylist)
      console.log('getState',getState().playlistModule.currPlaylist);
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function changePlaylistColor(color) {
  return (dispatch) => {
    try {
      dispatch({ type: 'change-playlist-color', color })
    } catch (err) {
      console.log('err:', err)
    }
  }
}
