export default function manageData(state = {
  songs: [],
  loading: false,
  loadingPlaylist: false,
  currentUser: [],
  currentlyPlaying: [],
  playlistID: "",
  DJ: false,
  chatroom: "",
  query: "",
  name: "",
  displayModal: false,
  playPause: false,
  volume: 5,
  seedTracks: []

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

    case 'START_MAKING_PLAYLIST':
      return{
        ...state,
        loadingPlaylist: true
      }

    case 'ADD_USER':
      return{
        ...state,
        loading: false,
        currentUser: action.payload
      }

    case 'ADD_PLAYLISTID':
      return {
        ...state,
        playlistID: action.payload
      }

    case 'SET_DJ':
      return {
        ...state,
        DJ: action.payload
      }

    case 'SET_QUERY':
      return {
        ...state,
        query: action.payload
      }

    case 'SET_CHATROOM':
      return {
        ...state,
        chatroom: action.payload
      }

    case 'SET_NAME':
      return {
        ...state,
        name: action.payload
      }

    case 'SET_CURRENT_SONG':
      return {
        ...state,
        currentlyPlaying: action.payload
      }

    case 'TOGGLE_MODAL':
      return {
        ...state,
        displayModal: action.payload
      }

    case 'SET_PLAY_PAUSE':
      return{
      ...state,
      playPause: action.payload
    }

    case 'SET_VOLUME':
      return{
      ...state,
      volume: action.payload
    }

    case 'GET_RECS':
      return{
      ...state,
      seedTracks: [...state.seedTracks, action.payload]
    }


    default:
      return state
  }


}
