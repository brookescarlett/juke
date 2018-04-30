import './Footer.css'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import Player from '../NowPlaying/Player'

import * as actions from '../../actions/actions.js'

import Play from '../../svgs/Play'
import Pause from '../../svgs/Pause'
import FastForward from '../../svgs/FastForward'
import Volume from '../../svgs/Volume'

class Footer extends Component {

  constructor(props){
    super(props)

    this.state = {
      volume: (parseInt(this.props.volume) / 10)
    }

  }

  // componentWillReceiveProps = () => {
  //   console.log(this.props.currentlyPlaying)
  //   return this.props.currentlyPlaying !== [] ? this.renderCurrentlyPlaying() : null
  // }
  //
  // renderCurrentlyPlaying = () => {
  //   let nowPlaying = document.getElementsByClassName('now-playing')
  //   if (this.props.currentlyPlaying === [] || this.props.currentlyPlaying.datum === undefined) {
  //     console.log(this.props.currentlyPlaying)
  //   } else {
  //     nowPlaying[0].innerHTML = (
  //       <div>
  //         <p className="track">{this.props.currentlyPlaying.song} </p>
  //         <p className="artist">{this.props.currentlyPlaying.artist}</p>
  //       </div>
  //     )
  //     debugger
  //   }
  //   console.log(nowPlaying);
  //   return nowPlaying
  // }

  playPauseTrack = () => {
    if (this.props.playPause) {
      fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(res => console.log(res))
    } else {
      fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(res => console.log(res))
    }
  }

  fastForwardTrack = () => {
    fetch('https://api.spotify.com/v1/me/player/next', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(res => console.log(res))
  }

  handleInput = (e) => {
    this.setState({
      volume: e.target.value
    }, () => {
      let toNum = (parseInt(this.state.volume) * 10)
      console.log(toNum)
      this.changeVolume(toNum)
    })
  }

  changeVolume = (volumePercent) => {
    console.log(volumePercent);
    fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volumePercent}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(res => console.log(res))
  }

  render(){
    return(

      <div className="footer">

        <div className="now-playing">
          <Player />
        </div>

        <div className="audio-controls">
          <p onClick={this.playPauseTrack}>{this.props.playPause ? <Pause /> : <Play />}</p>
          <p onClick={this.fastForwardTrack}><FastForward /></p>
        </div>

        <div className="volume-controls">
          <Volume />
          <div class="slidecontainer">
            <input type="range" min="1" max="10" value={this.state.volume} class="slider" id="myRange" onInput={this.handleInput} />
          </div>
        </div>


      </div>

    )
  }
}

function mapStateToProps(state) {
  return {DJ:state.DJ, currentlyPlaying: state.currentlyPlaying, playPause: state.playPause, volume:state.volume}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
