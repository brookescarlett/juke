import './Footer.css'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/actions.js'

import Play from '../../svgs/Play'
import Pause from '../../svgs/Pause'
import FastForward from '../../svgs/FastForward'
import Volume from '../../svgs/Volume'

class Footer extends Component {

  // state = {
  //   currentlyPlaying: false
  // }

  // componentDidUpdate = () => {
  //   this.renderCurrentlyPlaying()
  // }

  renderCurrentlyPlaying = () => {
    let nowPlaying = document.getElementsByClassName('now-playing')

    if (this.props.currentlyPlaying === []) {
      console.log(this.props.currentlyPlaying)
    } else {
      return nowPlaying.innerHTML = (
        <div>
          <img src={this.props.currentlyPlaying.datum.album.images[2].url} />
          <p className="track">{this.props.currentlyPlaying.song} </p>
          <p className="artist">{this.props.currentlyPlaying.artist}</p>
        </div>
      )
    }
  }

  render(){
    console.log(this.props.playPause)
    return(

      <div className="footer">

        <div className="now-playing">
        </div>

        <div className="audio-controls">
          <p>{this.props.playPause ? <Pause /> : <Play />}</p>
          <p><FastForward /></p>
        </div>

        <div className="volume-controls">
          <Volume />
        </div>


      </div>

    )
  }
}

function mapStateToProps(state) {
  return {DJ:state.DJ, currentlyPlaying: state.currentlyPlaying, playPause: state.playPause}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
