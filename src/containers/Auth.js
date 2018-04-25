import React, {Component} from 'react'
import SpotifyWebApi from 'spotify-web-api-js'

const spotifyApi = new SpotifyWebApi()

export default class Auth extends Component {

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
