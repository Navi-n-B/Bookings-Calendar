import React from 'react';
import moment from 'moment';
import example from '../example.js';

class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: example,
      row1: [],
      row2: [],
      row3: [],
      row4: [],
      row5: [],
      row6: []
    };
  }

  componentWillMount() {
   this.generateDays();
  }

  componentDidUpdate(prevProps) {
    if (this.props.reservations !== prevProps.reservations) {
      this.generateDays();
    }
    if (this.props.date !== prevProps.date) {
      this.generateDays();
    }
   }


  generateDays() {
    var date = moment(this.props.date).day();
    var lastDate = moment(this.props.date).daysInMonth();
    var dateArray = [];
    var count = 1;
    var rowCount = 0;
    var temp, row1 = [], row2 = [], row3 = [], row4 = [], row5 = [], row6 = [], tempRow;

    for (var i = 0; i <= 41; i++) {
      if (i < date || i >= (lastDate + date)) {
        dateArray.push({'date': null, 'availability': 0});
      }
      if (i >= date && i < (date + lastDate)) {
        temp = this.generateAvailability(count);
        dateArray.push(temp);
        count++;
      }
    }
    row1 = dateArray.slice(0, 7);
    row2 = dateArray.slice(7, 14);
    row3 = dateArray.slice(14, 21);
    row4 = dateArray.slice(21, 28);
    row5 = dateArray.slice(28, 35);
    row6 = dateArray.slice(35, 42);

    this.setState({
      row1: row1,
      row2: row2,
      row3: row3,
      row4: row4,
      row5: row5,
      row6: row6,
      days: dateArray
    });
  }

  generateAvailability(day) {
    var month = moment(this.props.date).format('MMMM');
    // console.log(this.props.reservations)
    if (this.props.reservations.length === 0) {
      return { date: day, availability: 1 };
    } else {
      if (this.props.reservations[month].day) {
        return { date: day, availability: 0 };
      } else {
        return { date: day, availability: 1 };
      }
    }
  }

  clickHandler() {
    console.log(this.state.days);
    console.log(this.props);
  }


  render() {
    return (
      <div>
          <table onClick={this.clickHandler.bind(this)}>
            <tbody>
              <tr>
                <td className='cal-day date-avail'>{this.state.days[0].date}</td>
                <td className='cal-day date-avail'>{this.state.days[1].date}</td>
                <td className='cal-day date-avail'>{this.state.days[2].date}</td>
                <td className='cal-day date-avail'>{this.state.days[3].date}</td>
                <td className='cal-day date-avail'>{this.state.days[4].date}</td>
                <td className='cal-day date-avail'>{this.state.days[5].date}</td>
                <td className='cal-day date-avail'>{this.state.days[6].date}</td>
              </tr>
              <tr>
                <td className='cal-day date-avail'>{this.state.days[7].date}</td>
                <td className='cal-day date-avail'>{this.state.days[8].date}</td>
                <td className='cal-day date-avail'>{this.state.days[9].date}</td>
                <td className='cal-day date-avail'>{this.state.days[10].date}</td>
                <td className='cal-day date-avail'>{this.state.days[11].date}</td>
                <td className='cal-day date-avail'>{this.state.days[12].date}</td>
                <td className='cal-day date-avail'>{this.state.days[13].date}</td>
              </tr>
              <tr>
                <td className='cal-day date-avail'>{this.state.days[14].date}</td>
                <td className='cal-day date-avail'>{this.state.days[15].date}</td>
                <td className='cal-day date-avail'>{this.state.days[16].date}</td>
                <td className='cal-day date-avail'>{this.state.days[17].date}</td>
                <td className='cal-day date-avail'>{this.state.days[18].date}</td>
                <td className='cal-day date-avail'>{this.state.days[19].date}</td>
                <td className='cal-day date-avail'>{this.state.days[20].date}</td>
              </tr>
              <tr>
                <td className='cal-day date-avail'>{this.state.days[21].date}</td>
                <td className='cal-day date-avail'>{this.state.days[22].date}</td>
                <td className='cal-day date-avail'>{this.state.days[23].date}</td>
                <td className='cal-day date-avail'>{this.state.days[24].date}</td>
                <td className='cal-day date-avail'>{this.state.days[25].date}</td>
                <td className='cal-day date-avail'>{this.state.days[26].date}</td>
                <td className='cal-day date-avail'>{this.state.days[27].date}</td>
              </tr>
              <tr>
                <td className='cal-day date-avail'>{this.state.days[28].date}</td>
                <td className='cal-day date-avail'>{this.state.days[29].date}</td>
                <td className='cal-day date-avail'>{this.state.days[30].date}</td>
                <td className='cal-day date-avail'>{this.state.days[31].date}</td>
                <td className='cal-day date-avail'>{this.state.days[32].date}</td>
                <td className='cal-day date-avail'>{this.state.days[33].date}</td>
                <td className='cal-day date-avail'>{this.state.days[34].date}</td>
              </tr>
              <tr>
                <td className='cal-day date-avail'>{this.state.days[35].date}</td>
                <td className='cal-day date-avail'>{this.state.days[36].date}</td>
                <td className='cal-day date-avail'>{this.state.days[37].date}</td>
                <td className='cal-day date-avail'>{this.state.days[38].date}</td>
                <td className='cal-day date-avail'>{this.state.days[39].date}</td>
                <td className='cal-day date-avail'>{this.state.days[40].date}</td>
                <td className='cal-day date-avail'>{this.state.days[41].date}</td>
              </tr>
            </tbody>
          </table>
      </div>
    )
  }
}

export default Month;