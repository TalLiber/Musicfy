const INITIAL_STATE = {
  playlists: null,
  currPlaylist: {
    name: 'Mood Booster',
    id: '37i9dQZF1DX3rxVfibe1L0',
    image: 'https://i.scdn.co/image/ab67706f00000003bd0e19e810bb4b55ab164a95',
    description: "Get happy with today's dose of feel-good songs!",
    tracks: [
      {
        id: 'WcIcVapfqXw',
        addedAt: '2023-05-26T04:00:00Z',
        title: 'Calm Down (with Selena Gomez)',
        artist: 'Rema',
        album: 'Calm Down (with Selena Gomez)',
        imgUrl:
          'https://i.scdn.co/image/ab67616d0000b273a3a7f38ea2033aa501afd4cf',
      },
      {
        id: 'G7KNmW9a75Y',
        addedAt: '2023-05-26T04:00:00Z',
        title: 'Flowers',
        artist: 'Miley Cyrus',
        album: 'Flowers',
        imgUrl:
          'https://i.scdn.co/image/ab67616d0000b273f429549123dbe8552764ba1d',
      },
      {
        id: '90RLzVUuXe4',
        addedAt: '2023-05-26T04:00:00Z',
        title: "I'm Good (Blue)",
        artist: 'David Guetta',
        album: "I'm Good (Blue)",
        imgUrl:
          'https://i.scdn.co/image/ab67616d0000b273933c036cd61cd40d3f17a9c4',
      },
      {
        id: 'mNEUkkoUoIA',
        addedAt: '2023-05-26T04:00:00Z',
        title: "I Ain't Worried",
        artist: 'OneRepublic',
        album:
          'I Ain’t Worried (Music From The Motion Picture "Top Gun: Maverick")',
        imgUrl:
          'https://i.scdn.co/image/ab67616d0000b273ec96e006b8bdfc582610ec13',
      }
    ],
  },
  currTrackIdx: 0,
  filterBy: {},
  playlistColor:'#000000'
}

export function playlistReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: [...action.playlists],
      }
    case 'UPDATE_CURR_TRACK_IDX_BY_NUM':
      console.log('action.idx', action.idx);
      return {
        ...state,
        currTrackIdx: action.idx,
      }
    case 'UPDATE_CURR_TRACK_IDX_BY_DIR':
      return {
        ...state,
        currTrackIdx: _validateIdx(state.currTrackIdx, state.currPlaylist.tracks.length, action.dir),
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
        filterBy: { ...action.filterBy },
      }
    case 'SET_FILTER_BY':
      return {
        ...state,
        filterBy: { ...action.filterBy },
      }

    case 'change-playlist-color':
      return{
        ...state,
        playlistColor: action.color
      }
    default:
      return state
  }
}

function _validateIdx(currTrackIdx, currPlaylistLength, dir) {
  if (currTrackIdx + dir >= currPlaylistLength) return 0
  else if (currTrackIdx + dir < 0) return currPlaylistLength - 1
  else return currTrackIdx + dir
}