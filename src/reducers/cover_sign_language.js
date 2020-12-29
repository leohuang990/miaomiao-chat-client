
const cover_sign_languageReducer = (state = 'English', action)=>{
    if (!action.language) return state;
    return action.language
}

export default cover_sign_languageReducer