import React, {Component} from 'react';
import GamesListItem from './games_list_item';

/**
 * This class/component handles the display of the games on a given day. It
 * directly interacts with GamesListItem to produce the relevant minified
 * details of the games.
 */
class GamesList extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Sorts the games in the order of preference, with the preferred team
   * first, followed by games with other teams.
   */
  sortAccordingToPreference = () => {
    if (this.props.games && this.props.games.game && this.props.games.game.constructor === Array) {

      let games = this.props.games.game;
      let currentPointer = 0;
      let moveToThisPointer = 0;

      while(currentPointer < games.length) {
        if(games[currentPointer].home_team_name === this.props.preferredTeam ||
           games[currentPointer].away_team_name === this.props.preferredTeam) {
          let temp = games[moveToThisPointer];
          games[moveToThisPointer] = games[currentPointer];
          games[currentPointer] = temp;
          moveToThisPointer++;
        }
        currentPointer++;
      }
    }
  };

  render() {
    if (!this.props.games) {
      return (<div> Loading... </div>);
    }

    if (!this.props.games.game) {
      return (<div className="text-center"> No games today! </div>);
    }

    if(this.props.games.game.constructor === Array) {

      this.sortAccordingToPreference();

      const games = this.props.games.game.map((game) => {
        return (
            <GamesListItem
                key={game.id}
                game={game}
                transitionViewToDetailed={this.props.transitionViewToDetailed}/>
        );
      });

      return (

          <ul className="text-center list-group col-md-12">{games}</ul>
      );
    } else {
      return (
          <ul className="text-center list-group col-md-12">
            <GamesListItem
                key={this.props.games.game.id}
                game={this.props.games.game}
                transitionViewToDetailed={this.props.transitionViewToDetailed}/>
          </ul>
      );
    }

  }
}

export default GamesList;