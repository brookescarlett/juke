import './Footer.css'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../../actions/actions.js'

import Play from '../../svgs/Play'

class Footer extends Component {

  render(){
    return(

      <div className="footer">
        <div className="audio-controls">
          <Play />
        </div>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {currentUser: state.currentUser, chatroom: state.chatroom, name: state.name, DJ:state.DJ}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)
