import React, { Component } from 'react'
import {connect} from 'react-redux'


class Player extends Component {

  state = {
    URL: `https://open.spotify.com/embed/user/${this.props.currentUser.id}/playlist/${this.props.playlistID}`
  }

  componentWillReceiveProps(){
    this.setState({
      URL: `https://open.spotify.com/embed/user/${this.props.currentUser.id}/playlist/${this.props.playlistID}`
    })
  }

  renderIframe(){
    return(
    <iframe src={this.state.URL} width="300" height="380"  allowtransparency="true" allow="encrypted-media" id="renderPlaylist"></iframe>
  )
  }
  //
  // componentDidUpdate(){
  //   this.jerry()
  // }

  jerry = () => {
      const bigfuckinglist = document.getElementById('renderPlaylist')
      bigfuckinglist.src = this.state.URL
  }

  // handleClick = () => {
  //   console.log(this.props.songs[3].URI)
  //   let playSong = this.props.songs[3]
  //   let playSecondSong = this.props.songs[0]
  //
  //   fetch(`https://api.spotify.com/v1/me/player/play`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-type': 'application/json',
  //       'Accept': 'application/json',
  //       'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  //     },
  //     body: {
  //       "uris": ["spotify:track:1301WleyT98MSxVHPZCA6M"],
  //       "offset": {"position": 5}
  //     }
  //   })
  //   .then( res => console.log(res))
  // }
  //
  // render() {
  //   return (
  //     <div onClick={this.handleClick}>
  //       NOW PLAYING:
  //     </div>
  //   )
  // }

  // renderiFrame = () => {
  //   return (<iframe src={URL} width="300" height="380"  allowtransparency="true" allow="encrypted-media"></iframe>)
  // }



  render() {
    // const URL = `https://open.spotify.com/embed/user/${this.props.currentUser.id}/playlist/${this.props.playlistID}`
    // console.log(URL)
    //
    console.log(this.props)

    return(
      <div>
        {this.renderIframe()}
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {songs: state.songs, currentUser: state.currentUser, playlistID: state.playlistID}
}

export default connect(mapStateToProps)(Player)
