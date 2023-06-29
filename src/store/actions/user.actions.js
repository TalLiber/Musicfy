import { userService } from '../../services/user.service'

export function login(userCred) {

    return async (dispatch) => {
        try {
            const user = await userService.login(userCred)
            dispatch({ type: 'UPDATE_USER', user})
        } catch (err) {
            console.log('err:', err)
        }
    }
}