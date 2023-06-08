import { playlistService } from "../../services/playlist.service.js"

export function loadPlaylists() {

    return async(dispatch, getState) => {
        try {
            console.log('getting playlists');
            const filterBy = getState().playlistModule.filterBy
            const playlists = await playlistService.query(filterBy)
            console.log('playlists:', playlists)
            dispatch({ type: 'SET_PLAYLISTS', playlists })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function addPlaylist() {

    let playlist = playlistService.getEmptyPlaylist()
    return async(dispatch) => {
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

    return async(dispatch) => {
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
            dispatch({ type: 'SET_FILTER_BY', filterBy: {...filterBy } })
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function updateSongIdx(dir) {

    return (dispatch) => {
        try {
            dispatch({ type: 'SWITCH_CURR_SONG_IDX', dir })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function changePlayMode(isPlaying) {

    return (dispatch) => {
        try {
            dispatch({ type: 'CHANGE_PLAY_MODE', isPlaying })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
export function changeCueMode(isCued) {

    return (dispatch) => {
        try {
            dispatch({ type: 'CHANGE_CUE_MODE', isCued })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
