import React, { Component } from 'react'
import DisplayFilterResults from './DisplayFilterResults'

export default class Filter extends Component {

  constructor(props) {
    super(props)

    this.state = {
      searchResults: []
    }
  }

  handleChange = (e) => {
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

        json.tracks !== undefined ?
        (this.setState({
          searchResults: json.tracks.items
        })) : null

      })
    } else {
      this.setState({
        searchResults: []
      })
    }
  }

  renderSearchResults = () => {
    return this.state.searchResults.map (song => <DisplayFilterResults key={song.id} datum={song}/>)
  }

  render(){
    return(
      <div>
        FILTER
        <input type="text" onChange={this.handleChange}></input>
        {this.state.searchResults !== [] ? this.renderSearchResults() : null}
      </div>
    )
  }
}
