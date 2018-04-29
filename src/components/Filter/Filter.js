import './Filter.css'

import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { ToggleModal } from '../../actions/actions.js'

import DisplayFilterResults from './DisplayFilterResults'
import Modal from 'react-modal'

class Filter extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchResults: []
    }
  }

  handleChange = (e) => {
    e.preventDefault()
    let query = e.target.value.replace(" ", "+")

    if (query !== "") {
      fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      .then(res => res.json())
      .then(json => {


        this.props.ToggleModal(true)

        json.tracks !== undefined ?
        (this.setState({
          searchResults: json.tracks.items
        })) : null

      })
    } else {
      this.props.ToggleModal(false)
      this.setState({
        searchResults: []
      })
    }
  }

  listenKeyboard = (event) => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      this.props.ToggleModal(false)
    }
  }

  componentDidMount = () => {
    if (this.props.displayModal === true) {
      window.addEventListener('keydown', this.listenKeyboard, true)
    }
  }

  onClose() {
    this.props.ToggleModal(false)
  }

  componentWillUnmount = () => {
    if (this.props.ToggleModal(false)) {
      window.removeEventListener('keydown', this.listenKeyboard, true)
    }
  }

  onOverlayClick = () => {
    this.props.ToggleModal(false)
  }

  onDialogClick = (event) => {
    event.stopPropagation()
  }

  renderSearchResults = () => {
    return this.state.searchResults.map (song => <DisplayFilterResults key={song.id} datum={song}/>)
  }

  render(){
    return(
      <div>

        <input type="text" onChange={this.handleChange} placeholder="Search" className="filter-bar"></input>
        {this.props.displayModal === true ?
        <div>
          <div className="modal-overlay-div" onClick={this.onOverlayClick} />
          <div className="modal-content-div" onClick={this.onOverlayClick}>
            <div className="modal-dialog-div"  onClick={this.onDialogClick}>
            {this.state.searchResults !== [] ?

              (<div><svg width="22" height="32" viewBox="0 0 55 80" xmlns="http://www.w3.org/2000/svg" fill="#FFF">
                  <g transform="matrix(1 0 0 -1 0 80)">
                      <rect width="10" height="20" rx="3">
                          <animate attributeName="height"
                               begin="0s" dur="4.3s"
                               values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20" calcMode="linear"
                               repeatCount="indefinite" />
                      </rect>
                      <rect x="15" width="10" height="80" rx="3">
                          <animate attributeName="height"
                               begin="0s" dur="2s"
                               values="80;55;33;5;75;23;73;33;12;14;60;80" calcMode="linear"
                               repeatCount="indefinite" />
                      </rect>
                      <rect x="30" width="10" height="50" rx="3">
                          <animate attributeName="height"
                               begin="0s" dur="1.4s"
                               values="50;34;78;23;56;23;34;76;80;54;21;50" calcMode="linear"
                               repeatCount="indefinite" />
                      </rect>
                      <rect x="45" width="10" height="30" rx="3">
                          <animate attributeName="height"
                               begin="0s" dur="2s"
                               values="30;45;13;80;56;72;45;76;34;23;67;30" calcMode="linear"
                               repeatCount="indefinite" />
                      </rect>
                  </g>
              </svg>{this.renderSearchResults()}</div>)
               : null}
            </div>
          </div>
        </div> : null }

        {/* <Modal
          isOpen={this.props.displayModal}
          // onAfterOpen={this.afterOpenModal}
          // onRequestClose={this.closeModal}
          // style={customStyles}
          contentLabel="Example Modal">


        {this.state.searchResults !== [] ? this.renderSearchResults() : null}

       </Modal> */}
     </div>
    )
  }
}

const mapStateToProps = state => {
  return {displayModal: state.displayModal}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    ToggleModal
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
