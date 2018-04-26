import React, { Component } from 'react'
import {connect} from 'react-redux'


class Player extends Component {

  handleClick = () => {
    console.log(this.props.songs[3].URI)
    let playSong = this.props.songs[3]
    let playSecondSong = this.props.songs[0]

    fetch(`https://api.spotify.com/v1/me/player/play`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
      body: {
        "uris": ["spotify:track:1301WleyT98MSxVHPZCA6M"],
        "offset": {"position": 5}
      }
    })
    .then( res => console.log(res))
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        NOW PLAYING:
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {songs: state.songs}
}

export default connect(mapStateToProps)(Player)
