import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

import GameDetail from './components/game_detail';
import DaySelector from './components/day_selector';
import GamesList from './components/games_list';
import FavTeamSelector from './components/fav_team_selector';

const BASE_URI = 'http://gd2.mlb.com';

/**
 * This is the main application which interacts with the sub-components.
 * The structure of the application can be found in the README markdown file.
 */
class App extends Component {
  constructor(props) {
    super(props);

    // All the states that we need for the main application
    this.state = {
      viewingDate: '2016-10-04',
      games: [],
      selectedGame: null,
      preferredTeam: 'Blue Jays',
      dayData: {},
      isDetailedView: false,
    };

    // Let's initialize the data with the ones from 2016-10-04.
    this.retrieveData('2016-10-04');
  }


  /**
   * Method to update the preferred team. Used by the component
   * FavTeamSelector and sorts the games in order of the favourite team
   * first (if there are any).
   * @param event - The onChange event that fired off.
   */
  updateFavTeam = (event) => {
    this.setState({preferredTeam: event.target.value});
  };

  /**
   * Method to retrieve the data from the API. Dates are retrieved from the
   * day-selector component.
   * @param date - The date of which we want to retrieve data from.
   */
  retrieveData = (date) => {
    const dates = date.split('-');
    const URI = BASE_URI + `/components/game/mlb/year_${dates[0]}/month_${dates[1]}/day_${dates[2]}/master_scoreboard.json`;

    Axios.get(URI)
        .then((resp) => {
          this.setState({dayData: resp.data.data});
          this.setState({'viewingDate': date});
        })
        .catch((err) => {
          console.log(err);
        });
  };

  /**
   * Method to transition the view into a detailed view. The game that was
   * clicked on becomes the selectedGame in the state.
   *
   * @param game - The game that we want to have a detailed view of.
   */
  transitionViewToDetailed = (game) => {
    this.setState({
      'selectedGame': game,
      'isDetailedView': true
    });
  };

  /**
   * Method to transition back into the list view that we came from. Retains
   * knowledge of where we left off and continues from there.
   */
  transitionViewToList = () => {
    this.setState({'isDetailedView': false});
  };

  /**
   * There are two views in this application, one which shows a list of
   * games on the currently selected day and another view that shows the
   * detailed stats for the selected game.
   */
  render() {
    switch (this.state.isDetailedView) {
      case false:
        return (
            <div>
              <DaySelector
                  onDateChange={this.retrieveData}
                  viewingDate={this.state.viewingDate}/>
              <FavTeamSelector
                  onChange={this.updateFavTeam}/>
              <GamesList
                  games={this.state.dayData.games}
                  preferredTeam={this.state.preferredTeam}
                  transitionViewToDetailed={this.transitionViewToDetailed}/>
            </div>
        );
      case true:
        return (
            <div>
              <GameDetail
                  transitionViewToList={this.transitionViewToList}
                  game={this.state.selectedGame}/>
            </div>
        )
    }
  }
}

// React will find the DOM element with the class name as container and
// insert it there.
ReactDOM.render(<App/>, document.querySelector('.container'));

