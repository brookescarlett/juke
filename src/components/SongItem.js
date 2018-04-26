import React, { Component } from 'react'
import * as firebase from 'firebase'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

class SongItem extends Component {


  handleUpVote = (e) => {
    console.log(this.props.chatroom)
    let id = this.props.datum.id
    let upVote = ++this.props.datum.upVote

    var updates = {}
    updates[`/${this.props.chatroom}/` + id + '/upVote'] = upVote
    var updateVotes = firebase.database().ref().update(updates)

    this.checkVotes()
  }

  handleDownVote = (e) => {
    let id = this.props.datum.id
    let downVote = --this.props.datum.downVote

    var updates = {}
    updates[`/${this.props.chatroom}/` + id + '/downVote'] = downVote
    var updateVotes = firebase.database().ref().update(updates)

    this.checkVotes()
  }

  checkVotes = () => {
    let id = this.props.datum.id

    if (this.props.datum.upVote - Math.abs(this.props.datum.downVote) <= -10) {
      var updates = {}
      updates[`/${this.props.chatroom}/` + id ] = null
      var updateVotes = firebase.database().ref().update(updates)
    }
  }

  render(){
    return(
      <div>
        <p>song title: {this.props.datum.song}</p>
        <p>song artist: {this.props.datum.artist}</p>
        <p>song album: {this.props.datum.album}</p>
        <p onClick={this.handleUpVote}>upvote: {this.props.datum.upVote}</p>
        <p onClick={this.handleDownVote}>downVote: {this.props.datum.downVote}</p>
        <p>currentlyPlaying: {this.props.datum.currentlyPlaying ? "true" : "false"}</p>
        <p>added by: {this.props.datum.user}</p>
        {/* <p>data: {this.props.datum.data}</p> */}
        <p>-----</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {chatroom: state.chatroom}
}

export default connect(mapStateToProps)(SongItem)
