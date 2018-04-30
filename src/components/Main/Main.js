import './Main.css'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import NavBar from '../Nav/NavBar'
import Filter from '../Filter/Filter'
import Playlist from '../Playlist/Playlist'
import Userlist from '../UserList/Userlist'
import NowPlaying from '../NowPlaying/NowPlaying'
import Player from '../NowPlaying/Player'
import Footer from '../Footer/Footer'

class Main extends Component {

  componentWillMount = () => {
    if (this.props.chatroom === "") {
      this.props.history.push('/signup')
    }
  }

  render() {
    return (
      <div>
        {this.props.chatroom !== "" ? (
          <div className="main-container">
            <div className='animated fadeIn'>
            <NavBar store={this.props.store}/>
            <Filter store={this.props.store}/>
            <div className="flex-row">
              <div className="main-content">
                <Playlist store={this.props.store} />
              </div>
              <div className="sidebar">
                <Userlist store={this.props.store} />
                <Player store={this.props.store} />
                <NowPlaying store={this.props.store} />
              </div>
            </div>
            <Footer store={this.props.store}/>
          </div>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {chatroom: state.chatroom}
}

export default connect(mapStateToProps)(Main)
