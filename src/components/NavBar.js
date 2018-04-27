import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/actions.js'

class NavBar extends Component {

  state = {
    loggedIn: false
  }

  componentDidMount(){
    this.props.actions.fetchUser()

    if (localStorage.getItem(`access_token`)){
      this.setState({
        loggedIn: true
      })
    }
  }

  logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')

    this.setState({
      loggedIn: false
    })

    this.props.history.push("/signup")

  }

  render(){
    return(
      <div>

        {this.state.loggedIn ?
          <div>
            <p>{this.props.name}</p>
            <p> {this.props.chatroom} </p>
            <button onClick={this.logout}>LOG OUT</button>
          </div> : null }

        <br />
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
