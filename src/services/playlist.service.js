
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import playlist from '../data/playlist.json' assert {type: 'json'}


const STORAGE_KEY = 'playlist_db'

export const playlistService = {
    query,
    getById,
    save,
    remove,
    getEmptyPlaylist,
    addPlaylistMsg
}
window.cs = playlistService

async function query(filterBy = { }) {
    // return httpService.get(STORAGE_KEY, filterBy)

    var playlists = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        playlists = playlists.filter(playlist => regex.test(playlist.vendor) || regex.test(playlist.description))
    }
    if (filterBy.price) {
        playlists = playlists.filter(playlist => playlist.price <= filterBy.price)
    }
    return playlists

}
function getById(playlistId) {
    return storageService.get(STORAGE_KEY, playlistId)
    // return httpService.get(`playlist/${playlistId}`)
}

async function remove(playlistId) {
    await storageService.remove(STORAGE_KEY, playlistId)
    // return httpService.delete(`playlist/${playlistId}`)
}
async function save(playlist) {
    var savedPlaylist
    if (playlist._id) {
        savedPlaylist = await storageService.put(STORAGE_KEY, playlist)
        // savedPlaylist = await httpService.put(`playlist/${playlist._id}`, playlist)

    } else {
        // Later, owner is set by the backend
        playlist.owner = userService.getLoggedinUser()
        savedPlaylist = await storageService.post(STORAGE_KEY, playlist)
        // savedPlaylist = await httpService.post('playlist', playlist)
    }
    return savedPlaylist
}

async function addPlaylistMsg(playlistId, txt) {
    // const savedMsg = await httpService.post(`playlist/${playlistId}/msg`, {txt})
    return savedMsg
}


function getEmptyPlaylist() {
    return {
        vendor: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}


// TEST DATA
;(async ()=>{
    // await storageService.post(STORAGE_KEY, playlist)
//     await storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 240})
})()


