import './Playlist.css'

import React, { Component } from 'react'
import * as firebase from 'firebase'

import {ToggleSuggestionsModal, RemoveFromSuggestions} from '../../actions/actions.js'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'

import ThumbsUp from '../../svgs/ThumbsUp'
import ThumbsDown from '../../svgs/ThumbsDown'


class SongSuggestion extends Component {

  handleClick = (e) => {
    console.log(e.target.id);
    this.props.ToggleSuggestionsModal(false)

    var updates = {}
    updates[`/${this.props.chatroom}/requests/` + this.props.suggestion.id + '/willBePlayed'] = e.target.id
    var updateVotes = firebase.database().ref().update(updates)

    this.props.RemoveFromSuggestions(this.props.suggestion.id)
  }

  render(){
    return(

     <div className="songSuggestion">
        <div>@{this.props.suggestion.user} requested {this.props.suggestion.song}</div>
        <div className="thumbs">
          <div onClick={this.handleClick} id='true' style={{color: 'green'
          }}><ThumbsUp /></div>
          <div onClick={this.handleClick} id='false' style={{color: 'red'}}><ThumbsDown /></div>
        </div>
      </div>


    )
  }
}

function mapStateToProps(state) {
  return {DJ: state.DJ, suggestedSongs:state.suggestedSongs, displaySuggestionsModal:state.displaySuggestionsModal, chatroom:state.chatroom}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ToggleSuggestionsModal, RemoveFromSuggestions
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SongSuggestion)
