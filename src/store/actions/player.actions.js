
export function updatePlayer(prop, value) {
    console.log(prop, value);
    return (dispatch) => {
        try {
            dispatch({ type: 'UPDATE_PLAYER', prop, value })
        } catch (err) {
            console.log('err:', err)
        }
    }
}
