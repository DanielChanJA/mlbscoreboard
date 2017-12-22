import React, {Component} from 'react';

class PlayerStats extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <table className="table">
          <thead>
          <tr>
            <th>Name</th>
            <th>AB</th>
            <th>R</th>
            <th>H</th>
            <th>RBI</th>
            <th>BB</th>
            <th>SO</th>
            <th>AVG</th>
          </tr>
          </thead>

          <tbody>
          {
            this.props.batting.batter.map(function(player){
              return <tr key={player.id}>
                <td>{player.name_display_first_last}</td>
                <td>{player.ab}</td>
                <td>{player.r}</td>
                <td>{player.h}</td>
                <td>{player.rbi}</td>
                <td>{player.bb}</td>
                <td>{player.so}</td>
                <td>{player.avg}</td>
              </tr>
            })
          }
          </tbody>
        </table>
    );
  }
}

export default PlayerStats;

