import React, {Component} from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import { SetDJ } from '../actions/actions.js'
import { SetChatroom } from '../actions/actions.js'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'


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
      // this.props.history.push("/main")
    } catch (err) {
      console.log(err)
      this.props.history.push("/signup")
    }

    console.log(localStorage)
    return hashParams
  }

  state = {
    chatroom: "",
    dj: false
  }

  handleChange = (e) => {
    this.setState({
      chatroom: e.target.value
    })
  }

  handleClick = (e) => {
    this.setState({
      dj: e.target.checked
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.SetChatroom(this.state.chatroom)
    this.props.SetDJ(this.state.dj)
    this.props.history.push("/main")
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Chat room secret:</label>
          <input type="text" placeholder="enter chat room token" onChange={this.handleChange}></input>
          <label>Are you the DJ?</label>
          <input type="checkbox" onChange={this.handleClick}></input>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }


}


const mapStateToProps = state => {
  return {DJ: state.DJ, chatroom: state.chatroom}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    SetDJ, SetChatroom
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
