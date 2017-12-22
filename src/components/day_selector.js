import React, {Component} from 'react';

class DaySelector extends Component {
  constructor(props) {
    super(props);
    this.state = {'viewingDate': this.props.viewingDate};
  }

  /**
   * This function handles the ability to increment and decrement the
   * current viewing date.
   * @param offset - How much we want to increment or decrement the current
   * viewing date.
   */
  offsetDate(offset) {
    let date = new Date(this.state.viewingDate);
    date.setDate(date.getDate() + offset);
    this.updateDate(date);
  }

  /**
   * This function handles the ability to set to a custom date.
   * @param event - The onChange event that is triggered by changing the
   * date in the jump-to-date field.
   */
  setDate(event) {
    try {
      let date = new Date(event.target.value);
      this.updateDate(date);
    } catch (RangeError) {
      console.log('Caught the error.');
    }
  }

  /**
   * This function is the main function that updates the state, the current
   * date that we're viewing.
   * @param newDate - The date object that we want to update it to.
   */
  updateDate(newDate) {
    this.setState({'viewingDate': newDate.toISOString().substring(0, 10)});
    this.props.onDateChange(newDate.toISOString().substring(0, 10));
  }

  render() {
    return (
        <div className="text-center">
          <i style={{cursor: 'pointer'}}
             className="fa fa-chevron-left clickable"
             aria-hidden="true"
             onClick={() => this.offsetDate(-1)}></i>
          <span>
            Currently Viewing: {this.state.viewingDate}
          </span>
          <i style={{cursor: 'pointer'}}
             className="fa fa-chevron-right clickable"
             aria-hidden="true"
             onClick={() => this.offsetDate(1)}></i>
          <div>
            Jump to this date: <input type="date"
                                      onChange={(event) => this.setDate(event)}/>
          </div>
        </div>


    );
  }
}

export default DaySelector;