import './Playlist.css'

import React, { Component } from 'react'

import { AddSong, AddSongForRecs, UpdateSong, RemoveSong, AddSongSuggestions, ToggleSuggestionsModal, RemoveFromSuggestions } from '../../actions/actions.js'

import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'


import * as firebase from 'firebase'
import UUID from 'uuid'

import SongItem from './SongItem'
import SongSuggestion from './SongSuggestion'


class Playlist extends Component {

  componentDidMount = () => {
    firebase.database().ref().child(`${this.props.chatroom}`).child('songs').orderByKey().on('child_added', snap => {
      this.props.AddSong(snap.val())
      this.props.AddSongForRecs(snap.val().spotifyID)
      this.addSongToPlaylist(snap.val())
    })

    firebase.database().ref().child(`${this.props.chatroom}`).child('songs').orderByKey().on('child_changed', snap => {
      this.props.UpdateSong(snap.val())
    })

    firebase.database().ref().child(`${this.props.chatroom}`).child('songs').orderByKey().on('child_removed', snap => {
      this.props.RemoveSong(snap.val())
      this.removeSongFromPlaylist(snap.val())
    })

    firebase.database().ref().child(`${this.props.chatroom}`).child('requests').orderByKey().on('child_added', snap => {
      console.log(snap.val());
      this.props.AddSongSuggestions(snap.val())
      snap.val() !== [] ? this.props.ToggleSuggestionsModal(true) : null
    })


  }

  addSongToPlaylist = (song) => {
    if(this.props.playlistID !== "") {
      fetch(`https://api.spotify.com/v1/users/${this.props.currentUser.id}/playlists/${this.props.playlistID}/tracks`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({"uris": [song.URI]})
      })
    }
  }

  removeSongFromPlaylist = (song) => {
    if(this.props.playlistID !== "") {
      fetch(`https://api.spotify.com/v1/users/${this.props.currentUser.id}/playlists/${this.props.playlistID}/tracks`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({"tracks": [{"uri": song.URI}]})
      })
    }
  }


  renderStore = () => {
    return this.props.songs !== [] ? this.props.songs.map(song => {
      return < SongItem 
        key={ song.id } 
        datum={ song } />
    }) : null
  }

  renderSuggestedStore = () => {
    return this.props.suggestedSongs !== [] && this.props.DJ === true ? this.props.suggestedSongs.map(song => {
      return < SongSuggestion 
                key={ UUID() } 
                suggestion={ song } />
    }) : null
  }

  onClose() {
    this.props.ToggleSuggestionsModal(false)
  }


  onDialogClick = (event) => {
    event.stopPropagation()
  }

  styleProps = () => {
    return this.props.displaySuggestionsModal ? 'white' : 'rgba(255, 255, 255, .3)'
  }

  render(){
    return(
      <div>
        {this.props.displaySuggestionsModal && this.props.DJ ?
          <div className="suggestions-overlay-div" onClick={this.onClose}>
            <div className="suggestions-content-div">
              <div className="suggestions-dialog-div">
                <div className="animated fadeInUp">{this.props.DJ ? this.renderSuggestedStore() : null}</div>
              </div>
            </div>
          </div> : null
        }

        <div className="playlist">
          <h3 className="sub-head">Playlist</h3>
          <div className="song-container">
            { this.renderStore() }
          </div>
        </div>
      </div>
    )
  }


}

const mapStateToProps = state => {
  return {songs: state.songs, currentUser: state.currentUser, playlistID: state.playlistID, chatroom: state.chatroom, seedTracks:state.seedTracks, suggestedSongs: state.suggestedSongs, DJ: state.DJ, displaySuggestionsModal:state.displaySuggestionsModal }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    AddSong, UpdateSong, RemoveSong, AddSongForRecs, AddSongSuggestions, RemoveFromSuggestions, ToggleSuggestionsModal
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
