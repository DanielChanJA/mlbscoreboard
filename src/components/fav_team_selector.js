import React, {Component} from 'react';

/**
 * This class/component handles the ability to change the favourite team. By
 * default the favourite team is the Blue Jays.
 */
class FavTeamSelector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="text-center">
        Favourite Team:
        <input
            defaultValue="Blue Jays"
            type="text"
            onChange={(event) => this.props.onChange(event)}/>
      </div>
    );
  }
}

export default FavTeamSelector;