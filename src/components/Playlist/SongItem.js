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
          <p>{this.props.datum.song}</p>
        </div>
        <div className="bottom-row">
          <div><p>{this.props.datum.artist}</p></div>
          <div className="votes">
            <p onClick={this.handleUpVote}><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>{this.props.datum.upVote}</p>
            <p onClick={this.handleDownVote}><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thumbs-down"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg>{this.props.datum.downVote}</p>
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
