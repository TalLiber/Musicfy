const INITIAL_STATE = {
  isPlaying: false,
  volume: 30,
  songDuration: 0,
  currTime: 0,
  isShuffleMode: false,
  isRepeatMode: false,
  isCued: false,
}

export function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_PLAYER':
      return {
        ...state,
        [action.prop]: action.value
      }
    case 'UPDATE_CURR_TIME_BY_INTERVAL':
      return {
        ...state,
        currTime: state.currTime + 1
      }
    case 'TOGGLE_PROP':
      console.log();
      return {
        ...state,
        [action.prop]: !state[action.prop]
      }
    default:
      return state
  }
}