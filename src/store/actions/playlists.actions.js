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

export function updateTrackIdx(byType, toUpdate) {
    return (dispatch) => {
        try {
            if(byType === 'dir') dispatch({ type: 'UPDATE_CURR_TRACK_IDX_BY_DIR', dir: toUpdate })
            else dispatch({ type: 'UPDATE_CURR_TRACK_IDX_BY_NUM', idx: toUpdate })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
