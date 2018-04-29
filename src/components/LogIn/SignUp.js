import './LogIn.css'

import React, {Component} from 'react'
import { SetDJ } from '../../actions/actions.js'
import { SetChatroom } from '../../actions/actions.js'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

class SignUp extends Component {

  render(){
    return(
      <div className="sign-up">
        <div className="center">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          	 width="48px" height="48px" viewBox="0 0 64 64" enable-background="new 0 0 64 64">
          <rect x="1" y="1" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-miterlimit="10" width="62" height="62"/>
          <rect x="53" y="7" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-miterlimit="10" width="4" height="8"/>
          <circle fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" cx="27.5" cy="27.5" r="22.5"/>
          <circle fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" cx="27.5" cy="27.5" r="6"/>
          <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="57" y1="15" x2="57" y2="48"/>
          <polygon fill="none" stroke="#ffffff" stroke-width="2" stroke-linejoin="bevel" stroke-miterlimit="10" points="57,49 51,52 51,48
          	57,45 "/>
          <rect x="5" y="56" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-miterlimit="10" width="6" height="3"/>
          <rect x="15" y="56" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-miterlimit="10" width="6" height="3"/>
          </svg>
          <div className="logo">juked.</div>
          <a href="http://localhost:8888/login"><button onClick={this.handleSubmit} className="sign-up-button">LOG IN</button></a>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
