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
        { this.props.chatroom !== "" ? (
          <div className="main-container">
            <div id="bg-img"></div>
            <div className='animated fadeIn'>
            <NavBar />
            <Filter />
            <div className="flex-row">
              <div className="main-content">
                <Playlist  />
              </div>
              <div className="sidebar">
                <Userlist  />
                <Player  />
                <NowPlaying  />
              </div>
            </div>
            <Footer />
          </div>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { chatroom: state.chatroom }
}

export default connect(mapStateToProps)(Main)
