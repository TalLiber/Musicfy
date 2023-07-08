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
export function logout() {

    return async (dispatch) => {
        try {
            await userService.logout()
            const user = {
                fullname: '',
                imgUrl: null
            }
            dispatch({ type: 'UPDATE_USER', user})
        } catch (err) {
            console.log('err:', err)
        }
    }
}

export function getLoggedinUser() {
    return async (dispatch) => {
        try {
            const user = await userService.getLoggedinUser()
            if(user) dispatch({ type: 'UPDATE_USER', user})
        } catch(err) {
            console.log('err:', err)
        }
    }
}