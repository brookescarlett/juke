import React, { Component } from 'react'
import { ToggleModal } from '../../actions/actions.js'
import { addSongToFirebase } from '../../helpers/helpers.js'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class DisplayFilterResults extends Component {

  constructor(props) {
    super(props)

    this.state={
      songData: []
    }
  }

  handleClick = (e) => {
    let filt = document.getElementById('filter')
    filt.value = ""
    this.props.ToggleModal(false)

    let song = this.props.datum
    addSongToFirebase(song, this.props.chatroom, this.props.name)
  }

  render(){
    return(
      <div>
        <div onClick={this.handleClick} id={this.props.datum} className="display-filter-result">
          <div className="display-flex-row">
            {this.props.datum.album.images[2] ? <img src= {this.props.datum.album.images[2].url}/> : null}
            <div className="display-flex-col">
              <p id={this.props.datum}>{this.props.datum.name}</p>
              <p id={this.props.datum}> {this.props.datum.artists[0].name}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {currentUser: state.currentUser, chatroom: state.chatroom, name:state.name, displayModal: state.displayModal}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ToggleModal
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayFilterResults)
