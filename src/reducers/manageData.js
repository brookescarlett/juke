export default function manageData(state = {
  songs: [],
}, action){

  switch(action.type) {
    case 'ADD_SONG':
    // console.log('before state:', state.songs)
      return {
        ...state,
        songs: [...state.songs, action.payload]
      }

    case 'GET_SONGS':
      // debugger
      return state.songs

    default:
      return state
  }


}
