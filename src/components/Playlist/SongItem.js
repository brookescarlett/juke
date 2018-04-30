import './Playlist.css'

import React, { Component } from 'react'
import * as firebase from 'firebase'

import { connect } from 'react-redux'

import ThumbsUp from '../../svgs/ThumbsUp'
import ThumbsDown from '../../svgs/ThumbsDown'

class SongItem extends Component {

  // state = {
  //   disableUp: false,
  //   disableDown: false
  // }

  handleUpVote = (e) => {
    // if (this.state.disableUp === false) {
      let id = this.props.datum.id
      let upVote = ++this.props.datum.upVote

      var updates = {}
      updates[`/${this.props.chatroom}/songs/` + id + '/upVote'] = upVote
      var updateVotes = firebase.database().ref().update(updates)

      this.checkVotes()

      this.setState({
        disableUp: true
      })
    // }

  }

  handleDownVote = (e) => {
    // if (this.state.disableDown === false) {
      let id = this.props.datum.id
      let downVote = ++this.props.datum.downVote

      var updates = {}
      updates[`/${this.props.chatroom}/songs/` + id + '/downVote'] = downVote
      var updateVotes = firebase.database().ref().update(updates)

      this.checkVotes()

      this.setState({
        disableDown: true
      })
    // }
  }

  checkVotes = () => {
    let id = this.props.datum.id

    if (this.props.datum.upVote - this.props.datum.downVote <= -10) {
      var updates = {}
      updates[`/${this.props.chatroom}/songs/` + id ] = null
      var updateVotes = firebase.database().ref().update(updates)
    }
  }

  render(){
    return(
      <div className="song">
        <div className="song-content">
          <p>@{this.props.datum.user}</p>
          <p>{this.props.datum.song}</p>
        </div>
        <div className="bottom-row">
          <div><p>{this.props.datum.artist}</p></div>
          <div className="votes">
            <p onClick={this.handleUpVote}><ThumbsUp /><span>{this.props.datum.upVote}</span></p>
            <p onClick={this.handleDownVote}><ThumbsDown /><span>{this.props.datum.downVote}</span></p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {chatroom: state.chatroom}
}

export default connect(mapStateToProps)(SongItem)
