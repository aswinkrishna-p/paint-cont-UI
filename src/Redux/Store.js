import {configureStore , combineReducers} from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './user/UserSlice'
import painterReducer from './painter/PainterSlice'


const rootReducer = combineReducers({
    user: userReducer,
    painter:painterReducer
})


const persistConfig ={
    key:'root',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:false,
    })
})


export const persistor = persistStore(store)