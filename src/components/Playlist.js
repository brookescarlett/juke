import React, { Component } from 'react'

import { AddSong } from '../actions/actions.js'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import * as firebase from 'firebase'

import SongItem from '../components/SongItem'

let id = 0

class Playlist extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount = () => {
    firebase.database().ref().child('songs').orderByKey().on('child_added', snap => {
      this.props.AddSong(snap.val())
    })

    // firebase.database().ref().child('songs').orderByKey().on('child_changed', snap => {
    //   this.props.AddSong(snap.val())
    //  })
    //
    // firebase.database().ref().child('songs').orderByKey().on('child_removed', snap => {
    //   this.props.AddSong(snap.val())
    // })
  }

  renderStore = () => {
    return this.props.songs !== [] ? this.props.songs.map(song => {
      id++
      return <SongItem key={id} datum={song}/>
    }) : null
  }


  render(){
    return(
      <div>
        PLAYLIST
          {this.renderStore()}
      </div>
    )
  }


}

  const mapStateToProps = state => {
    return {songs: state.songs}
  }

  const mapDispatchToProps = dispatch => {
    return bindActionCreators({
      AddSong
    }, dispatch)
  }

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)
