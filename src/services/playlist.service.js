import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

// import playlist from '../data/playlist.json'
// assert { type: 'json' }


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

async function query(filterBy = {}) {
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
        // playlist.owner = userService.getLoggedinUser()
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
        name: 'My Playlist #2',
        description: '',
        owner: 'user',
        imgUrl: '',
        tracks: []
    }
}


// TEST DATA
const playlist = [{
    "description": "songs you can’t help but scream along to",
    "id": "37i9dQZF1DX2KwEtNSejGe",
    "imgUrl": "https://i.scdn.co/image/ab67706f00000003a83ff89e84f67350d0de273a",
    "name": "pop songs we can all scream",
    "owner": "spotify",
    "tracks": [{
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Call Me Maybe",
            "artist": "Carly Rae Jepsen",
            "album": "Kiss (Deluxe)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273a111f7769013f1731e9c697c"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "What Makes You Beautiful",
            "artist": "One Direction",
            "album": "Up All Night",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2734a5584795dc73860653a9a3e"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "We Are Never Ever Getting Back Together (Taylor's Version)",
            "artist": "Taylor Swift",
            "album": "Red (Taylor's Version)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273318443aab3531a0558e79a4d"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "One Last Time",
            "artist": "Ariana Grande",
            "album": "My Everything (Deluxe)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273deec12a28d1e336c5052e9aa"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Wild Ones (feat. Sia)",
            "artist": "Flo Rida",
            "album": "Wild Ones",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273871d85943145dde548f4ae09"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Stronger (What Doesn't Kill You)",
            "artist": "Kelly Clarkson",
            "album": "Stronger (Deluxe Version)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273253e3f8fce535f72a6b2c4ba"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Rolling in the Deep",
            "artist": "Adele",
            "album": "21",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2732118bf9b198b05a95ded6300"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Umbrella",
            "artist": "Rihanna",
            "album": "Good Girl Gone Bad: Reloaded",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273f9f27162ab1ed45b8d7a7e98"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Hips Don't Lie (feat. Wyclef Jean)",
            "artist": "Shakira",
            "album": "Oral Fixation, Vol. 2 (Expanded Edition)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b27327ddd747545c0d0cfe7595fa"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Just Dance",
            "artist": "Lady Gaga",
            "album": "The Fame",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273631810af03785dbad83f5c81"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "I Kissed A Girl",
            "artist": "Katy Perry",
            "album": "One Of The Boys",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273cd3978ebe35d93a07249b97f"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "She Looks So Perfect",
            "artist": "5 Seconds of Summer",
            "album": "5 Seconds Of Summer",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b27393432e914046a003229378da"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Raise Your Glass",
            "artist": "P!nk",
            "album": "Raise Your Glass",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2736f3451faa271fbe470685f34"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Shut Up and Dance",
            "artist": "WALK THE MOON",
            "album": "TALKING IS HARD",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b27343294cfa2688055c9d821bf3"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "TiK ToK",
            "artist": "Kesha",
            "album": "Animal (Expanded Edition)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2737a6339d6ddfd579f77559b3c"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "We Can't Stop",
            "artist": "Miley Cyrus",
            "album": "Bangerz (Deluxe Version)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2736b18d0490878750cd69abf2c"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Give Me Everything (feat. Ne-Yo, Afrojack & Nayer)",
            "artist": "Pitbull",
            "album": "Planet Pit (Deluxe Version)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2731dc7483a9fcfce54822a2f19"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Bang Bang",
            "artist": "Jessie J",
            "album": "Sweet Talker (Deluxe Version)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273930f686fe89425c7b6bf9a7d"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Work from Home (feat. Ty Dolla $ign)",
            "artist": "Fifth Harmony",
            "album": "7/27 (Deluxe)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273d03fa6f4e758282b7920b5c8"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Toxic",
            "artist": "Britney Spears",
            "album": "In The Zone",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273efc6988972cb04105f002cd4"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "good 4 u",
            "artist": "Olivia Rodrigo",
            "album": "SOUR",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Shake It Off",
            "artist": "Taylor Swift",
            "album": "1989",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2739abdf14e6058bd3903686148"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Classic",
            "artist": "MKTO",
            "album": "MKTO",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2739474419f15773875a495eed3"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "SexyBack (feat. Timbaland)",
            "artist": "Justin Timberlake",
            "album": "FutureSex/LoveSounds",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273c6ba98fd3f3b396a6c6f7091"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Maneater - Radio Version",
            "artist": "Nelly Furtado",
            "album": "Girl Power Tracks",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273c3ee319c9a25f3b4343e0344"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Shout Out to My Ex",
            "artist": "Little Mix",
            "album": "Glory Days (Expanded Edition)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2733042c53026e29faf3a21c9f9"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Run the World (Girls)",
            "artist": "Beyoncé",
            "album": "4",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273ff5429125128b43572dbdccd"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "24K Magic",
            "artist": "Bruno Mars",
            "album": "24K Magic",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273232711f7d66a1e19e89e28c5"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Starships",
            "artist": "Nicki Minaj",
            "album": "Pink Friday ... Roman Reloaded",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b27385235715597dcd07bb9e0f84"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Lush Life",
            "artist": "Zara Larsson",
            "album": "So Good",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2739e1683774b22648f4f178ed3"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Only Girl (In The World)",
            "artist": "Rihanna",
            "album": "Loud (Japan Version)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b27331548865f7c729290b96c794"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Baby",
            "artist": "Justin Bieber",
            "album": "My World 2.0",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273629dc9e2e3bc20bbd7d92e4a"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Ugly Heart",
            "artist": "G.R.L.",
            "album": "G.R.L.",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273cc5da1d919f3ee4b8318b38d"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "California Gurls",
            "artist": "Katy Perry",
            "album": "Teenage Dream: The Complete Confection",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273937af329667311f4b2831616"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Party In The U.S.A.",
            "artist": "Miley Cyrus",
            "album": "The Time Of Our Lives",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273d6c3ad6a2a27471e1d5e8103"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Ridin' Solo",
            "artist": "Jason Derulo",
            "album": "Jason Derulo",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273c7b1b93cd2dcb8d528a30a1d"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Boom Clap",
            "artist": "Charli XCX",
            "album": "SUCKER",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273b3f49d38597780046ad62b87"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Paper Planes",
            "artist": "M.I.A.",
            "album": "Kala",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273a8ea5b2ab46dc5fc899ef81e"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "American Boy",
            "artist": "Estelle",
            "album": "Shine",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b27398dc3e242a818007dd67b7c5"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Best Song Ever",
            "artist": "One Direction",
            "album": "Midnight Memories (Deluxe)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2732f76b797c382bedcafdf45e1"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "The Sweet Escape",
            "artist": "Gwen Stefani",
            "album": "The Sweet Escape",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2738dd53da15b55d402dfc3a20e"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Fancy",
            "artist": "Iggy Azalea",
            "album": "The New Classic (Deluxe Version)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273b1c6cf12c9fb4f9014b711ba"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Want U Back",
            "artist": "Cher Lloyd",
            "album": "Sticks & Stones",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273392d37cdeccdcdb378fed318"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Price Tag",
            "artist": "Jessie J",
            "album": "Who You Are (Platinum Edition)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2739900b995cd1a81c35c574ab0"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "How We Do (Party)",
            "artist": "Rita Ora",
            "album": "ORA",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2735e75a5b55e3ec710a76fbea7"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Dance with Me Tonight",
            "artist": "Olly Murs",
            "album": "In Case You Didn't Know",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273ff2057b7343d2233451ff8e7"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Since U Been Gone",
            "artist": "Kelly Clarkson",
            "album": "Breakaway",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b27303dadde4d9d305c1c3e0d91c"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Love Me Again",
            "artist": "John Newman",
            "album": "Tribute",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273c31ce98936c6c5d0deefe978"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Glamorous",
            "artist": "Fergie",
            "album": "The Dutchess",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2730283b8c1365d34315f5807bf"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "We Found Love",
            "artist": "Rihanna",
            "album": "Talk That Talk",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273bef074de9ca825bddaeb9f46"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Memories (feat. Kid Cudi)",
            "artist": "David Guetta",
            "album": "One Love (Deluxe)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273b2e43ed3850e072831f7b2c6"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Black Magic",
            "artist": "Little Mix",
            "album": "Get Weird (Expanded Edition)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273995994477ea1ae8097978bf8"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "I Love It (feat. Charli XCX)",
            "artist": "Icona Pop",
            "album": "THIS IS... ICONA POP",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2734e2e6035e60579c7bdc6fb33"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "What Do You Mean?",
            "artist": "Justin Bieber",
            "album": "Purpose (Deluxe)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273f46b9d202509a8f7384b90de"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "I Knew You Were Trouble (Taylor's Version)",
            "artist": "Taylor Swift",
            "album": "Red (Taylor's Version)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273318443aab3531a0558e79a4d"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Telephone",
            "artist": "Lady Gaga",
            "album": "The Fame Monster (Deluxe Edition)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2735c9890c0456a3719eeecd8aa"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "I Like It",
            "artist": "Cardi B",
            "album": "Invasion of Privacy",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273a0caffda54afd0a65995bbab"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Glad You Came",
            "artist": "The Wanted",
            "album": "Battleground (Deluxe Edition)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b27317a142a78128fb7c54ab9aa4"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Unwritten",
            "artist": "Natasha Bedingfield",
            "album": "Unwritten",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273b337e1ca6629a53c66a3b0d4"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "It Girl",
            "artist": "Jason Derulo",
            "album": "Future History (Deluxe Edition)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273644681440f5bf0fa272b0745"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "positions",
            "artist": "Ariana Grande",
            "album": "Positions",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2735ef878a782c987d38d82b605"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Super Bass",
            "artist": "Nicki Minaj",
            "album": "Pink Friday (Complete Edition)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273aa7d2641af0fa4c1f76fafbf"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Promiscuous",
            "artist": "Nelly Furtado",
            "album": "Loose",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273a6f439c8957170652f9410e2"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Superstar",
            "artist": "Jamelia",
            "album": "Thank You",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273ac27b4f5d1ad74f433274cd5"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Wannabe",
            "artist": "Spice Girls",
            "album": "Spice",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b27363facc42e4a35eb3aa182b59"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Time of Our Lives",
            "artist": "Pitbull",
            "album": "Globalization",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2731e340d1480e7bb29a45e3bd7"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Domino",
            "artist": "Jessie J",
            "album": "Who You Are (Platinum Edition)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2739900b995cd1a81c35c574ab0"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Can't Hold Us (feat. Ray Dalton)",
            "artist": "Macklemore & Ryan Lewis",
            "album": "The Heist",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b27398a02fef3a8b1d80a0f164ec"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Say My Name",
            "artist": "Destiny's Child",
            "album": "The Writing's On The Wall",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2733718df75b57340c1947747e8"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Live Your Life",
            "artist": "T.I.",
            "album": "Paper Trail",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273b6d4478c6f91f1cb2d326c78"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Dynamite",
            "artist": "Taio Cruz",
            "album": "The Rokstarr Hits Collection",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b27366c3eb32692a0ae487079cf1"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Fight For This Love",
            "artist": "Cheryl",
            "album": "3 Words",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2730c8a195a0b99ddb449ec4b8b"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "So What",
            "artist": "P!nk",
            "album": "Funhouse (Expanded Edition)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2735a45d5041e4ffcb9f756f740"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Good Time",
            "artist": "Owl City",
            "album": "The Midsummer Station",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273cf5459850259268f98b07f7a"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Rude Boy",
            "artist": "Rihanna",
            "album": "Rated R",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273ab647295c0c97446c1f1a3b5"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Boss Bitch",
            "artist": "Doja Cat",
            "album": "Boss Bitch",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b27310356a0e81371e6644cb1371"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "I Gotta Feeling",
            "artist": "Black Eyed Peas",
            "album": "THE E.N.D. (THE ENERGY NEVER DIES)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273382514f0114ba8f4a16d5db4"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "All About Tonight",
            "artist": "Pixie Lott",
            "album": "Young Foolish Happy (Deluxe Edition)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b27340af958ef49c378666fe8998"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Bad Romance",
            "artist": "Lady Gaga",
            "album": "The Fame Monster (Deluxe Edition)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2735c9890c0456a3719eeecd8aa"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Single Ladies (Put a Ring on It)",
            "artist": "Beyoncé",
            "album": "I AM...SASHA FIERCE",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273e13de7b8662b085b0885ffef"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "We R Who We R",
            "artist": "Kesha",
            "album": "Cannibal (Expanded Edition)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2733556ff5e46e50eb27be71ebe"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Uptown Funk (feat. Bruno Mars)",
            "artist": "Mark Ronson",
            "album": "Uptown Special",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273e419ccba0baa8bd3f3d7abf2"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "History",
            "artist": "One Direction",
            "album": "Made In The A.M. (Deluxe Edition)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273241e4fe75732c9c4b49b94c3"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Blank Space",
            "artist": "Taylor Swift",
            "album": "1989",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2739abdf14e6058bd3903686148"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Ghost",
            "artist": "Ella Henderson",
            "album": "Chapter One",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b27397e683c96c753930a39159fc"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "All About That Bass",
            "artist": "Meghan Trainor",
            "album": "Title (Deluxe)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2733b11178cccd78ec77fc12dbc"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Say It Right",
            "artist": "Nelly Furtado",
            "album": "Loose",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273a6f439c8957170652f9410e2"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "I Really Like You",
            "artist": "Carly Rae Jepsen",
            "album": "Emotion (Deluxe Expanded Edition)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2735708b3925c13b1b8d6fac466"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Don't Stop The Music",
            "artist": "Rihanna",
            "album": "Good Girl Gone Bad: Reloaded",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273f9f27162ab1ed45b8d7a7e98"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Watermelon Sugar",
            "artist": "Harry Styles",
            "album": "Fine Line",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b27377fdcfda6535601aff081b6a"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "A Thousand Miles",
            "artist": "Vanessa Carlton",
            "album": "Best Of",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273a88fa19b7543b39a3ea542d9"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Birthday",
            "artist": "Katy Perry",
            "album": "PRISM",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2731e9a057052d59004caf47e22"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Worth It (feat. Kid Ink)",
            "artist": "Fifth Harmony",
            "album": "Reflection (Deluxe)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2735bdd9e580fdda5e676a25e6a"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Jenny from the Block (feat. Jadakiss & Styles P.) - Track Masters Remix",
            "artist": "Jennifer Lopez",
            "album": "Jenny From The Block - The Remixes",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273d5cf73c1679244d959651dff"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Halo",
            "artist": "Beyoncé",
            "album": "I AM...SASHA FIERCE",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273801c4d205accdba0a468a10b"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Steal My Girl",
            "artist": "One Direction",
            "album": "FOUR (Deluxe)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273d304ba2d71de306812eebaf4"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Ain't Your Mama",
            "artist": "Jennifer Lopez",
            "album": "Ain't Your Mama",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273b1ab92b8e26ab1cb783ffe15"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Bitch Better Have My Money",
            "artist": "Rihanna",
            "album": "Bitch Better Have My Money",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273c137319751a89295f921cce8"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Don't Call Me Up",
            "artist": "Mabel",
            "album": "Ivy To Roses (Mixtape)",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b273fb4278cf3d557dc89ca80ad5"
        },
        {
            "addedAt": "2023-04-11T18:10:48Z",
            "title": "Born This Way",
            "artist": "Lady Gaga",
            "album": "Born This Way",
            "imgUrl": "https://i.scdn.co/image/ab67616d0000b2734ba15b951a5cff36133ca5bd"
        }
    ]
}];
(async() => {
    // await storageService.post(STORAGE_KEY, playlist)
    //     await storageService.post(STORAGE_KEY, {vendor: 'Subali Rahok 2', price: 240})
})()