import fetch from 'isomorphic-fetch'
import * as firebase from 'firebase'

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

export let SetCurrentSong = obj => {
  return {
    type: "SET_CURRENT_SONG",
    payload: obj
  }
}


// export function AddSongsToPlaylist(addToQueue) {
//   // debugger
//   let uris = addToQueue.map( song => song.URI)
//   console.log(uris);
//   return (dispatch) => {
//     dispatch({type: 'START_MAKING_PLAYLIST'})
//     fetch(`https://api.spotify.com/v1/users/${this.currentUser.id}/playlists/${this.playlistID}/tracks`, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json',
//         'Accept': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('access_token')}`
//       },
//       body: JSON.stringify({"uris": uris})
//     })
//     .then(res => res.json())
//     .then(json => {
//       addToQueue.forEach(song => {
//         var updates = {}
//         updates['/songs/' + song.id + '/inPlaylist'] = true
//         var updateStatus = firebase.database().ref().update(updates)
//         dispatch({type: 'UPDATE_SONG', payload: song})
//       })
//     })
//   }
// }

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
