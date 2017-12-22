import React, {Component} from 'react';

/**
 * This class/component handles the rendering of the inning scores? I'm not
 * too familiar with baseball. But it displays the appropriate information
 * related to the selected game.
 */
class BattingStats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.boxscore) {

      const inning = this.props.boxscore.linescore.inning_line_score;
      const home = this.props.boxscore.home_team_code.toUpperCase();
      const away = this.props.boxscore.away_team_code.toUpperCase();
      const linescore = this.props.boxscore.linescore;

      return (
          <div>
            <table className="table">
              <thead>
              <tr>
                <th></th>
                {
                  inning.map((value) => {
                    return <td key={value.inning}>
                      {value.inning}
                    </td>
                  })
                }
                <td>
                  R
                </td>
                <td>
                  H
                </td>
                <td>
                  E
                </td>
              </tr>
              </thead>

              <tbody>
              <tr>
                <td>{home}</td>
                {
                  inning.map((value) => {
                    return <td key={value.inning}>
                      {value.home}
                    </td>
                  })
                }
                <td>
                  {linescore.home_team_runs}
                </td>
                <td>
                  {linescore.home_team_hits}
                </td>
                <td>
                  {linescore.home_team_errors}
                </td>
              </tr>
              <tr>
                <td>{away}</td>
                {
                  inning.map((value) => {
                    return <td key={value.inning}>
                      {value.away}
                    </td>
                  })
                }
                <td>
                  {linescore.away_team_runs}
                </td>
                <td>
                  {linescore.away_team_hits}
                </td>
                <td>
                  {linescore.away_team_errors}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
      );
    } else {
      return (<div>Loading...</div>);
    }

  }

}

export default BattingStats;