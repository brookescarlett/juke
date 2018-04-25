import React, { Component } from 'react';
import * as firebase from 'firebase'

export default class SongItem extends Component {

  handleUpVote = (e) => {
    let id = this.props.datum.id
    let upVote = ++this.props.datum.upVote

    var updates = {}
    updates['/songs/' + id + '/upVote'] = upVote
    var updateVotes = firebase.database().ref().update(updates)

    this.checkVotes()
  }

  handleDownVote = (e) => {
    let id = this.props.datum.id
    let downVote = --this.props.datum.downVote

    var updates = {}
    updates['/songs/' + id + '/downVote'] = downVote
    var updateVotes = firebase.database().ref().update(updates)

    this.checkVotes()
  }

  checkVotes = () => {
    let id = this.props.datum.id

    if (this.props.datum.upVote - Math.abs(this.props.datum.downVote) <= -10) {
      var updates = {}
      updates['/songs/' + id ] = null
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
        <p>added by: {this.props.datum.user}</p>
        {/* <p>data: {this.props.datum.data}</p> */}
        <p>-----</p>
      </div>
    )
  }
}
