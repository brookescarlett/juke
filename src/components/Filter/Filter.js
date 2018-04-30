import './Filter.css'

import React, { Component } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { ToggleModal } from '../../actions/actions.js'

import DisplayFilterResults from './DisplayFilterResults'


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

  styleProps = () => {
    return this.props.displayModal ? 'white' : 'rgba(255, 255, 255, .3)'
  }

  render(){
    return(
      <div>
        <input type="text" onChange={this.handleChange} placeholder="Search" className="filter-bar" style={{"backgroundColor": this.styleProps()}}></input>
        {this.props.displayModal === true ?
        <div>
          <div className="modal-overlay-div" onClick={this.onOverlayClick} />
          <div className="modal-content-div" onClick={this.onOverlayClick}>
            <div className="modal-dialog-div"  onClick={this.onDialogClick}>
            {this.state.searchResults !== [] ?

              (<div>{this.renderSearchResults()}</div>)
               : null}
            </div>
          </div>
        </div> : null }

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
