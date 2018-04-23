import React, { Component } from 'react'
import * as firebase from 'firebase'

export default class Filter extends Component {

  handleChange = (e) => {
    if (e.key === 'Enter') {
      this.fetchFunction(e.target.value)
      e.target.value = ''
    }

  }

  fetchFunction = (song) => {
    let newSongRef = firebase.database().ref('songs/').push()

    newSongRef.set({
      song: song,
      claps: 0,
      user: 'brooke',
      data: 'other spotify datums'
    })
    // firebase.database().ref('songs/' + song).set({
    //   song: song,
    //   claps: 0,
    //   user: 'brooke',
    //   data: 'other spotify datums'
    // }, () => console.log('mission completed', song))
  }

  render(){
    return(

      <div>
        FILTER
        <input type="text" onKeyPress={this.handleChange}></input>
      </div>
    )
  }
}
