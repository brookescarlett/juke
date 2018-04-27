import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as firebase from 'firebase'

class Player extends Component {

  state = {
    currentlyPlaying: ""
  }

  componentWillReceiveProps = () => {
    let currentlyPlaying = ""

    var ref = firebase.database().ref().child(`${this.props.chatroom}`)
    ref.orderByKey().limitToFirst(1).on("child_added", function(snapshot) {
      if (snapshot.val().currentlyPlaying === true) {
        currentlyPlaying = snapshot.val()
      }
    })

    this.setState({
      currentlyPlaying: currentlyPlaying
    })
  }

  renderCurrentlyPlaying = () => {
    if (this.state.currentlyPlaying === "") {
      console.log('GET OUT')
    } else {
      console.log(this.state.currentlyPlaying)
      return(
        <div>
          <p>artwork:</p>
          <img src={this.state.currentlyPlaying.datum.album.images[1].url}/>
          <p>title: <strong>{this.state.currentlyPlaying.song}</strong></p>
          <p>album: {this.state.currentlyPlaying.album}</p>
        </div>
      )
    }
  }


  render() {
    return(
      <div>
        {this.state.currentlyPlaying !== "" ? this.renderCurrentlyPlaying() : null}
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {songs: state.songs, currentUser: state.currentUser, playlistID: state.playlistID, currentlyPlaying: state.currentlyPlaying, DJ: state.DJ, chatroom: state.chatroom}
}

export default connect(mapStateToProps)(Player)
