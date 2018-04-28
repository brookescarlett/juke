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

  // handleClick = () => {
  //   this.setState({
  //     display: !this.state.display
  //   })
  // }
  //
  // handleRender = () => {
  //   let display = document.getElementByClassName('.dropdown-content')
  //   let toDisplay = this.state.display ? "display: block" : "display: none"
  //   display.style.display = toDisplay
  // }

  render(){
    return(

      <div class="topnav" id="myTopnav">
        {this.state.loggedIn ?
        <div>

          {/* <li><svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></li> */}

          <li>Hello, {this.props.name}</li>

          <div class="dropdown">
            <button class="dropbtn">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-down"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>
            </button>
            <div class="dropdown-content">
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
