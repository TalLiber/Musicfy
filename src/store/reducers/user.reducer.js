
const INITIAL_STATE = {
    loggedInUser: {
        name: 'Jorji',
        balance: 300
    }
}

export function userReducer(state = INITIAL_STATE, action) {

    switch (action.type) {
        case 'UPDATE_USER':
            const { loggedInUser } = state
            return {
                ...state,
                loggedInUser: { ...loggedInUser, [action.key]: action.value }
            }

        default:
            return state;
    }

}