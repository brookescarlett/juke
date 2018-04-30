import React, { Component } from 'react'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { SetCurrentSong } from '../../actions/actions.js'
import { SetPlayPauseState } from '../../actions/actions.js'
import * as firebase from 'firebase'

class Player extends Component {

  componentDidMount = () => {
    setInterval(this.getDJsTracks, 2000)
  }

  getDJsTracks = () => {
    if (this.props.songs.length !== 0 && this.props.DJ) {
      fetch('https://api.spotify.com/v1/me/player', {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(res => res.json())
      .then(json => {

        this.props.SetPlayPauseState(json.is_playing)
        console.log(this.props.playPause)

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

      })
    }
  }

  render(){
    return(
      <div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {songs: state.songs, currentUser: state.currentUser, playlistID: state.playlistID, DJ :state.DJ, chatroom:state.chatroom, playPause: state.playPause}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    SetCurrentSong, SetPlayPauseState
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
