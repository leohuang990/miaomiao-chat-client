import cover_sign_languageReducer from './cover_sign_language'
import {combineReducers} from 'redux'

const allReducers = combineReducers({
    cover_sign_language: cover_sign_languageReducer
})

export default allReducers