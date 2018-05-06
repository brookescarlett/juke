import fetch from 'isomorphic-fetch'

export let AddSong = obj => {
  return {
    type: "ADD_SONG",
    payload: obj
  }
}

export let RemoveSong = obj => {
  return {
    type: "REMOVE_SONG",
    payload: obj
  }
}

export let UpdateSong = obj => {
  return {
    type: "UPDATE_SONG",
    payload: obj
  }
}

export let SetPlaylistId = string => {
  return {
    type: "ADD_PLAYLISTID",
    payload: string
  }
}

export let SetDJ = bool => {
  return {
    type: "SET_DJ",
    payload: bool
  }
}

export let SetChatroom = string => {
  return {
    type: "SET_CHATROOM",
    payload: string
  }
}

export let SetName = string => {
  return {
    type: "SET_NAME",
    payload: string
  }
}

export let SetQuery = string => {
  return {
    type: "SET_QUERY",
    payload: string
  }
}

export let SetCurrentSong = obj => {
  return {
    type: "SET_CURRENT_SONG",
    payload: obj
  }
}

export let ToggleModal = (bool) => {
  return {
    type: "TOGGLE_MODAL",
    payload: bool
  }
}

export let SetPlayPauseState = (bool) => {
  return {
    type: "SET_PLAY_PAUSE",
    payload: bool
  }
}

export let SetVolume = (num) => {
  return {
    type: "SET_VOLUME",
    payload: num
  }
}

export let AddSongForRecs = (uri) => {
  return {
    type: "GET_RECS",
    payload: uri
  }
}

export let AddSongSuggestions = (song) => {
  return {
    type: "ADD_SONG_SUGGESTION",
    payload: song
  }
}

export let ToggleSuggestionsModal = (bool) => {
  return {
    type: 'TOGGLE_SUGGESTIONS_MODAL',
    payload: bool
  }
}

export let RemoveFromSuggestions = (song) => {
  return {
    type: 'REMOVE_FROM_SUGGESTIONS', 
    payload: song
  }
}

export function fetchUser() {
  return (dispatch) => {
    dispatch({type: 'START_GETTING_USER'})
    return fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then( res => res.json())
    .then( json => {
      dispatch({type: 'ADD_USER', payload: json})
    })
  }

}
