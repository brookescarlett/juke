import React, {Component} from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import { SetDJ } from '../../actions/actions.js'
import { SetChatroom } from '../../actions/actions.js'
import { SetName } from '../../actions/actions.js'
import { SetPlaylistId } from '../../actions/actions.js'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import * as firebase from 'firebase'

const spotifyApi = new SpotifyWebApi()

class Auth extends Component {

  constructor(props){
    super(props)

    const params = this.getHashParams()
    const token = params.access_token

    if (token) {
      spotifyApi.setAccessToken(token)
    }
  }

  getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }

    try {
      localStorage.setItem('access_token', hashParams.access_token)
      localStorage.setItem('refresh_token', hashParams.refresh_token)
    } catch (err) {
      console.log(err)
      this.props.history.push("/signup")
    }

    console.log(localStorage)
    return hashParams
  }

  state = {
    name: "",
    chatroom: "",
    dj: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleJoin = (e) => {
    e.preventDefault()

    let newSongRef = firebase.database().ref(`${this.state.chatroom}`).child('users').push()

    newSongRef.set({
      name: this.state.name,
      dj: false
    }, () => {
      this.props.SetName(this.state.name)
      this.props.SetChatroom(this.state.chatroom)
      this.props.SetDJ(false)
      this.props.history.push("/main")
    })
  }

  handleCreate = (e) => {
    e.preventDefault()

    let newSongRef = firebase.database().ref(`${this.state.chatroom}`).child('users').push()

    newSongRef.set({
      name: this.state.name,
      dj: true
    }, () => {
      this.createPlaylist(this.state.chatroom)
      this.props.SetName(this.state.name)
      this.props.SetChatroom(this.state.chatroom)
      this.props.SetDJ(true)
      this.props.history.push("/main")
    })

  }

  createPlaylist = (playlistName) => {
    console.log('here')
    fetch(`https://api.spotify.com/v1/users/${this.props.currentUser.id}/playlists`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: JSON.stringify({name: playlistName, public: true})
    })
    .then ( res => res.json())
    .then ( json => {
      this.props.SetPlaylistId(json.id)
      this.openInNewTab(json.id)
    })
  }

  openInNewTab = (playlistid) => {
    var win = window.open(`https://open.spotify.com/user/${this.props.currentUser.id}/playlist/${playlistid}`, '_blank')
    win.focus()
  }

  render(){
    return(
      <div>
          <label>Name:</label>
          <input type="text" name="name" placeholder="enter your name" onChange={this.handleChange}></input>
          <label>Room:</label>
          <input type="text" name="chatroom" placeholder="enter chat room token" onChange={this.handleChange}></input>
          <button onClick={this.handleJoin}>JOIN</button>
          <button onClick={this.handleCreate}>CREATE</button>
      </div>
    )
  }


}


const mapStateToProps = state => {
  return {DJ: state.DJ, chatroom: state.chatroom, currentUser: state.currentUser, playlistID: state.playlistID, name:state.name}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    SetDJ, SetChatroom, SetPlaylistId, SetName
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
