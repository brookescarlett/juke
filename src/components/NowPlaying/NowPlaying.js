import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { SetCurrentSong, SetPlayPauseState, SetVolume } from '../../actions/actions.js'
import { headers, addSongToFirebase, handleErrors } from '../../helpers/helpers.js'

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
        headers: headers
      })
      .then( res => handleErrors(res) )
      .then( res => res.json() )
      .then( json => {

        this.props.SetPlayPauseState(json.is_playing)
     
      
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
          if (json.item !== null && snapshot.val().song === json.item.name) {
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
      .catch(err => console.log(err))
    }
  }


  getSongsForRecs = () => {
    let seedTracks = this.props.seedTracks.length > 5 ? this.props.seedTracks.slice(-5) : this.props.seedTracks
    return this.props.seedTracks.length >= 1 ? seedTracks.join() : null
  }

  getDJRecs = () => {
    if (this.props.DJ && this.props.songs.length === 1 && this.state.getSpotifyRecs) {
      fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=${this.getSongsForRecs()}`, {
        headers: headers
      })
      .then( res => handleErrors(res) )
      .then( res => res.json() )
      .then( json => {
        addSongToFirebase( json.tracks[0], this.props.chatroom, 'juked' )
        // this.fetchFunction(json.tracks[0])
      })
      .catch(err => console.log(err))
    }
  }

  render(){
    return(
      <Fragment>
      </Fragment>
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
