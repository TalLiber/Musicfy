const INITIAL_STATE = {
  isPlaying: false,
  volume: 50,
  songDuration: null,
  currTime: 0,
  isShuffleMode: false,
  isRepeatMode: false,
  isCued: false,
}

export function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'UPDATE_PLAYER':
      console.log(state.currTime);
      return {
        ...state,
        [action.prop]: action.value
      }
    default:
      return state
  }
}