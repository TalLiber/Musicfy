import { categoryService } from '../../services/category.service.js'
import { playlistService } from '../../services/playlist.service.js'
import { addUserPlaylist, getLoggedinUser } from './user.actions.js'
import { userService } from '../../services/user.service.js'

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
    } catch (err) {
      console.log('err:', err)
    }
  }
}
export function searchItems(searchKey, searchType) {
  return async (dispatch, getState) => {
    try {
      const resItems = await playlistService.getSearchItems(searchKey, searchType)
      console.log('resItems',resItems);
      // const youtubeId = await playlistService.getYoutubeId(keyword)
      // dispatch({ type: 'SET_YOUTUBE_ID', youtubeId })
      // playlistService.save(getState().playlistModule.currPlaylist)
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

export function getEmptyPlaylist() {
  return async (dispatch) => {
    var playlist = playlistService.getEmptyPlaylist()
    playlist = await playlistService.save(playlist)
    const userPlaylist = {
      spotifyId: '1234s',
      id: playlist._id,
      name: playlist.name,
      image:playlist.image
    }
    await dispatch(addUserPlaylist(userPlaylist))
    dispatch({ type: 'SET_PLAYLIST', playlist })

  }
}

export function updatePlaylist(updatedPlaylist) {
  return async (dispatch) => {
    const playlist = await playlistService.save(updatedPlaylist)
    const userPlaylist = {
      spotifyId: '1234s',
      id: playlist._id,
      name: playlist.name,
      image:playlist.image
    }
    await dispatch(addUserPlaylist(userPlaylist))
    dispatch({type: 'SET_PLAYLIST', playlist})
  }
}
