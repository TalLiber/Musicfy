const INITIAL_STATE = {
    playlists: null,
    filterBy: {

    }
}


export function playlistReducer(state = INITIAL_STATE, action) {
    // debugger
    switch (action.type) {
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: [...action.playlists]
            }
        case 'ADD_PLAYLIST':
            return {
                ...state,
                playlists: [action.playlist, ...state.playlists]
            }
        case 'REMOVE_PLAYLIST':
            return {
                ...state,
                playlists: state.playlists.filter(playlist => playlist._id !== action.playlistId)
            }
        case 'UPDATE_PLAYLIST':
            return {
                ...state,
                playlists: state.playlists.map(playlist => playlist._id === action.playlist._id ? action.playlist : playlist)
            }
        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: {...action.filterBy }
            }

        default:
            return state
    }

}