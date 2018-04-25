import React, {Component} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/actions.js'

class NavBar extends Component {

  componentDidMount(){
    this.props.actions.fetchUser()
  }

  render(){
    return(
      <div>
        {this.props.currentUser ? <p>{this.props.currentUser.display_name}</p> : null}
        <br />
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {currentUser: state.currentUser}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
