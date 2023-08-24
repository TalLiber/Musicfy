
const INITIAL_STATE = {
    loggedInUser: {
        _id:1234,
        fullname: 'Guest',
        imgUrl: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png",
        playlist: [
            {
              id: "64d9c83ddd8712469043ee7f",
              spotifyId: "37i9dQZF1DX06817kK7cRP",
              name: "Smooth Jazz Beats",
              image: "https://i.scdn.co/image/ab67706f0000000301b89480638dbea6239a31a0"
            },
            {
              spotifyId: "37i9dQZF1DX45grRWk2ghU",
              name: "Hot Pink",
              image: "https://i.scdn.co/image/ab67706f00000003d6233b53b06497fd1d13449e"
            },
            {
              spotifyId: "37i9dQZF1DX5mMspCVmB8S",
              name: "צ'יל ישראלי",
              image: "https://i.scdn.co/image/ab67706f000000032c807179398712898a03251d"
            },
            {
              spotifyId: "37i9dQZF1DX5Ejj0EkURtP",
              name: "All Out 2010s",
              image: "https://i.scdn.co/image/ab67706f00000003b0fe40a6e1692822f5a9d8f1"
            }
          ],
        likedTracks:[
            {
              addedAt: "2023-06-23T04:00:00Z",
              id: "2Fa9ea7JFK1gyYFs9sFrtM",
              title: "Dummy",
              artists: [
                "Portugal. The Man"
              ],
              imgUrl: "https://i.scdn.co/image/ab67616d0000b27327e49a37460c4445053eeb4f",
              formalDuration: 145093,
              album: "Chris Black Changed My Life",
              youtubeId: "8xT0vWporWs"
            },
            {
              addedAt: "2023-06-23T04:00:00Z",
              id: "6vu5xJWIvukCK8cwBXOOj0",
              title: "Living In A Haze",
              artists: [
                "Milky Chance"
              ],
              imgUrl: "https://i.scdn.co/image/ab67616d0000b27384e9e803499a83ff405f8034",
              formalDuration: 173369,
              album: "Living In A Haze",
              youtubeId: ""
            },
            {
              addedAt: "2023-06-15T21:00:00Z",
              id: "2b9TjqgLxE6zOZc4DSmYYx",
              title: "פרובוקטיבית",
              artists: [
                "Noa Kirel",
                "Forever Tel Aviv",
                "Sagi Kariv"
              ],
              imgUrl: "https://i.scdn.co/image/ab67616d0000b273e31f0dbe1b2339f504495d6e",
              formalDuration: 154921,
              album: "פרובוקטיבית",
              youtubeId: "mv0BtAepULk"
            },
            {
              addedAt: "2023-06-15T21:07:07Z",
              id: "4E5fqKktoOAT3shxlolPBm",
              title: "אינטלקטוערסית",
              artists: [
                "Odeya"
              ],
              imgUrl: "https://i.scdn.co/image/ab67616d0000b273adc328a60ca324d33183e4b7",
              formalDuration: 128000,
              album: "אינטלקטוערסית",
              youtubeId: "UNZJQw8cr6o"
            },
            {
              addedAt: "2023-07-30T23:02:49Z",
              id: "1BxfuPKGuaTgP7aM0Bbdwr",
              title: "Cruel Summer",
              artists: [
                "Taylor Swift"
              ],
              imgUrl: "https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647",
              formalDuration: 178426,
              album: "Lover",
              youtubeId: "JLJcHbYSlB8"
            },
            {
              addedAt: "2021-01-07T10:31:17Z",
              id: "7J1uxwnxfQLu4APicE5Rnj",
              title: "Billie Jean",
              artists: [
                "Michael Jackson"
              ],
              imgUrl: "https://i.scdn.co/image/ab67616d0000b273de437d960dda1ac0a3586d97",
              formalDuration: 294226,
              album: "Thriller",
              youtubeId: ""
            },
            {
              addedAt: "2021-01-07T10:31:17Z",
              id: "2tUBqZG2AbRi7Q0BIrVrEj",
              title: "I Wanna Dance with Somebody (Who Loves Me)",
              artists: [
                "Whitney Houston"
              ],
              imgUrl: "https://i.scdn.co/image/ab67616d0000b273cc57e9b00b87dd0f6e868347",
              formalDuration: 291293,
              album: "Whitney",
              youtubeId: "eH3giaIzONA"
            }
        ],
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