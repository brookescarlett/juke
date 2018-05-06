import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { SetCurrentSong } from '../../actions/actions.js'
import { SetPlayPauseState } from '../../actions/actions.js'
import { SetVolume } from '../../actions/actions.js'
import * as firebase from 'firebase'

class Player extends Component {

  state = {
    getSpotifyRecs: false
  }

  componentDidMount = () => {
    setInterval(this.getDJsTracks, 2000)
  }

  componentWillReceiveProps = () => {
    this.props.songs.length >= 1 ? this.setState({getSpotifyRecs: true}, () => this.getDJRecs()) : null

    this.getSongsForRecs()
  }

  getDJsTracks = () => {
    if (this.props.songs.length !== 0 && this.props.DJ && localStorage.getItem('access_token')) {
      fetch('https://api.spotify.com/v1/me/player', {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }

      })

      .then(res => res.json())
      .then(json => {

        // debugger
          console.log(json);

        this.props.SetPlayPauseState(json.is_playing)
        // console.log(json.device.volume_percent)
        // this.props.SetVolume(json.device.volume_percent)

        const chatroom = this.props.chatroom
        let wasPlaying = ""
        let isPlaying = ""
        var updates = {}

        var ref = firebase.database().ref().child(`${this.props.chatroom}`).child('songs')
        ref.orderByKey().limitToFirst(1).on("child_added", function(snapshot) {
          if (snapshot.val().currentlyPlaying === true) {
            wasPlaying = snapshot.val()
          }
        })

        var ref = firebase.database().ref().child(`${this.props.chatroom}`).child('songs')
        ref.orderByKey().on("child_added", function(snapshot) {
          if (snapshot.val().song === json.item.name) {
            isPlaying = snapshot.val()
            updates[`/${chatroom}/songs/` + isPlaying.id + '/currentlyPlaying'] = true
            var updateVotes = firebase.database().ref().update(updates)
          }
        })

        if (wasPlaying !== "" && isPlaying !== "") {
          if (wasPlaying.id !== isPlaying.id) {
            updates[`/${chatroom}/songs/` + wasPlaying.id] = null
            var updateVotes = firebase.database().ref().update(updates)
          }
        }

        this.props.SetCurrentSong(isPlaying)
        // this.props.SetVolume(json.device.volume_percent)
      })
    }
  }


  getSongsForRecs = () => {
    let seedTracks = this.props.seedTracks.length > 5 ? this.props.seedTracks.slice(-5) : this.props.seedTracks
    console.log(seedTracks);
    return this.props.seedTracks.length >= 1 ? seedTracks.join() : null
  }

  getDJRecs = () => {
    if (this.props.DJ && this.props.songs.length === 1 && this.state.getSpotifyRecs) {
      fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${this.getSongsForRecs()}`, {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        console.log(json.tracks[0])
        this.fetchFunction(json.tracks[0])
      })
    }
  }

  fetchFunction = (song) => {
    let newSongRef = firebase.database().ref(`${this.props.chatroom}`).child('songs').push()
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
      user: 'juked',
      URI: song.uri,
      datum: song
    })
  }

  render(){
    return(
      <div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {songs: state.songs, currentUser: state.currentUser, playlistID: state.playlistID, DJ :state.DJ, chatroom:state.chatroom, playPause: state.playPause, volume:state.volume, seedTracks:state.seedTracks, name:state.name}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    SetCurrentSong, SetPlayPauseState, SetVolume
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
