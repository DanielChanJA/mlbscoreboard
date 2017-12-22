import React, {Component} from 'react';
import Axios from 'axios';
import BattingStats from './batting_stats';
import TeamViewSelector from './team_view_selector';

const BASE_URI = "http://gd2.mlb.com/";

class GameDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxscore: null
    };
    this.retrieveGameStats(this.props.game.game_data_directory);
  }


  /**
   * Retrieves the game stats from the game directory's boxscore json file.
   *
   * @param gameDir - The associated game's game directory.
   */
  retrieveGameStats = (gameDir) => {
    const BOXSCORE_URI = BASE_URI + gameDir + '/boxscore.json';

    Axios.get(BOXSCORE_URI)
        .then((resp) => {
          this.setState({"boxscore": resp.data.data.boxscore});
        })
        .catch((err) => {
          console.log(err);
        });

  };

  render() {
    return (
        <div className="text-center">
          <i style={{cursor: 'pointer'}}
             className="fa fa-chevron-left fa-3x col-md-2"
             aria-hidden="true"
             onClick={() => this.props.transitionViewToList()}></i>
          <BattingStats boxscore={this.state.boxscore}/>
          <TeamViewSelector
              boxscore={this.state.boxscore}
              home={(this.state.boxscore) ? this.state.boxscore.home_fname : null}
              away={(this.state.boxscore) ? this.state.boxscore.away_fname : null}/>
        </div>
    );
  }

}

export default GameDetail;