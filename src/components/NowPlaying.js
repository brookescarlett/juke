import React, { Component } from 'react'
import {connect} from 'react-redux'
// import { RemoveSong } from '../actions/actions.js'
import * as firebase from 'firebase'

class Player extends Component {

  constructor(props){
    super(props)
  }

  componentDidUpdate = () => {
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
        let wasPlaying = ""
        let isPlaying = ""
        var updates = {}

        var ref = firebase.database().ref().child(`${this.props.chatroom}`)
        ref.orderByKey().limitToFirst(1).on("child_added", function(snapshot) {
          if (snapshot.val().currentlyPlaying === true) {
            wasPlaying = snapshot.val()
            debugger
          }
        })

        var ref = firebase.database().ref().child(`${this.props.chatroom}`)
        ref.orderByKey().on("child_added", function(snapshot) {
          if (snapshot.val().song === json.item.name) {
            isPlaying = snapshot.val()
            updates[`/${chatroom}/` + isPlaying.id + '/currentlyPlaying'] = true
            var updateVotes = firebase.database().ref().update(updates)
            debugger
          }
        })

        if (wasPlaying !== "" && isPlaying !== "") {
          if (wasPlaying.id !== isPlaying.id) {
            updates[`/${chatroom}/` + wasPlaying.id] = null
            var updateVotes = firebase.database().ref().update(updates)
            debugger
          }
        }

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
