import React, { Component } from 'react';
import * as firebase from 'firebase'

export default class SongItem extends Component {

  handleClick = (e) => {
    const rootRef = firebase.database().ref().child('songs')
    console.log(e.target, rootRef)
  }

  render(){
    return(
      <div>
        <p>song title: {this.props.datum.song}</p>
        <p>song artist: {this.props.datum.artist}</p>
        <p>song album: {this.props.datum.album}</p>
        <p onClick={this.handleClick}>claps: {this.props.datum.claps}</p>
        <p>added by: {this.props.datum.user}</p>
        {/* <p>data: {this.props.datum.data}</p> */}
        <p>-----</p>
      </div>
    )
  }
}
