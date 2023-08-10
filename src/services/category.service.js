import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import {playlistService} from './playlist.service.js'

// import homeCategories from '../data/home.json'
import categoriesDb from '../data/categories.json'



const STORAGE_KEY = 'category_db'

export const categoryService = {
    query,
    getById,
    save,
    remove,
    getEmptyCategory,
    addCategoryMsg,
    getCategories
}
window.cs = categoryService

async function query(filterBy = {}) {
    // return httpService.get(STORAGE_KEY, filterBy)
    var categories
    if (filterBy.txt = "HomePage") {
        // categories = await storageService.query("HomePage_db")
        categories = await httpService.get('category')
        return categories
    }

    categories = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        categories = categories.filter(category => regex.test(category.vendor) || regex.test(category.description))
    }
    if (filterBy.price) {
        categories = categories.filter(category => category.price <= filterBy.price)
    }
    return categories

}

async function getById(categoryId, name) {
    // const categoryPlaylists = await playlistService.getSpotifyItems('categPlaylists', categoryId)

    // return { name,
    //     items: categoryPlaylists
    // }
    // .then((playlistData) => {
    //   console.log('Playlist:', playlistData.playlists.items);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });

    // return storageService.get(STORAGE_KEY, categoryId)
    // return storageService.get("HomePage_db", categoryId)
        return httpService.get(`playlist/category/${categoryId}`)
}

async function remove(categoryId) {
    await storageService.remove(STORAGE_KEY, categoryId)
        // return httpService.delete(`category/${categoryId}`)
}
async function save(category) {
    var savedCategory
    if (category._id) {
        savedCategory = await storageService.put(STORAGE_KEY, category)
            // savedCategory = await httpService.put(`category/${category._id}`, category)
    } else {
        // Later, owner is set by the backend
        // category.owner = userService.getLoggedinUser()
        savedCategory = await storageService.post(STORAGE_KEY, category)
            // savedCategory = await httpService.post('category', category)
    }
    return savedCategory
}

async function addCategoryMsg(categoryId, txt) {
    // const savedMsg = await httpService.post(`category/${categoryId}/msg`, {txt})
    return savedMsg
}

function getCategories() {
    return categories
}

function getEmptyCategory() {
    return {
        name: 'My Category #2',
        description: '',
        owner: 'user',
        imgUrl: '',
        tracks: []
    }
}



const categories = [{
        "id": "0JQ5DAqbMKFzHmL4tf05da",
        "name": "Mood",
        "imgUrl": "https://t.scdn.co/media/original/mood-274x274_976986a31ac8c49794cbdc7246fd5ad7_274x274.jpg",
        "backgroundColor": "#b49bc8"
    },
    {
        "id": "0JQ5DAqbMKFEC4WFtoNRpw",
        "name": "Pop",
        "imgUrl": "https://t.scdn.co/media/derived/pop-274x274_447148649685019f5e2a03a39e78ba52_0_0_274_274.jpg",
        "backgroundColor": "#f037a5"
    },
    {
        "id": "0JQ5DAqbMKFFzDl7qN9Apr",
        "name": "Chill",
        "imgUrl": "https://t.scdn.co/media/derived/chill-274x274_4c46374f007813dd10b37e8d8fd35b4b_0_0_274_274.jpg",
        "backgroundColor": "#9cf0e1"
    },
    {
        "id": "0JQ5DAqbMKFA6SOHvT3gck",
        "name": "Party",
        "imgUrl": "https://t.scdn.co/images/fada056dcfd54cd28faf80d62b7059c6.jpeg",
        "backgroundColor": "#d7f27d"
    },
    {
        "id": "0JQ5DAqbMKFQ00XGBls6ym",
        "name": "Hip-Hop",
        "imgUrl": "https://t.scdn.co/media/original/hip-274_0a661854d61e29eace5fe63f73495e68_274x274.jpg",
        "backgroundColor": "#8d67ab"
    },
    {
        "id": "0JQ5DAqbMKFCbimwdOYlsl",
        "name": "Focus",
        "imgUrl": "https://t.scdn.co/media/original/genre-images-square-274x274_5e50d72b846a198fcd2ca9b3aef5f0c8_274x274.jpg",
        "backgroundColor": "#503750"
    },
    {
        "id": "0JQ5DAqbMKFDXXwE9BDJAr",
        "name": "Rock",
        "imgUrl": "https://t.scdn.co/media/derived/rock_9ce79e0a4ef901bbd10494f5b855d3cc_0_0_274_274.jpg",
        "backgroundColor": "#7358ff"
    },
    {
        "id": "0JQ5DAqbMKFFtlLYUHv8bT",
        "name": "Alternative",
        "imgUrl": "https://t.scdn.co/images/ee9451b3ed474c82b1da8f9b5eafc88f.jpeg",
        "backgroundColor": "#af2896"
    },
    {
        "id": "0JQ5DAqbMKFPw634sFwguI",
        "name": "EQUAL",
        "imgUrl": "https://t.scdn.co/images/084155aeaa724ea1bd393a017d67b709",
        "backgroundColor": "#148a08"
    },
    {
        "id": "0JQ5DAqbMKFCWjUTdzaG0e",
        "name": "Indie",
        "imgUrl": "https://t.scdn.co/images/fe06caf056474bc58862591cd60b57fc.jpeg",
        "backgroundColor": "#eb1e32"
    },
    {
        "id": "0JQ5DAqbMKFHOzuVTgTizF",
        "name": "Dance/Electronic",
        "imgUrl": "https://t.scdn.co/media/derived/edm-274x274_0ef612604200a9c14995432994455a6d_0_0_274_274.jpg",
        "backgroundColor": "#0d73ec"
    },
    {
        "id": "0JQ5DAqbMKFLb2EqgLtpjC",
        "name": "Wellness",
        "imgUrl": "https://t.scdn.co/images/3710b68657574bc79df14bd74629e5ac",
        "backgroundColor": "#509bf5"
    },
    {
        "id": "0JQ5DAqbMKFCuoRTxhYWow",
        "name": "Sleep",
        "imgUrl": "https://t.scdn.co/media/derived/sleep-274x274_0d4f836af8fab7bf31526968073e671c_0_0_274_274.jpg",
        "backgroundColor": "#1e3264"
    },
    {
        "id": "0JQ5DAqbMKFRKBHIxJ5hMm",
        "name": "Tastemakers",
        "imgUrl": "https://t.scdn.co/images/b4182906bf244b4994805084c057e9ee.jpeg",
        "backgroundColor": "#1e3264"
    },
    {
        "id": "0JQ5DAqbMKFIVNxQgRNSg0",
        "name": "Decades",
        "imgUrl": "https://t.scdn.co/images/b611cf5145764c64b80e91ccd5f357c8",
        "backgroundColor": "#ba5d07"
    },
    {
        "id": "0JQ5DAqbMKFAXlCG6QvYQ4",
        "name": "Workout",
        "imgUrl": "https://t.scdn.co/media/links/workout-274x274.jpg",
        "backgroundColor": "#777777"
    },
    {
        "id": "0JQ5DAqbMKFx0uLQR2okcc",
        "name": "At Home",
        "imgUrl": "https://t.scdn.co/images/04da469dd7be4dab96659aa1fa9f0ac9.jpeg",
        "backgroundColor": "#b49bc8"
    },
    {
        "id": "0JQ5DAqbMKFAQy4HL4XU2D",
        "name": "Travel",
        "imgUrl": "https://t.scdn.co/media/derived/travel-274x274_1e89cd5b42cf8bd2ff8fc4fb26f2e955_0_0_274_274.jpg",
        "backgroundColor": "#2d46b9"
    },
    {
        "id": "0JQ5DAqbMKFy78wprEpAjl",
        "name": "Folk & Acoustic",
        "imgUrl": "https://t.scdn.co/images/7fe0f2c9c91f45a3b6bae49d298201a4.jpeg",
        "backgroundColor": "#283ea3"
    },
    {
        "id": "0JQ5DAqbMKFLVaM30PMBm4",
        "name": "Summer",
        "imgUrl": "https://t.scdn.co/images/8e508d7eb5b843a89c368c9507ecc429.jpeg",
        "backgroundColor": "#283ea3"
    },
    {
        "id": "0JQ5DAqbMKFEZPnFQSFB1T",
        "name": "R&B",
        "imgUrl": "https://t.scdn.co/media/derived/r-b-274x274_fd56efa72f4f63764b011b68121581d8_0_0_274_274.jpg",
        "backgroundColor": "#dc148c"
    },
    {
        "id": "0JQ5DAqbMKFIpEuaCnimBj",
        "name": "Soul",
        "imgUrl": "https://t.scdn.co/media/derived/soul-274x274_266bc900b35dda8956380cffc73a4d8c_0_0_274_274.jpg",
        "backgroundColor": "#dc148c"
    },
    {
        "id": "0JQ5DAqbMKFAJ5xb0fwo9m",
        "name": "Jazz",
        "imgUrl": "https://t.scdn.co/images/568f37f1cab54136939d63bd1f59d40c",
        "backgroundColor": "#f59b23"
    },
    {
        "id": "0JQ5DAqbMKFRieVZLLoo9m",
        "name": "Instrumental",
        "imgUrl": "https://t.scdn.co/images/384c2b595a1648aa801837ff99961188",
        "backgroundColor": "#477d95"
    },
    {
        "id": "0JQ5DAqbMKFAjfauKLOZiv",
        "name": "Punk",
        "imgUrl": "https://t.scdn.co/media/derived/punk-274x274_f3f1528ea7bbb60a625da13e3315a40b_0_0_274_274.jpg",
        "backgroundColor": "#233268"
    },
    {
        "id": "0JQ5DAqbMKFQFQN0rnK48G",
        "name": "Flamenco",
        "imgUrl": "https://t.scdn.co/images/37780cd0347248e38195515fc7ca061a.jpeg",
        "backgroundColor": "#ff4632"
    },
    {
        "id": "0JQ5DAqbMKFDkd668ypn6O",
        "name": "Metal",
        "imgUrl": "https://t.scdn.co/media/original/metal_27c921443fd0a5ba95b1b2c2ae654b2b_274x274.jpg",
        "backgroundColor": "#777777"
    },
    {
        "id": "0JQ5DAqbMKFxXaXKP7zcDp",
        "name": "Latin",
        "imgUrl": "https://t.scdn.co/images/26a60378-a374-4cd7-b894-28efa5e154cb.jpg",
        "backgroundColor": "#e1118b"
    },
    {
        "id": "0JQ5DAqbMKFPrEiAOxgac3",
        "name": "Classical",
        "imgUrl": "https://t.scdn.co/media/derived/classical-274x274_abf78251ff3d90d2ceaf029253ca7cb4_0_0_274_274.jpg",
        "backgroundColor": "#e1118b"
    },
    {
        "id": "0JQ5DAqbMKFObNLOHydSW8",
        "name": "Caribbean",
        "imgUrl": "https://t.scdn.co/images/495fadcefe234607b14b2db3381f3f5d.jpeg",
        "backgroundColor": "#0d73ec"
    },
    {
        "id": "0JQ5DAqbMKFCfObibaOZbv",
        "name": "Gaming",
        "imgUrl": "https://t.scdn.co/images/0d39395309ba47838ef12ce987f19d16.jpeg",
        "backgroundColor": "#e8115b"
    },
    {
        "id": "0JQ5DAqbMKFQiK2EHwyjcU",
        "name": "Blues",
        "imgUrl": "https://t.scdn.co/images/6fe5cd3ebc8c4db7bb8013152b153505",
        "backgroundColor": "#1e3264"
    },
    {
        "id": "funk",
        "name": "Funk",
        "imgUrl": "https://t.scdn.co/images/f4f0987fcab446fcaa7173acb5e25701.jpeg",
        "backgroundColor": "#e61e32"
    },
    {
        "id": "0JQ5DAqbMKFF9bY76LXmfI",
        "name": "Frequency",
        "imgUrl": "https://t.scdn.co/images/cad629fb65a14de4beddb38510e27cb1",
        "backgroundColor": "#ffc864"
    },
    {
        "id": "0JQ5DAqbMKFQIL0AXnG5AK",
        "name": "Trending",
        "imgUrl": "https://t.scdn.co/media/derived/trending-274x274_7b238f7217985e79d3664f2734347b98_0_0_274_274.jpg",
        "backgroundColor": "#ff4632"
    },
    {
        "id": "0JQ5DAqbMKFFoimhOqWzLB",
        "name": "Kids & Family",
        "imgUrl": "https://t.scdn.co/images/664bb84f7a774e1eadb7c227aed98f3c",
        "backgroundColor": "#8d67ab"
    },
    {
        "id": "0JQ5DAqbMKFKLfwjuJMoNC",
        "name": "Country",
        "imgUrl": "https://t.scdn.co/images/a2e0ebe2ebed4566ba1d8236b869241f.jpeg",
        "backgroundColor": "#b49bc8"
    },
    {
        "id": "0JQ5DAqbMKFGvOw3O4nLAf",
        "name": "K-Pop",
        "imgUrl": "https://t.scdn.co/images/2078afd91e4d431eb19efc5bee5ab131.jpeg",
        "backgroundColor": "#148a08"
    },
    {
        "id": "0JQ5DAqbMKFLjmiZRss79w",
        "name": "Ambient",
        "imgUrl": "https://t.scdn.co/images/9210c5a26e6a4b4da2c3ea8e5f87fff8",
        "backgroundColor": "#477d95"
    },
    {
        "id": "0JQ5DAqbMKFF1br7dZcRtK",
        "name": "Pride",
        "imgUrl": "https://t.scdn.co/images/c5495b9f0f694ffcb39c9217d4ed4375",
        "backgroundColor": "#477d95"
    }
]

// const catIds = ['0JQ5DAqbMKFzHmL4tf05da', '0JQ5DAqbMKFEC4WFtoNRpw', '0JQ5DAqbMKFFzDl7qN9Apr']



// ;(() => {
//     utilService.saveToStorage("category_db", categories)
// })()


// ;
// (() => {
//     utilService.saveToStorage("HomePage_db", homeCategories)
// })()