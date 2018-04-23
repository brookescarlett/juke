import React, { Component } from 'react';
import * as firebase from 'firebase'

export default class SongItem extends Component {

  render(){
    return(
      <div>
        <p>song title: {this.props.datum.song}</p>
        <p>claps: {this.props.datum.claps}</p>
        <p>added by: {this.props.datum.user}</p>
        <p>data: {this.props.datum.data}</p>
        <p>-----</p>
      </div>
    )
  }
}
