import './Userlist.css'

import React, {Component} from 'react'
import * as firebase from 'firebase'
import {connect} from 'react-redux'
import User from './User'
import UUID from 'uuid'

class Userlist extends Component {

  state = {
    usersArray: [],
    dj: ""
  }

  componentDidMount = () => {
    firebase.database().ref().child(`${this.props.chatroom}`).child('users').orderByKey().on('child_added', snap => {
      if (snap.val().dj === true) {
        this.setState({
          dj: snap.val()
        })
      } else if(snap.val() === 'juked') {
        // continue
      } else {
        this.setState({
          usersArray: [...this.state.usersArray, snap.val()]
        })
      }
    })
  }

  onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index
  }

  renderUsers = () => {
    let uniques = this.state.usersArray.filter(this.onlyUnique)
    return uniques.map(user => <User key={ UUID() } datum={user}/>)
  }

  render(){
    return(
      <div className="user-list">
        <h3 className="sub-head">Guests</h3>
        <p>{this.state.dj !== "" ? `DJ: ${this.state.dj.name}` : "to play music, you'll need a dj!"}</p>
        {this.renderUsers()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {chatroom: state.chatroom}
}

export default connect(mapStateToProps)(Userlist)
