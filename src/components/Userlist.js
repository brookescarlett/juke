import React, {Component} from 'react'
import * as firebase from 'firebase'
import {connect} from 'react-redux'
import User from './User'

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
    return uniques.map(user => <User key={user.name} datum={user}/>)
  }

  render(){
    return(
      <div>
        USERLIST MAYUN
        <p>DJ: {this.state.dj !== "" ? this.state.dj.name : null}</p>
        {this.renderUsers()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {chatroom: state.chatroom}
}

export default connect(mapStateToProps)(Userlist)
