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

  handleClick = () => {
    this.setState({
      display: !this.state.display
    })
  }

  renderGreeting = () => {
    return this.state.display ? <button onClick={this.logout} className="log-out-button">Log Out</button> : <p>hello,<span className="user-name"> {this.props.name}</span></p>
  }


  render(){
    return(

      <div className="navigation">

        <div className="nav-bar" id="left-side-nav">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          	 width="20px" height="20px" viewBox="0 0 64 64" enable-background="new 0 0 64 64">
          <rect x="1" y="1" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" width="62" height="62"/>
          <rect x="53" y="7" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" width="4" height="8"/>
          <circle fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" cx="27.5" cy="27.5" r="22.5"/>
          <circle fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" cx="27.5" cy="27.5" r="6"/>
          <line fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" x1="57" y1="15" x2="57" y2="48"/>
          <polygon fill="none" stroke="#ffffff" stroke-width="2" stroke-linejoin="bevel" stroke-miterlimit="10" points="57,49 51,52 51,48
          	57,45 "/>
          <rect x="5" y="56" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" width="6" height="3"/>
          <rect x="15" y="56" fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" width="6" height="3"/>
          </svg>
          <p>juked.</p>
        </div>

        <div className="nav-bar" id="right-side-nav">
          <div className="groupme">
            <p>{this.renderGreeting()}</p>
            <svg onClick={this.handleClick}version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            	 width="20px" height="20px" viewBox="0 0 64 64" enable-background="new 0 0 64 64">
            <g>
            	<polygon fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" points="32,1 26,1 26,10 20,12 14,6 6,14 12,20
            		10,26 1,26 1,38 10,38 12,44 6,50 14,58 20,52 26,54 26,63 32,63 38,63 38,54 44,52 50,58 58,50 52,44 54,38 63,38 63,26 54,26
            		52,20 58,14 50,6 44,12 38,10 38,1 	"/>
            	<circle fill="none" stroke="#ffffff" stroke-width="2" stroke-miterlimit="10" cx="32" cy="32" r="6"/>
            </g>
            </svg>

          </div>
        </div>

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
