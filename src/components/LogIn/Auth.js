import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import { SetDJ, SetChatroom, SetName, SetPlaylistId, fetchUser } from '../../actions/actions.js'
import { headers, handleErrors } from '../../helpers/helpers.js'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import BigLogo from '../../svgs/BigLogo'

import * as firebase from 'firebase'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import styled from '@emotion/styled'


const Input = styled.input`
  width: 300px;
	padding: 2px 20px;
	border-radius: 100px;
	border: none;
	margin-bottom: 20px;
	background-color: rgba(255, 255, 255, 0.75);
`

const Button = styled.button`
  width: 160px;
	padding: 5px 20px;
	border-radius: 100px;
	border: none;
	color: white;
	font-weight: bolder;
	letter-spacing: 2px;
	font-size: 1rem;
  background-color: var(--nav-navy);
  &:disabled {
    background: 'rgba(30, 29, 70, 0.5)'
  }
`
const authButtonDisabled = css({
  ':disabled': {
    background: 'rgba(30, 29, 70, 0.5)'
  }
})

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
    }, () => console.log(this.state))
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
      console.log(data)
      this.props.SetPlaylistId(data.id)
    })
      .catch(err => this.props.history.push("/signup"))
  }


  render(){
    return(
      <div className="auth-background">
            <div className="center">
              <div className="big-logo">
                <BigLogo />
              </div>

            <div className="form-box">
              <div className="auth-inputs">
                  
                <Input 
                  type="text" 
                  name="name" 
                  placeholder="Enter your name" 
                  onChange={this.handleChange} />

                <Input
                  type="text"
                  name="chatroom"
                  placeholder="Enter or create your room's token"
                  onChange={this.handleChange} />
            
              </div>

              <div className="auth-buttons">
                <Button 
                  onClick={this.handleEnter}  
                  id="join" 
                  disabled={!this.state.name || !this.state.chatroom}
                  css={authButtonDisabled}>
                  JOIN
                </Button>

                <Button
                  onClick={this.handleEnter}
                  id="create"
                  disabled={!this.state.name || !this.state.chatroom}
                  css={authButtonDisabled}>
                  CREATE
                </Button>
               
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
