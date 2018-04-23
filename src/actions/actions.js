export let AddSong = obj => {
  return {
    type: "ADD_SONG",
    payload: obj
  }
}

export let GetSongs = () => {
  return {
    type: "GET_SONGS",
    payload: "cookie"
  }
}
