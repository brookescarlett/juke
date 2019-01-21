import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import { SetDJ, SetChatroom, SetName, SetPlaylistId, fetchUser } from '../../actions/actions.js'
import { headers, handleErrors } from '../../helpers/helpers.js'


import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import BigLogo from '../../svgs/BigLogo'

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

    this.state = {
      name: "",
      chatroom: "",
      dj: false,
      disabled: true
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
      this.props.history.push("/signup")
    }

    return hashParams
  }

  componentDidMount = () => {
    this.props.fetchUser()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleEnter = (e) => {
    e.preventDefault()
    let newSongRef = firebase.database().ref(`${this.state.chatroom}`).child('users').push()
    let checkDJ = e.target.id === "join" ? false : true

    newSongRef.set({
      name: this.state.name,
      dj: checkDJ
    }, () => {
      checkDJ ? this.createPlaylist(this.state.chatroom) : null
      this.props.SetName(this.state.name)
      this.props.SetChatroom(this.state.chatroom)
      this.props.SetDJ(checkDJ)
      this.props.history.push("/main")
    })
    
  }

  createPlaylist = (playlistName) => {
    fetch(`https://api.spotify.com/v1/users/${this.props.currentUser.id}/playlists`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({name: playlistName, public: true})
    })
    .then ( res => handleErrors(res) )
    .then ( res => res.json())
    .then ( data => {
      this.props.SetPlaylistId(data.id)
    })
    .catch ( err => console.log('this is an error', err) )
  }

  // openInNewTab = (playlistid) => {
  //   var win = window.open(`https://open.spotify.com/user/${this.props.currentUser.id}/playlist/${playlistid}`, '_blank')
  //   win.focus()
  // }

  render(){
    return(
      <div className="auth-background">
            <div className="center">
              <div className="big-logo">
                <BigLogo />
              </div>

              <div className="form-box">

                <div className="auth-inputs">
                  <input type="text" name="name" placeholder="Enter your name" onChange={this.handleChange} className="input-field"></input>

                  <input type="text" name="chatroom" placeholder="Enter or create your room's token" onChange={this.handleChange} className="input-field"></input>
                </div>

                <div className="auth-buttons">
                  <button onClick={this.handleEnter} className="auth-button" id="join" disabled={!this.state.name || !this.state.chatroom}>JOIN</button>

                  <button onClick={this.handleEnter} className="auth-button" id="create" disabled={!this.state.name || !this.state.chatroom}>CREATE</button>
                </div>
            </div>
        </div>
      </div>
    )
  }


}


const mapStateToProps = state => {
  return {DJ: state.DJ, chatroom: state.chatroom, currentUser: state.currentUser, playlistID: state.playlistID, name:state.name}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    SetDJ, SetChatroom, SetPlaylistId, SetName, fetchUser
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
