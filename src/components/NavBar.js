import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/actions.js'

class NavBar extends Component {

  componentDidMount(){
    this.props.actions.fetchUser()
  }


  logout = () => {
    console.log(localStorage.getItem('access_token'));
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    console.log(localStorage.getItem('access_token'));
    this.props.history.push("/signup")

  }

  render(){
    return(
      <div>

          <div>
            <p>{this.props.name}</p>
            <p> {this.props.chatroom} </p>
            {/* {localStorage.getItem('access_token') === null ? null : <button onClick={this.logout}>LOG OUT</button>} */}
          </div>

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
