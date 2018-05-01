import './SendText.css'

import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as firebase from 'firebase'


class Player extends Component {

  // handleClick = () => {
  //
  // }

  render() {
    return(
      <div className="send-text">
        <a href="sms:?body=Hello,%20world"><button className="invite-friends">Invite Your Friends</button></a>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {DJ: state.DJ, chatroom: state.chatroom}
}

export default connect(mapStateToProps)(Player)
