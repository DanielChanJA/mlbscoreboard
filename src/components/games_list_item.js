import React, {Component} from 'react';

class GamesListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const home = this.props.game.home_team_name;
    const away = this.props.game.away_team_name;
    const stat = this.props.game.status.status;
    let score;
    if(this.props.game.linescore) {
      score = this.props.game.linescore.r;
    }

    if(score) {
      if(parseInt(score.home) > parseInt(score.away)) {
        return (
            <li
                style={{cursor: 'pointer'}}
                className="list-group-item text-center"
                onClick={() => this.props.transitionViewToDetailed(this.props.game)}>
              <div><b>{home}{"\t"}{score.home}</b></div>
              <div>{away}{"\t"}{score.away}</div>
              <div>{stat}</div>
            </li>
        );
      } else if(parseInt(score.home) < parseInt(score.away)) {
        return (
            <li
                style={{cursor: 'pointer'}}
                className="list-group-item text-center"
                onClick={() => this.props.transitionViewToDetailed(this.props.game)}>
              <div>{home}{"\t"}{score.home}</div>
              <div><b>{away}{"\t"}{score.away}</b></div>
              <div>{stat}</div>
            </li>
        );
      } else {
        return (
            <li
                style={{cursor: 'pointer'}}
                className="list-group-item text-center"
                onClick={() => this.props.transitionViewToDetailed(this.props.game)}>
              <div>{home}{"\t"}{score.home}</div>
              <div>{away}{"\t"}{score.away}</div>
              <div>{stat}</div>
            </li>
        );
      }
    }

    return (
        <li className="list-group-item text-center">
          <div>{home}</div>
          <div>{away}</div>
          <div>{stat}</div>
        </li>
    );
  }



}

export default GamesListItem