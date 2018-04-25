import React, { Component } from 'react'

import { AddSong } from '../actions/actions.js'
import { UpdateSong } from '../actions/actions.js'
import { RemoveSong } from '../actions/actions.js'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'


import * as firebase from 'firebase'

import SongItem from '../components/SongItem'
import User from './User'

let id = 0

class Playlist extends Component {

  componentDidMount = () => {
    firebase.database().ref().child('songs').orderByKey().on('child_added', snap => {
      this.props.AddSong(snap.val())
    })

    firebase.database().ref().child('songs').orderByKey().on('child_changed', snap => {
      this.props.UpdateSong(snap.val())
    })

    firebase.database().ref().child('songs').orderByKey().on('child_removed', snap => {
      this.props.RemoveSong(snap.val())
    })
  }

  renderStore = () => {
    return this.props.songs !== [] ? this.props.songs.map(song => {
      id++
      return <SongItem key={id} datum={song}/>
    }) : null
  }

  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index
  }

  renderUsers = () => {
    let userArray = []

    this.props.songs !== [] ? this.props.songs.map(song => {
      userArray.push(song.user)
    }) : null

    let uniques = userArray.filter(this.onlyUnique)

    return uniques.map(user => <User key={user} datum={user}/>)
  }


  render(){
    return(
      <div>
        PLAYLIST
          {this.renderStore()}
        USERLIST
          {this.renderUsers()}
      </div>
    )
  }


}

  const mapStateToProps = state => {
    return {songs: state.songs}
  }

  const mapDispatchToProps = dispatch => {
    return bindActionCreators({
      AddSong, UpdateSong, RemoveSong
    }, dispatch)
  }

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
