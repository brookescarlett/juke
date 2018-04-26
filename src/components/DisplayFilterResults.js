import React, {Component} from 'react'
import * as firebase from 'firebase'
import {connect} from 'react-redux'

class DisplayFilterResults extends Component {

  constructor() {
    super()

    this.state={
      songData: []
    }
  }

  handleClick = (e) => {
    let song = this.props.datum
    this.fetchFunction(song)
  }

  fetchFunction = (song) => {
    let newSongRef = firebase.database().ref(`${this.props.chatroom}`).push()

    newSongRef.set({
      id: newSongRef.key,
      song: song.name,
      artist: song.artists[0].name,
      album: song.album.name,
      upVote: 0,
      downVote: 0,
      inPlaylist: false,
      beenPlayed: false,
      user: this.props.currentUser.display_name,
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
  return {currentUser: state.currentUser, chatroom: state.chatroom}
}

export default connect(mapStateToProps)(DisplayFilterResults)
