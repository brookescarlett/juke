import React, {Component} from 'react'
import { SetDJ } from '../actions/actions.js'
import { SetChatroom } from '../actions/actions.js'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

class SignUp extends Component {

  render(){
    return(
      <div>
        <a href="http://localhost:8888/login"><button onClick={this.handleSubmit}>LOG IN WITH SPOTIFY</button></a>
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
