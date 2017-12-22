import React, {Component} from 'react';
import PlayerStats from './player_stats';

class TeamViewSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'home'
    };
  }

  /**
   * Toggle between home team stats and away team stats.
   *
   * @param event - Click event.
   */
  swapView = (event) => {
    this.setState({view: event.target.id});
  };

  render() {
    if(this.props.boxscore) {
      return (
          <div>
            <div>
              <button id="home" className="btn btn-primary" onClick={(event) => this.swapView(event)}>{this.props.home}</button>
              <button id="away" className="btn btn-primary" onClick={(event) => this.swapView(event)}>{this.props.away}</button>
            </div>
            <PlayerStats
                view={this.state.view}
                batting={(this.state.view === 'home') ? this.props.boxscore.batting[0] : this.props.boxscore.batting[1]}/>
          </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }

  }
}

export default TeamViewSelector;
