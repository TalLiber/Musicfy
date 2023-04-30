const INITIAL_STATE = {
    playlists: null,
    currSong: {
        addedAt: '2023-04-11T18:10:48Z',
        title: 'Call Me Maybe',
        artist: 'Carly Rae Jepsen',
        album: 'Kiss (Deluxe)',
        imgUrl: 'https://i.scdn.co/image/ab67616d0000b273a111f7769013f1731e9c697c',
    },
    filterBy: {},
}

export function playlistReducer(state = INITIAL_STATE, action) {
    // debugger
    switch (action.type) {
        case 'SET_PLAYLISTS':
            return {
                ...state,
                playlists: [...action.playlists],
            }
        case 'ADD_PLAYLIST':
            return {
                ...state,
                playlists: [action.playlist, ...state.playlists],
            }
        case 'REMOVE_PLAYLIST':
            return {
                ...state,
                playlists: state.playlists.filter(
                    (playlist) => playlist._id !== action.playlistId
                ),
            }
        case 'UPDATE_PLAYLIST':
            return {
                ...state,
                playlists: state.playlists.map((playlist) =>
                    playlist._id === action.playlist._id ? action.playlist : playlist
                ),
            }
        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: {...action.filterBy },
            }

        default:
            return state
    }
}