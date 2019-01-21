import './NavBar.css'

import { withRouter } from 'react-router'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/actions.js'

import Gear from '../../svgs/Gear'
import Logo from '../../svgs/Logo'

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
    return this.state.display ? <button 
                                  onClick={this.logout} 
                                  className="log-out-button"> Log Out </button> 
                              : <span >hello, <span className="user-name"> {this.props.name}</span> </span>
  }


  render(){
    return(

      <div className="navigation">

        <div className="nav-bar" id="left-side-nav">
          <Logo />
          <p>juked.</p>
        </div>

        <div className="nav-bar" id="right-side-nav">
          <div className="groupme">
            <p>{this.renderGreeting()}</p>
            <p 
              className="gear" 
              onClick={this.handleClick}>
                <Gear/>
            </p>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
