import './Playlist.css'

import React, { Component } from 'react'
import * as firebase from 'firebase'

import {ToggleSuggestionsModal, RemoveFromSuggestions} from '../../actions/actions.js'
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import XCircle from '../../svgs/XCircle'


class SongSuggestion extends Component {

  handleClick = (e) => {
    this.props.ToggleSuggestionsModal(false)

    var updates = {}
    updates[`/${this.props.chatroom}/requests/` + this.props.suggestion.id ] = null
    console.log(updates);
    var updateVotes = firebase.database().ref().update(updates)
  }

  render(){
    return(

     <div className="songSuggestion">
        <div>@{this.props.suggestion.user} requested {this.props.suggestion.song}</div>
        <div onClick={this.handleClick} id={this.props.suggestion.id}><XCircle /></div>
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
