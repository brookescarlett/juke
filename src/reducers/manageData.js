export default function manageData(state = {
  songs: [],
  tokens: [],
  loading: false,
  currentUser: []
}, action){

  switch(action.type) {
    case 'ADD_SONG':
      return {
        ...state,
        songs: [...state.songs, action.payload]
      }

    case 'REMOVE_SONG':
      let songToRemove = state.songs.filter(song => action.payload.id === song.id)
      let songToRemoveIndex = state.songs.indexOf(songToRemove[0])
      return {
        ...state,
        songs: [...state.songs.slice(0, songToRemoveIndex),
                ...state.songs.slice(songToRemoveIndex + 1)]
      }

    case 'UPDATE_SONG':
      let foundSong = state.songs.filter(song => action.payload.id === song.id)
      let foundIndex = state.songs.indexOf(foundSong[0])
      return {
        ...state,
        songs: [...state.songs.slice(0, foundIndex),
                action.payload,
                ...state.songs.slice(foundIndex + 1)]
      }


    case 'START_GETTING_USER':
      return{
        ...state,
        loading: true
      }

    case 'ADD_USER':
      return{
        ...state,
        loading: false,
        currentUser: action.payload
      }

    case 'ADD_TOKEN':
      // debugger
      return {
        ...state,
        loading: false,
        tokens: [...state.tokens, action.payload]
      }

    default:
      return state
  }


}
