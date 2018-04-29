import './NavBar.css'

import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/actions.js'

class NavBar extends Component {

  state = {
    loggedIn: false,
    display: false
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

      <div className="topnav" id="myTopnav">
        {this.props.name ?
        <div>
          <li>Hello, {this.props.name}</li>

          <div className="dropdown">
            <button className="dropbtn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevrons-down"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>
            </button>
            <div className="dropdown-content">
              <li><button onClick={this.logout}>LOG OUT</button></li>
            </div>
          </div>


        </div> : null }
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
