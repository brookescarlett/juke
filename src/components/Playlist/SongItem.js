import './Playlist.css'

import React, { Component } from 'react'
import * as firebase from 'firebase'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

class SongItem extends Component {


  handleUpVote = (e) => {
    let id = this.props.datum.id
    let upVote = ++this.props.datum.upVote

    var updates = {}
    updates[`/${this.props.chatroom}/songs/` + id + '/upVote'] = upVote
    var updateVotes = firebase.database().ref().update(updates)

    this.checkVotes()
  }

  handleDownVote = (e) => {
    let id = this.props.datum.id
    let downVote = --this.props.datum.downVote

    var updates = {}
    updates[`/${this.props.chatroom}/songs/` + id + '/downVote'] = downVote
    var updateVotes = firebase.database().ref().update(updates)

    this.checkVotes()
  }

  checkVotes = () => {
    let id = this.props.datum.id

    if (this.props.datum.upVote - Math.abs(this.props.datum.downVote) <= -10) {
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
          <p>song title: {this.props.datum.song}</p>
        </div>
        <div className="bottom-row">
          <div><p>song artist: {this.props.datum.artist}</p></div>
          <div className="votes">
            <p onClick={this.handleUpVote}>upvote: {this.props.datum.upVote}</p>
            <p onClick={this.handleDownVote}>downVote: {this.props.datum.downVote}</p>
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
