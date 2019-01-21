import * as firebase from 'firebase'

export let addSongToFirebase = (song, chatroom, name) => {
    let newSongRef = firebase.database().ref(chatroom).child('songs').push()
    newSongRef.set({
        id: newSongRef.key,
        song: song.name,
        artist: song.artists[0].name,
        album: song.album.name,
        upVote: 0,
        downVote: 0,
        currentlyPlaying: false,
        beenPlayed: false,
        spotifyID: song.id,
        user: name,
        URI: song.uri,
        datum: song
    })
}
