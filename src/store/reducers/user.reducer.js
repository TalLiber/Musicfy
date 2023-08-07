
const INITIAL_STATE = {
    loggedInUser: {
        fullname: '',
        imgUrl: null,
        playlist: []
    }
}

export function userReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'UPDATE_USER':
            return {
                ...state,
                loggedInUser: action.user
            }
            
        default:
            return state;
    }

}