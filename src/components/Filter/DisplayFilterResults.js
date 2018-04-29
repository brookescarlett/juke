import React, {Component} from 'react'
import * as firebase from 'firebase'
import { ToggleModal } from '../../actions/actions.js'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class DisplayFilterResults extends Component {

  constructor(props) {
    super(props)

    this.state={
      songData: []
    }
  }

  handleClick = (e) => {
    this.props.ToggleModal(false)

    let song = this.props.datum
    this.fetchFunction(song)
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
      user: this.props.name,
      URI: song.uri,
      datum: song
    })
  }

  render(){
    return(
      <div>
        <div onClick={this.handleClick} id={this.props.datum}>
          <p id={this.props.datum}>Track: {this.props.datum.name}</p>
          <p id={this.props.datum}>Artist: {this.props.datum.artists[0].name}</p>
          <p id={this.props.datum}>Album: {this.props.datum.album.name}</p>
          <p>---</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {currentUser: state.currentUser, chatroom: state.chatroom, name:state.name, displayModal: state.displayModal}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ToggleModal
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayFilterResults)
