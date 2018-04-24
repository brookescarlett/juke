export default function manageData(state = {
  songs: [],
  tokens: [],
  loading: false
}, action){

  switch(action.type) {
    case 'ADD_SONG':
      return {
        ...state,
        songs: [...state.songs, action.payload]
      }


    case 'START_GETTING_USER':
      return{
        ...state,
        loading: true
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
