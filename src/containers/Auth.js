import React, {Component} from 'react'

import * as actions from '../actions/actions.js'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import * as firebase from 'firebase'
import SpotifyWebApi from 'spotify-web-api-js'

const clientID = "e3eedba3c2584d3db92f1c396df003bf"
const spotifyApi = new SpotifyWebApi()

class Auth extends Component {

  constructor(props){
    super(props)

    const params = this.getHashParams()
    const token = params.access_token

    if (token) {
      this.props.actions.AddToken(params)
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
      this.props.history.push("/main")
    } catch (err) {
      console.log(err)
      this.props.history.push("/signup")
    }

    console.log(localStorage)
    return hashParams
  }

  render(){
    return(
      <div>
      </div>
    )
  }


}

const mapStateToProps = state => {
  return {tokens: state.tokens}
}

const mapDispatchToProps = dispatch => {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
