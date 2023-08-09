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

export function signup(userCred) {

    return async (dispatch) => {
        try {
            await userService.signup(userCred)
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
                imgUrl: null,
                playlist: []
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
            const userId = await userService.getLoggedinUser()
            const user = await userService.getById(userId._id)
            if(user) dispatch({ type: 'UPDATE_USER', user})
        } catch(err) {
            console.log('err:', err)
        }
    }
}

export function addUserPlaylist(playlist) {
    return async (dispatch, getState) => {
        try {
            const user = getState().userModule.loggedInUser
            user.playlist.push({...playlist })
            await userService.update(user)
            dispatch({ type: 'UPDATE_USER', user})
        } catch(err) {
            console.log('err:', err)
        }
    }
}
export function removeUserPlaylist(playlistId) {
    return async (dispatch, getState) => {
        try {
            const user = getState().userModule.loggedInUser
            user.playlist = user.playlist.filter( playlist => playlist.spotifyId !== playlistId )
            await userService.update(user)
            dispatch({ type: 'UPDATE_USER', user})
        } catch(err) {
            console.log('err:', err)
        }
    }
}

export function addUserTrack(track) {
    return async (dispatch, getState) => {
        try {
            const user = getState().userModule.loggedInUser
            user.likedTracks? user.likedTracks.push({...track }) : user.likedTracks = [track]
            await userService.update(user)
            dispatch({ type: 'UPDATE_USER', user})
        } catch(err) {
            console.log('err:', err)
        }
    }
}
export function removeUserTrack(trackId) {
    return async (dispatch, getState) => {
        try {
            const user = getState().userModule.loggedInUser
            user.likedTracks = user.likedTracks.filter( likedTrack => likedTrack.id !== trackId )
            await userService.update(user)
            dispatch({ type: 'UPDATE_USER', user})
        } catch(err) {
            console.log('err:', err)
        }
    }
}