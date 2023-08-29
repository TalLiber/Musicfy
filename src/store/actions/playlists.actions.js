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
      const user = getLoggedinUser()
      if (user._id !== 1234) playlist = await playlistService.save(playlist)
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
      const user = getLoggedinUser()
      var playlist
      if (user._id !== 1234) playlists = await playlistService.remove(playlistId)
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
    const searchItems = searchKey ? await playlistService.getSearchItems(searchKey, searchType) : ''
     if(searchType === 'playlist') dispatch({ type: 'SET_SEARCH_ITEMS', searchItems })
     else dispatch({ type: 'SET_PLAYLIST_TRACKS', tracks: searchItems })
     dispatch({ type: 'SET_SEARCH_TYPE', searchType })
     dispatch({ type: 'SET_IS_SEARCH_ACTIVE', isSearchActive: searchItems ? true : false })
     changeSearchStatus(searchKey ? true : false)
    } catch (err) {
      console.log('err:', err)
    }
  }
}

export function changeSearchStatus(status) {
  console.log('status', status);
  return (dispatch) => {
    try {
      dispatch({ type: 'SET_IS_SEARCH_ACTIVE', isSearchActive: status })
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
    const user = getLoggedinUser()
    try {
      if (user._id !== 1234) playlist = await playlistService.save(playlist)
      const userPlaylist = {
        spotifyId: '1234s',
        id: playlist._id,
        name: playlist.name,
        image: playlist.image
      }
      await dispatch(addUserPlaylist(userPlaylist))
      dispatch({ type: 'SET_PLAYLIST', playlist })
    }catch(err){
      console.log(err)
    }

  }
}

export function updatePlaylist(updatedPlaylist) {
  return async (dispatch) => {
    try{
      const playlist = await playlistService.save(updatedPlaylist)
      const userPlaylist = {
        spotifyId: '1234s',
        id: playlist._id,
        name: playlist.name,
        image: playlist.image
      }
      await dispatch(addUserPlaylist(userPlaylist))
      dispatch({ type: 'SET_PLAYLIST', playlist })
    }catch(err){
      console.log(err)
    }
  }
}

export function addTrack(playlistId, track) {
  return async (dispatch)=>{
    try{
      const playlist = await playlistService.getById(playlistId)
      if (playlist.tracks.length === 1 && !playlist.tracks[0].imgUrl) playlist.tracks.splice(0,1,track)
      else playlist.tracks.unshift(track)
      playlistService.save(playlist)

    }catch(err){
      console.log(err)
    }
  }

}
export function removeTrack(playlistId, trackId) {
  return async (dispatch)=>{
    try{
      const playlist = await playlistService.getById(playlistId)
      const updatedPlaylist = {...playlist, tracks:playlist.tracks.filter(track => track.id !== trackId)}
      await playlistService.save(updatedPlaylist)
      dispatch({ type: 'SET_PLAYLIST', playlist: updatedPlaylist })

    }catch(err){
      console.log(err)
    }
  }

}
