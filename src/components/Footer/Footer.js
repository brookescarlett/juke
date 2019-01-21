import './Footer.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { handleErrors } from '../../helpers/helpers';

import Player from '../NowPlaying/Player'

import * as actions from '../../actions/actions.js'

import Play from '../../svgs/Play'
import Pause from '../../svgs/Pause'
import FastForward from '../../svgs/FastForward'
import Volume from '../../svgs/Volume'
import Logo from '../../svgs/Logo'

class Footer extends Component {

  constructor(props){
    super(props)

    this.state = {
      volume: (parseInt(this.props.volume) / 10)
    }

  }

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
      .then( handleErrors ) 
      .catch( console.log )
    } else {
      fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(handleErrors)
      .catch(console.log)
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
    .then(handleErrors)
    .catch(console.log)
  }

  handleInput = (e) => {
    this.setState({
      volume: e.target.value
    }, () => {
      let toNum = (parseInt(this.state.volume) * 10)
      this.changeVolume(toNum)
    })
  }

  changeVolume = (volumePercent) => {
    fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volumePercent}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(handleErrors)
    .catch(console.log)
  }

  render(){
    return(

      <div className="footer">

        <div className="now-playing">
          <Player />
        </div>

        {this.props.DJ ?
          <div className="audio-controls">
            <p onClick={this.playPauseTrack}>{this.props.playPause ? <Pause /> : <Play />}</p>
            <p onClick={this.fastForwardTrack}><FastForward /></p>
          </div>
        : null}

        {this.props.DJ ?
          <div className="volume-controls">
            <Volume />
            <div className="slidecontainer">
              <input type="range" min="1" max="10" value={this.state.volume} className="slider" id="myRange" onChange={this.handleInput} />
            </div>
          </div>
        : null}

        {this.props.DJ === false ?
          <div className="copyright">
            <p><Logo /></p>
            <p>juked.</p>
            <p>© Brooke Scarlett Yalof</p>
          </div>
          : null}


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
