import React, { Component } from 'react'
import {connect} from 'react-redux'
// import { RemoveSong } from '../actions/actions.js'
import * as firebase from 'firebase'

class Player extends Component {

  constructor(){
    super()
  }

  componentDidMount = () => {
    if (this.props.songs.length !== 0) {
      fetch('https://api.spotify.com/v1/me/player', {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(res => res.json())
      .then(json => {

        const chatroom = this.props.chatroom
        const state = this.state

        var ref = firebase.database().ref().child(`${this.props.chatroom}`)
        ref.orderByKey().limitToFirst(2).on("child_added", function(snapshot) {

          if (snapshot.val().song === json.item.name) {
            let foundCurrent = snapshot.val()
            debugger
            var updates = {}
            updates[`/${chatroom}/` + foundCurrent.id + '/currentlyPlaying'] = true
            var updateVotes = firebase.database().ref().update(updates)

            let check = state.currentlyPlaying.filter( song => song.id === foundCurrent.id)
            check === [] ? this.setState({currentlyPlaying: this.state.currentlyPlaying, foundCurrent}) : null
          }
        })
      })
    }
  }
  //
  // componentDidMount = () => {
  //   this.checkPlaying()
  // }

  // componentDidUpdate = () => {
  //   this.checkPlaying()
  //   if (this.state.currentlyPlaying.length > 1) {
  //
  //     let toBeRemoved = this.state.currentlyPlaying[0]
  //
  //     var updates = {}
  //     updates[`/${this.props.chatroom}/` + toBeRemoved.id + '/beenPlayed'] = true
  //     var updateVotes = firebase.database().ref().update(updates)
  //
  //     this.setState({
  //       currentlyPlaying: this.state.currentlyPlaying[1]
  //     })
  //   }
  // }


  render(){
    console.log(this.props);
    return(
      <div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {songs: state.songs, currentUser: state.currentUser, playlistID: state.playlistID, DJ :state.DJ, chatroom:state.chatroom}
}

export default connect(mapStateToProps)(Player)
