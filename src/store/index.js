import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import { playlistReducer } from './reducers/playlists.reducer'
import { songReducer } from './reducers/songs.reducer'
import { userReducer } from './reducers/user.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    playlistModule: playlistReducer,
    userModule: userReducer,
    songModule: songReducer,


})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// window.gStore = store