import React, {Component} from 'react'

export default class DisplayFilterResults extends Component {

  render(){
    return(
      <div>
        <div>Track: {this.props.datum.name}</div>
        <div>Artist: {this.props.datum.artists[0].name}</div>
        <div>Album: {this.props.datum.album.name}</div>
        <p>---</p>
      </div>
    )
  }
}
