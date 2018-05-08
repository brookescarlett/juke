import './LogIn.css'

import React, {Component} from 'react'
import { SetDJ } from '../../actions/actions.js'
import { SetChatroom } from '../../actions/actions.js'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

import BigLogo from '../../svgs/BigLogo'

class SignUp extends Component {

  render(){
    return(
      <div className="animation">
        <div className='animated fadeIn'>
        <div className="center">
          <BigLogo />
          <div className="logo">juked.</div>
          <a href="https://juked-web.herokuapp.com/login"><button className="sign-up-button">LOG IN</button></a>
        </div>
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
